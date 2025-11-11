import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">JE</span>
            </div>
            <span className="text-xl font-bold text-foreground">JustEdu</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("airtime")}
              className="text-foreground hover:text-primary transition-fast"
            >
              Airtime
            </button>
            <button
              onClick={() => scrollToSection("data")}
              className="text-foreground hover:text-primary transition-fast"
            >
              Data Bundles
            </button>
            <button
              onClick={() => scrollToSection("sms")}
              className="text-foreground hover:text-primary transition-fast"
            >
              SMS & Minutes
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-foreground hover:text-primary transition-fast"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-fast"
            >
              Contact
            </button>
            <Button onClick={() => scrollToSection("airtime")} size="sm">
              Buy Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-fast"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection("airtime")}
                className="text-left px-4 py-2 hover:bg-secondary rounded-lg transition-fast"
              >
                Airtime
              </button>
              <button
                onClick={() => scrollToSection("data")}
                className="text-left px-4 py-2 hover:bg-secondary rounded-lg transition-fast"
              >
                Data Bundles
              </button>
              <button
                onClick={() => scrollToSection("sms")}
                className="text-left px-4 py-2 hover:bg-secondary rounded-lg transition-fast"
              >
                SMS & Minutes
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-left px-4 py-2 hover:bg-secondary rounded-lg transition-fast"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left px-4 py-2 hover:bg-secondary rounded-lg transition-fast"
              >
                Contact
              </button>
              <Button onClick={() => scrollToSection("airtime")} className="mx-4">
                Buy Now
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
