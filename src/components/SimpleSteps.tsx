import { Smartphone, DollarSign, Zap } from "lucide-react";

const SimpleSteps = () => {
  const steps = [
    {
      icon: Smartphone,
      title: "Enter Your Details",
      description: "Input your mobile number and the desired amount for top-up.",
    },
    {
      icon: DollarSign,
      title: "Confirm Payment",
      description: "You'll receive an M-Pesa STK push. Enter your PIN to confirm the payment.",
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "Your airtime, data, or SMS bundle will be delivered instantly to your phone.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Simple Steps to Get Started
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="p-8 rounded-xl border bg-card hover:shadow-lg transition-smooth text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleSteps;
