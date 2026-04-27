import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function SectionTitle() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.8 }}
      className="text-center mb-12 md:mb-16"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
        <Leaf className="w-4 h-4 text-primary/50" strokeWidth={1.5} />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
      </div>
      <h2 className="font-serif text-2xl md:text-3xl font-light italic text-foreground mb-3">
        Botanical Collection
      </h2>
      <p className="text-xs font-sans font-light tracking-wider text-muted-foreground max-w-md mx-auto leading-relaxed">
        Cultivate rare specimens under the moonlight. Each plant responds to your care and the celestial cycle.
      </p>
    </motion.div>
  );
}