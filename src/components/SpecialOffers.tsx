import { Zap, Infinity } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      data: "1GB",
      price: 21,
      validity: "1HR",
    },
    {
      id: 2,
      data: "1.5GB",
      price: 53,
      validity: "3HRS",
    },
    {
      id: 3,
      data: "2GB",
      price: 110,
      validity: "24HRS",
    },
  ];

  const handleBuyOffer = (offer: typeof offers[0]) => {
    toast.success(`Selected ${offer.data} bundle. Please enter your phone number to proceed.`);
    const element = document.getElementById("airtime");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 px-4 bg-accent/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent text-accent-foreground hover:bg-accent/90">
            <Infinity className="w-4 h-4 mr-1" />
            Unlimited Purchases
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Special Unlimited Offers
          </h2>
          <p className="text-lg text-muted-foreground">
            Nunua hizi unlimited times ukishindwa na Bingwa Data!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Card 
              key={offer.id}
              className="relative overflow-hidden hover:shadow-xl transition-smooth bg-gradient-to-br from-background to-accent/10"
            >
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-accent/20 border-accent text-accent-foreground">
                  {offer.validity}
                </Badge>
              </div>

              <CardHeader className="pt-8">
                <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold">{offer.data}</h3>
                  <p className="text-3xl font-bold text-primary">Ksh {offer.price}/=</p>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Can be bought <span className="text-accent font-semibold">unlimited times</span> per day
                </p>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleBuyOffer(offer)}
                >
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-warning" />
            <span>Perfect for heavy data users who need constant connectivity</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
