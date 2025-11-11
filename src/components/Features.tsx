import { Smartphone, Wifi, Phone, MessageSquare, Gift } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

const Features = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Instant Airtime Top-up",
      description: "Quickly recharge your mobile with airtime across all Kenyan networks. Instant delivery guaranteed!",
      buttonText: "Top Up Airtime",
      buttonVariant: "default" as const,
      link: "#airtime",
    },
    {
      icon: Wifi,
      title: "Bingwa Data Bundles",
      description: "Get affordable Bingwa data bundles for all your internet needs. Stay connected, always.",
      buttonText: "Buy Data",
      buttonVariant: "default" as const,
      link: "#data",
    },
    {
      icon: Phone,
      title: "Bingwa Minutes",
      description: "Affordable Bingwa minutes bundles for endless calls to any network. Talk more, pay less.",
      buttonText: "Buy Minutes",
      buttonVariant: "default" as const,
      link: "#sms",
    },
    {
      icon: MessageSquare,
      title: "Bingwa SMS Bundles",
      description: "Send more messages with our Bingwa SMS bundles. Stay in touch with friends and family.",
      buttonText: "Buy SMS",
      buttonVariant: "default" as const,
      link: "#sms",
    },
    {
      icon: Gift,
      title: "Loyalty Rewards Program",
      description: "Earn points with every transaction and redeem them for exclusive discounts and free bundles!",
      buttonText: "Learn More",
      buttonVariant: "outline" as const,
      link: "#contact",
    },
  ];

  const handleClick = (link: string) => {
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Instant delivery, affordable prices, and 24/7 support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-smooth flex flex-col"
            >
              <CardHeader className="flex-grow">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  variant={feature.buttonVariant}
                  className="w-full"
                  onClick={() => handleClick(feature.link)}
                >
                  {feature.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
