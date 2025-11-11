import { Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Contact = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/254700000000", "_blank");
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      detail: "+254 7XX XXX XXX",
      description: "Mon-Sun, 6AM - 10PM",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      detail: "Chat with us",
      description: "Quick response 24/7",
    },
    {
      icon: Mail,
      title: "Email",
      detail: "support@justedu.co.ke",
      description: "We reply within 24hrs",
    },
    {
      icon: Clock,
      title: "Working Hours",
      detail: "24/7 Service",
      description: "Always here for you",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our customer support team is always ready to assist you. Reach out anytime!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-smooth">
              <CardContent className="pt-6 space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary-light flex items-center justify-center">
                  <method.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{method.title}</h3>
                <p className="text-primary font-medium">{method.detail}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Get Instant Support on WhatsApp
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Have questions? Need help with a transaction? Our support team is just a message away.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={handleWhatsApp}
            className="shadow-lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
