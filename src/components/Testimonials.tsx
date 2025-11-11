import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jane Wanjiku",
      location: "Nairobi",
      rating: 5,
      text: "JustEdu has been a lifesaver! I can top up airtime anytime, even at midnight. The service is super fast and reliable. Highly recommend!",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "David Omondi",
      location: "Kisumu",
      rating: 5,
      text: "The data bundles are very affordable and I love that I can buy them unlimited times. Customer support is also excellent. Keep it up!",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Sarah Muthoni",
      location: "Mombasa",
      rating: 5,
      text: "Been using JustEdu for 6 months now. Never had any issues. Payment is secure and instant. Best platform for airtime and bundles in Kenya!",
      date: "3 weeks ago",
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust JustEdu for their mobile needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-smooth">
              <CardContent className="pt-6 space-y-4">
                <Quote className="w-10 h-10 text-primary/20" />
                
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="pt-4 border-t border-border">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  <div className="text-xs text-muted-foreground mt-1">{testimonial.date}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-light px-6 py-3 rounded-full">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-semibold">4.9/5</span>
            <span className="text-muted-foreground">from 1,200+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
