import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface STKPushRequest {
  phoneNumber: string;
  amount: number;
  bundleName: string;
  bundleId?: string;
  recipientNumber?: string;
}

// Function to get M-Pesa access token
async function getAccessToken(): Promise<string> {
  const consumerKey = Deno.env.get('DARAJA_CONSUMER_KEY');
  const consumerSecret = Deno.env.get('DARAJA_CONSUMER_SECRET');
  
  if (!consumerKey || !consumerSecret) {
    throw new Error('M-Pesa credentials not configured');
  }

  const auth = btoa(`${consumerKey}:${consumerSecret}`);
  
  const response = await fetch(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to get access token:', error);
    throw new Error('Failed to authenticate with M-Pesa');
  }

  const data = await response.json();
  return data.access_token;
}

// Function to initiate STK Push
async function initiateSTKPush(
  accessToken: string,
  phoneNumber: string,
  amount: number,
  orderId: string
): Promise<any> {
  const shortcode = Deno.env.get('DARAJA_SHORTCODE');
  const passkey = Deno.env.get('DARAJA_PASSKEY');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  
  if (!shortcode || !passkey || !supabaseUrl) {
    throw new Error('M-Pesa configuration incomplete');
  }

  // Format phone number (remove leading 0 and add 254)
  const formattedPhone = phoneNumber.startsWith('0') 
    ? `254${phoneNumber.slice(1)}` 
    : phoneNumber.startsWith('254') 
    ? phoneNumber 
    : `254${phoneNumber}`;

  // Generate timestamp
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  
  // Generate password
  const password = btoa(`${shortcode}${passkey}${timestamp}`);
  
  // Callback URL
  const callbackUrl = `${supabaseUrl}/functions/v1/mpesa-callback`;

  const stkPushPayload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: formattedPhone,
    PartyB: shortcode,
    PhoneNumber: formattedPhone,
    CallBackURL: callbackUrl,
    AccountReference: orderId,
    TransactionDesc: 'JustEdu Payment',
  };

  console.log('Initiating STK Push:', { phoneNumber: formattedPhone, amount, orderId });

  const response = await fetch(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkPushPayload),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error('STK Push failed:', error);
    throw new Error('Failed to initiate payment');
  }

  return await response.json();
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { phoneNumber, amount, bundleName, bundleId, recipientNumber }: STKPushRequest = await req.json();

    // Validate input
    if (!phoneNumber || !amount || !bundleName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing payment request:', { phoneNumber, amount, bundleName });

    // Create order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        phone_number: phoneNumber,
        recipient_number: recipientNumber || phoneNumber,
        bundle_id: bundleId,
        bundle_name: bundleName,
        amount: amount,
        status: 'PENDING',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Failed to create order:', orderError);
      throw new Error('Failed to create order record');
    }

    console.log('Order created:', order.id);

    // Get access token
    const accessToken = await getAccessToken();

    // Initiate STK Push
    const stkResponse = await initiateSTKPush(
      accessToken,
      phoneNumber,
      amount,
      order.id
    );

    console.log('STK Push response:', stkResponse);

    // Update order with checkout request ID
    if (stkResponse.CheckoutRequestID) {
      await supabase
        .from('orders')
        .update({
          checkout_request_id: stkResponse.CheckoutRequestID,
          mpesa_request_id: stkResponse.MerchantRequestID,
        })
        .eq('id', order.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'STK Push sent successfully',
        orderId: order.id,
        checkoutRequestId: stkResponse.CheckoutRequestID,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in mpesa-stk-push:', error);
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
