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
                <Label htmlFor="phone">Phone Number</Label>
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
