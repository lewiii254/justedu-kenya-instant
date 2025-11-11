import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">JE</span>
              </div>
              <span className="text-xl font-bold">JustEdu</span>
            </div>
            <p className="text-sm text-background/80">
              Kenya's trusted partner for instant airtime, data bundles, SMS and minutes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#airtime" className="hover:text-primary transition-fast">Buy Airtime</a></li>
              <li><a href="#data" className="hover:text-primary transition-fast">Data Bundles</a></li>
              <li><a href="#sms" className="hover:text-primary transition-fast">SMS & Minutes</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-fast">Reviews</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#contact" className="hover:text-primary transition-fast">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-fast">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition-fast">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition-fast">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-fast">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-fast">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-fast">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-background/80">
              <Mail className="w-4 h-4" />
              <span>support@justedu.co.ke</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>&copy; {currentYear} JustEdu. All rights reserved. Built with ❤️ in Kenya.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
