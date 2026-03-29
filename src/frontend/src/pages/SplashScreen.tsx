import { useEffect, useState } from "react";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFading(true), 1800);
    const doneTimer = setTimeout(() => onDone(), 2300);
    return () => {
      clearTimeout(timer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 bazaar-gradient flex flex-col items-center justify-center transition-opacity duration-500 z-50 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="animate-fade-in">
        <div className="bg-white rounded-2xl px-8 py-5 shadow-2xl mb-8">
          <img
            src="/assets/uploads/image-1-2.png"
            alt="BazaarNet"
            className="h-24 md:h-28 w-auto object-contain"
          />
        </div>
      </div>

      {/* Tagline */}
      <p className="text-white/80 text-lg font-sans tracking-wide animate-fade-in stagger-2 mb-12">
        Connecting Wholesalers &amp; Retailers
      </p>

      {/* Spinner */}
      <div className="animate-fade-in stagger-3">
        <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white splash-ring" />
      </div>
    </div>
  );
}
