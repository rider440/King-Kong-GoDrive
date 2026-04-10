import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-low border-t border-outline/10 py-6 pb-20 md:pb-6 px-4 md:px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
        <p className="text-[10px] md:text-xs font-bold text-on-surface-variant/70 uppercase tracking-widest text-center md:text-left">
          © {currentYear} King Kong GoDrive. All rights reserved.
        </p>
        
        <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 bg-primary/5 rounded-full border border-primary/10 shadow-sm">
          <span className="text-[9px] md:text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter opacity-60">Developed by</span>
          <span className="text-xs md:text-sm font-black text-primary uppercase tracking-tight">
            Ankur Yadav
          </span>
          <Heart size={12} className="text-error fill-error animate-pulse md:w-3.5 md:h-3.5" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
