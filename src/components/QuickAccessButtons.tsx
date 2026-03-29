import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const QuickAccessButtons = () => {
  const whatsappNumber = "9884264816";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const mapsUrl = "https://www.google.com/maps/place/13.0856169,80.2127239";

  return (
    <div className="fixed right-6 bottom-24 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <Button
        asChild
        className="rounded-full w-14 h-14 p-0 shadow-lg bg-green-500 hover:bg-green-600 text-white"
        size="icon"
        title="Chat on WhatsApp"
      >
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="w-6 h-6" />
        </a>
      </Button>

      

      {/* Maps Button */}
      <Button
        asChild
        className="rounded-full w-14 h-14 p-0 shadow-lg bg-primary hover:bg-primary/90 text-white"
        size="icon"
        title="Find Us on Maps"
      >
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
          <MapPin className="w-6 h-6" />
        </a>
      </Button>
    </div>
  );
};

export default QuickAccessButtons;
