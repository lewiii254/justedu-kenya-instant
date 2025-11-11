import { Wifi, Clock, Repeat } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

const DataBundles = () => {
  const bundles = [
    {
      id: 1,
      name: "1 Hour Bundle",
      data: "1GB",
      validity: "1 Hour",
      price: 21,
      popular: false,
    },
    {
      id: 2,
      name: "3 Hours Bundle",
      data: "1.5GB",
      validity: "3 Hours",
      price: 53,
      popular: true,
    },
    {
      id: 3,
      name: "Daily Bundle",
      data: "2GB",
      validity: "24 Hours",
      price: 110,
      popular: false,
    },
    {
      id: 4,
      name: "Weekly Bundle",
      data: "10GB",
      validity: "7 Days",
      price: 500,
      popular: false,
    },
    {
      id: 5,
      name: "Monthly Lite",
      data: "20GB",
      validity: "30 Days",
      price: 1000,
      popular: false,
    },
    {
      id: 6,
      name: "Monthly Pro",
      data: "50GB",
      validity: "30 Days",
      price: 2000,
      popular: true,
    },
  ];

  const handleBuyBundle = (bundle: typeof bundles[0]) => {
    toast.success(`Selected ${bundle.name}. Please enter your phone number to proceed.`);
    // Scroll to airtime form or open modal
    const element = document.getElementById("airtime");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="data" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bingwa Data Bundles</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our affordable data packages. All bundles can be bought unlimited times per day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <Card 
              key={bundle.id} 
              className={`relative transition-smooth hover:shadow-xl ${
                bundle.popular ? "border-primary shadow-lg" : ""
              }`}
            >
              {bundle.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{bundle.name}</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        {bundle.validity}
                      </div>
                    </CardDescription>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                    <Wifi className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="text-4xl font-bold text-primary">{bundle.data}</div>
                  <div className="text-sm text-muted-foreground">Data allowance</div>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">Ksh {bundle.price}</span>
                  <span className="text-muted-foreground">/=</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Repeat className="w-4 h-4" />
                  <span>Unlimited purchases per day</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={bundle.popular ? "default" : "outline"}
                  onClick={() => handleBuyBundle(bundle)}
                >
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataBundles;
