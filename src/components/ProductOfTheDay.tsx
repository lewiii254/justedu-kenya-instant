import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import { Button } from "./ui/button";

const ProductOfTheDay = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner in this session
    const isDismissed = sessionStorage.getItem('productBannerDismissed');
    
    if (!isDismissed) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('productBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md animate-in slide-in-from-top-5 duration-500">
      <div className="relative bg-gradient-to-r from-warning via-warning/90 to-accent p-4 rounded-lg shadow-glow">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 text-white hover:bg-white/20"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="flex items-start gap-3 pr-8">
          <div className="bg-white/20 p-2 rounded-full">
            <Star className="h-5 w-5 text-white fill-white" />
          </div>
          
          <div className="text-white">
            <div className="font-bold text-sm mb-1">Product of the Day!</div>
            <div className="font-bold text-lg">2.5GB - 7 Days</div>
            <div className="text-sm opacity-90">2.5GB • 300/=</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOfTheDay;
