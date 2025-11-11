import { MessageSquare, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";

const SmsBundles = () => {
  const smsBundles = [
    { id: 1, messages: 50, price: 15 },
    { id: 2, messages: 100, price: 25 },
    { id: 3, messages: 200, price: 45 },
    { id: 4, messages: 500, price: 100 },
  ];

  const minutesBundles = [
    { id: 1, minutes: 60, price: 20 },
    { id: 2, minutes: 200, price: 60 },
    { id: 3, minutes: 500, price: 140 },
    { id: 4, minutes: 1000, price: 250 },
  ];

  const handleBuyBundle = (type: string, bundle: any) => {
    toast.success(`Selected ${type} bundle. Please enter your phone number to proceed.`);
    const element = document.getElementById("airtime");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="sms" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">SMS & Minutes Bundles</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay connected with affordable SMS and calling bundles for all networks.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* SMS Bundles */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">SMS Bundles</h3>
            </div>

            <div className="grid gap-4">
              {smsBundles.map((bundle) => (
                <Card key={bundle.id} className="hover:shadow-lg transition-smooth">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{bundle.messages} SMS</span>
                      <span className="text-2xl font-bold text-primary">Ksh {bundle.price}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleBuyBundle("SMS", bundle)}
                    >
                      Buy SMS Bundle
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Minutes Bundles */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Calling Minutes</h3>
            </div>

            <div className="grid gap-4">
              {minutesBundles.map((bundle) => (
                <Card key={bundle.id} className="hover:shadow-lg transition-smooth">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{bundle.minutes} Minutes</span>
                      <span className="text-2xl font-bold text-primary">Ksh {bundle.price}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleBuyBundle("Minutes", bundle)}
                    >
                      Buy Minutes Bundle
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmsBundles;
