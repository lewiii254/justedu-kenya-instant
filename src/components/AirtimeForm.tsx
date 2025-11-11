import { useState } from "react";
import { Phone, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";

const AirtimeForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useSameNumber, setUseSameNumber] = useState(true);
  const [recipientNumber, setRecipientNumber] = useState("");

  const networks = [
    { name: "Safaricom", color: "bg-[#00B14F]" },
    { name: "Airtel", color: "bg-[#ED1C24]" },
    { name: "Telkom", color: "bg-[#0033A0]" },
  ];

  const quickAmounts = [20, 50, 100, 200, 500, 1000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!phoneNumber || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    if (phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (parseInt(amount) < 10) {
      toast.error("Minimum amount is Ksh 10");
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      toast.success("STK Push sent! Please check your phone to complete payment");
      // Reset form
      setPhoneNumber("");
      setAmount("");
    }, 2000);
  };

  return (
    <section id="airtime" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Buy Airtime Instantly</h2>
          <p className="text-lg text-muted-foreground">
            Quick airtime top-up for Safaricom, Airtel & Telkom. No registration required.
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Top Up Airtime</CardTitle>
            <CardDescription>
              Enter your phone number and amount. Pay with M-Pesa for instant delivery.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Network Icons */}
              <div className="flex justify-center gap-4 pb-4">
                {networks.map((network) => (
                  <div key={network.name} className="text-center">
                    <div className={`w-12 h-12 ${network.color} rounded-full flex items-center justify-center mb-1`}>
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-muted-foreground">{network.name}</span>
                  </div>
                ))}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone">Number To Pay</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Same Number Checkbox */}
              <div className="flex items-center space-x-2 p-3 rounded-lg border bg-muted/30">
                <input
                  type="checkbox"
                  id="sameNumber"
                  checked={useSameNumber}
                  onChange={(e) => setUseSameNumber(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <Label htmlFor="sameNumber" className="cursor-pointer text-sm">
                  Use same number to receive package
                </Label>
              </div>

              {/* Recipient Number (Conditional) */}
              {!useSameNumber && (
                <div className="space-y-2">
                  <Label htmlFor="recipient">No. To Receive Package</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="recipient"
                      type="tel"
                      placeholder="0712345678"
                      value={recipientNumber}
                      onChange={(e) => setRecipientNumber(e.target.value)}
                      className="pl-10"
                      maxLength={10}
                    />
                  </div>
                </div>
              )}

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (Ksh)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10"
                    min="10"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="space-y-2">
                <Label>Quick Amount</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      className={amount === quickAmount.toString() ? "border-primary bg-primary-light" : ""}
                    >
                      {quickAmount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Pay with M-Pesa"}
              </Button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">All Networks</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">Instant</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-xs text-muted-foreground">Secure</span>
                </div>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                By proceeding, you agree to our terms and conditions. 
                You will receive an M-Pesa STK push to complete payment.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AirtimeForm;
