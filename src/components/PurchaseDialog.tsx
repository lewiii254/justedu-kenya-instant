import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bundleName: string;
  bundlePrice: number;
}

const PurchaseDialog = ({ open, onOpenChange, bundleName, bundlePrice }: PurchaseDialogProps) => {
  const [paymentNumber, setPaymentNumber] = useState("");
  const [useSameNumber, setUseSameNumber] = useState(true);
  const [recipientNumber, setRecipientNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPurchase = async () => {
    if (!paymentNumber) {
      toast.error("Please enter a phone number to pay");
      return;
    }

    if (!useSameNumber && !recipientNumber) {
      toast.error("Please enter a number to receive package");
      return;
    }

    setIsProcessing(true);

    try {
      // Call the M-Pesa STK Push function
      const { data, error } = await supabase.functions.invoke('mpesa-stk-push', {
        body: {
          phoneNumber: paymentNumber,
          amount: bundlePrice,
          bundleName: bundleName,
          recipientNumber: useSameNumber ? paymentNumber : recipientNumber,
        },
      });

      if (error) {
        console.error('Payment error:', error);
        toast.error("Failed to initiate payment. Please try again.");
        return;
      }

      console.log('Payment initiated:', data);
      toast.success("STK Push sent! Please check your phone to complete payment.");
      onOpenChange(false);
      
      // Reset form
      setTimeout(() => {
        setPaymentNumber("");
        setUseSameNumber(true);
        setRecipientNumber("");
      }, 300);

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Complete Your Purchase</DialogTitle>
          <p className="text-sm text-muted-foreground pt-1">
            {bundleName} - Ksh {bundlePrice}/=
          </p>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="payment-number">Number To Pay</Label>
            <Input
              id="payment-number"
              type="tel"
              placeholder="0712345678"
              value={paymentNumber}
              onChange={(e) => setPaymentNumber(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="use-same-number"
              checked={useSameNumber}
              onCheckedChange={(checked) => setUseSameNumber(checked as boolean)}
            />
            <label
              htmlFor="use-same-number"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use same number to receive package
            </label>
          </div>

          {!useSameNumber && (
            <div className="space-y-2">
              <Label htmlFor="recipient-number">No. To Receive Package</Label>
              <Input
                id="recipient-number"
                type="tel"
                placeholder="0712345678"
                value={recipientNumber}
                onChange={(e) => setRecipientNumber(e.target.value)}
              />
            </div>
          )}

          <Button 
            className="w-full" 
            size="lg"
            onClick={handleConfirmPurchase}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Confirm Purchase"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDialog;
