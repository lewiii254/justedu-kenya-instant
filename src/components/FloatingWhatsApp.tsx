import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "254797919248"; // Format: country code + number without +
    const message = encodeURIComponent("Hi, I need help with JustEdu services.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-[#25D366] hover:bg-[#20BD5A] z-50 p-0"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </Button>
  );
};

export default FloatingWhatsApp;
