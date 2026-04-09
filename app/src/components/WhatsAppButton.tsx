import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-lime-400 animate-ping opacity-20" />
      
      {/* Button */}
      <div className="relative flex items-center justify-center w-14 h-14 bg-lime-400 rounded-full shadow-lg shadow-lime-400/30 hover:shadow-lime-400/50 hover:scale-110 transition-all duration-300">
        <MessageCircle className="w-6 h-6 text-navy-900" />
      </div>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-navy-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chatea con nosotros
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-navy-800 rotate-45" />
      </span>
    </a>
  );
};

export default WhatsAppButton;
