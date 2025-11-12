import { useState } from "react";
import { Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PurchaseDialog from "@/components/PurchaseDialog";

const Minutes = () => {
  const [selectedBundle, setSelectedBundle] = useState<{name: string, price: number} | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const minutesBundles = [
    { id: 1, minutes: 45, price: 22, validity: "3HRS" },
    { id: 2, minutes: 50, price: 51, validity: "MIDNIGHT" },
  ];

  const handleBuyNow = (bundle: typeof minutesBundles[0]) => {
    setSelectedBundle({
      name: `${bundle.minutes} Min - ${bundle.validity}`,
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Minutes Bundles</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay connected with affordable calling minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {minutesBundles.map((bundle) => (
              <Card key={bundle.id} className="relative hover:shadow-lg transition-smooth border-2 hover:border-primary/20">
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-primary-light/20 text-primary border-primary/30">
                    {bundle.validity}
                  </Badge>
                </div>
                
                <CardHeader className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-3">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {bundle.minutes} Min
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

export default Minutes;
