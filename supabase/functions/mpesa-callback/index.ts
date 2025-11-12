import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const callbackData = await req.json();
    console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

    const { Body } = callbackData;
    const { stkCallback } = Body;

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
    } = stkCallback;

    // Find the order
    const { data: orders, error: findError } = await supabase
      .from('orders')
      .select('*')
      .eq('checkout_request_id', CheckoutRequestID)
      .limit(1);

    if (findError || !orders || orders.length === 0) {
      console.error('Order not found:', CheckoutRequestID);
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const order = orders[0];
    console.log('Found order:', order.id);

    // Update order based on result
    let updateData: any = {
      result_code: ResultCode.toString(),
      result_description: ResultDesc,
    };

    if (ResultCode === 0) {
      // Payment successful
      console.log('Payment successful for order:', order.id);

      // Extract payment details from callback
      const callbackMetadata = stkCallback.CallbackMetadata?.Item || [];
      const mpesaReceipt = callbackMetadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
      const transactionDate = callbackMetadata.find((item: any) => item.Name === 'TransactionDate')?.Value;
      const phoneNumber = callbackMetadata.find((item: any) => item.Name === 'PhoneNumber')?.Value;

      updateData = {
        ...updateData,
        status: 'SUCCESS',
        mpesa_receipt: mpesaReceipt,
        transaction_date: transactionDate ? new Date(
          transactionDate.toString().replace(
            /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
            '$1-$2-$3T$4:$5:$6'
          )
        ).toISOString() : null,
      };

      // Update loyalty points
      const phoneToUpdate = order.phone_number;
      const pointsToAdd = Math.floor(order.amount / 10); // 1 point per 10 KES

      const { data: existingPoints } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('phone_number', phoneToUpdate)
        .single();

      if (existingPoints) {
        await supabase
          .from('loyalty_points')
          .update({
            points: existingPoints.points + pointsToAdd,
            total_transactions: existingPoints.total_transactions + 1,
            total_spent: existingPoints.total_spent + order.amount,
          })
          .eq('phone_number', phoneToUpdate);
      } else {
        await supabase
          .from('loyalty_points')
          .insert({
            phone_number: phoneToUpdate,
            points: pointsToAdd,
            total_transactions: 1,
            total_spent: order.amount,
          });
      }

      console.log('Loyalty points updated:', { phoneToUpdate, pointsToAdd });

      // Here you would integrate with the actual bundle delivery service
      // For now, we just log it
      console.log('Bundle to deliver:', {
        bundleName: order.bundle_name,
        recipientNumber: order.recipient_number,
      });

    } else {
      // Payment failed
      console.log('Payment failed for order:', order.id, 'Reason:', ResultDesc);
      updateData.status = 'FAILED';
    }

    // Update the order
    const { error: updateError } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', order.id);

    if (updateError) {
      console.error('Failed to update order:', updateError);
      throw updateError;
    }

    console.log('Order updated successfully:', order.id);

    return new Response(
      JSON.stringify({ success: true, message: 'Callback processed' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in mpesa-callback:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: error.toString() 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
