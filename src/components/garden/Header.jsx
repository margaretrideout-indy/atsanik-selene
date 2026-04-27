import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sparkles } from 'lucide-react';

export default function Header({ moonData }) {
  return (
    <header className="relative z-10 px-6 py-8 md:px-12 lg:px-20">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo & Title */}
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="text-primary"
          >
            <Moon className="w-6 h-6" strokeWidth={1.5} />
          </motion.div>
          <div>
            <h1 className="text-sm md:text-base font-light tracking-[0.3em] uppercase font-sans text-foreground">
              Selene's Garden
            </h1>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mt-0.5">
              Mystical Herbarium
            </p>
          </div>
        </div>

        {/* Moon Phase Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
          <div className="text-right">
            <p className="text-xs font-light font-sans text-foreground/90 tracking-wide">
              {moonData.phase}
            </p>
            <p className="text-[10px] text-muted-foreground font-sans">
              {moonData.illumination}% illuminated
            </p>
          </div>
          <span className="text-base">{moonData.emoji}</span>
        </motion.div>
      </div>
    </header>
  );
}