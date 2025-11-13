import { ArrowRight, Shield, Zap, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const scrollToAirtime = () => {
    const element = document.getElementById("airtime");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium">
                Kenya's Trusted Platform
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Instant Airtime & Data Bundles
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground">
              Kenya's trusted partner for instant airtime, Bingwa data bundles, SMS & minutes. 
              Pay securely with M-Pesa. Delivered instantly.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={scrollToAirtime}
                className="group"
              >
                Buy Airtime Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => {
                  const element = document.getElementById("data");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Data Bundles
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Transactions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration placeholder */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-background/80 backdrop-blur-sm rounded-3xl p-8 border border-border">
                <div className="space-y-6">
                  {/* M-Pesa Badge */}
                  <div className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl inline-flex items-center gap-2 font-semibold text-lg">
                    <Shield className="w-5 h-5" />
                    M-Pesa Secure
                  </div>

                  {/* Decorative elements */}
                  <div className="space-y-4">
                    <div className="h-16 bg-primary/10 rounded-xl animate-pulse"></div>
                    <div className="h-24 bg-accent/10 rounded-xl animate-pulse delay-75"></div>
                    <div className="h-20 bg-primary/10 rounded-xl animate-pulse delay-150"></div>
                  </div>

                  {/* Support Badge */}
                  <div className="bg-accent/20 text-accent-foreground px-6 py-3 rounded-2xl inline-flex items-center gap-2 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
