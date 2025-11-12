import { useState } from "react";
import { MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PurchaseDialog from "@/components/PurchaseDialog";

const Sms = () => {
  const [selectedBundle, setSelectedBundle] = useState<{name: string, price: number} | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const smsBundles = [
    { id: 1, messages: 20, price: 5, validity: "1DAY" },
    { id: 2, messages: 200, price: 10, validity: "1DAY" },
    { id: 3, messages: 1000, price: 30, validity: "7DAYS" },
    { id: 4, messages: 1500, price: 101, validity: "30DAYS" },
    { id: 5, messages: 3500, price: 201, validity: "30DAYS" },
  ];

  const handleBuyNow = (bundle: typeof smsBundles[0]) => {
    setSelectedBundle({
      name: `${bundle.messages} SMS - ${bundle.validity}`,
      price: bundle.price
    });
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">SMS Bundles</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Affordable SMS packages to stay connected with everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {smsBundles.map((bundle) => (
              <Card key={bundle.id} className="relative hover:shadow-lg transition-smooth border-2 hover:border-primary/20">
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-primary-light/20 text-primary border-primary/30">
                    {bundle.validity}
                  </Badge>
                </div>
                
                <CardHeader className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-3">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {bundle.messages.toLocaleString()} SMS
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    Ksh {bundle.price}/=
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleBuyNow(bundle)}
                  >
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {selectedBundle && (
        <PurchaseDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          bundleName={selectedBundle.name}
          bundlePrice={selectedBundle.price}
        />
      )}
    </div>
  );
};

export default Sms;
