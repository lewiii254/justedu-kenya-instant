import { useState } from "react";
import { Wifi } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PurchaseDialog from "@/components/PurchaseDialog";

interface Bundle {
  id: number;
  name: string;
  data: string;
  price: number;
  validity: string;
  features?: string[];
}

const Data = () => {
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const bundles: Bundle[] = [
    { id: 1, name: "ama zing me", data: "ama zing me", price: 1, validity: "30 Days", features: ["Unlimited", "best offers"] },
    { id: 2, name: "kelvin me", data: "1GB", price: 19, validity: "1HR" },
    { id: 3, name: "Daily Bundle", data: "250MB", price: 20, validity: "24HRS" },
    { id: 4, name: "Hourly Pro", data: "1GB", price: 21, validity: "1HR", features: ["Unlimited purchases"] },
    { id: 5, name: "Weekly Lite", data: "350MB", price: 49, validity: "7DAYS" },
    { id: 6, name: "Midnight Bundle", data: "1.5GB", price: 50, validity: "3HRS" },
    { id: 7, name: "Kredi Bundle", data: "200 Kredo", price: 52, validity: "MIDNIGHT" },
    { id: 8, name: "3 Hours Bundle", data: "1.5GB", price: 53, validity: "3HRS", features: ["Unlimited purchases"] },
    { id: 9, name: "Midnight Pro", data: "1.25GB", price: 55, validity: "MIDNIGHT" },
    { id: 10, name: "Daily Data", data: "1GB", price: 99, validity: "24HRS" },
    { id: 11, name: "Daily Bundle", data: "2GB", price: 110, validity: "24HRS" },
    { id: 12, name: "Weekly Bundle", data: "2.5GB", price: 300, validity: "7DAYS" },
    { id: 13, name: "Monthly Lite", data: "6GB", price: 700, validity: "7DAYS" },
  ];

  const handleBuyNow = (bundle: Bundle) => {
    setSelectedBundle(bundle);
    setDialogOpen(true);
  };

  const getValidityColor = (validity: string) => {
    if (validity.includes("HR")) return "bg-accent/20 text-accent-foreground border-accent";
    if (validity.includes("MIDNIGHT")) return "bg-warning/20 text-warning border-warning";
    if (validity.includes("24HRS")) return "bg-success/20 text-success-foreground border-success";
    if (validity.includes("DAYS")) return "bg-primary/20 text-primary border-primary";
    return "bg-secondary/20 text-secondary-foreground border-secondary";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 bg-accent/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bingwa Data Bundles</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our affordable data packages. All bundles can be bought unlimited times per day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bundles.map((bundle) => (
              <Card 
                key={bundle.id}
                className="relative overflow-hidden hover:shadow-xl transition-smooth bg-background"
              >
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant="outline" 
                    className={getValidityColor(bundle.validity)}
                  >
                    {bundle.validity}
                  </Badge>
                </div>

                <CardContent className="pt-8 pb-6 px-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Wifi className="w-6 h-6 text-primary" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{bundle.data}</h3>
                    
                    {bundle.features && (
                      <div className="space-y-1 mb-3">
                        {bundle.features.map((feature, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground">
                            • {feature}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-2xl font-bold text-primary">
                      Ksh {bundle.price}/=
                    </p>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => handleBuyNow(bundle)}
                  >
                    Buy Now
                  </Button>
                </CardContent>
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

export default Data;
