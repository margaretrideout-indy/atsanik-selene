import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PlantCard({ plant, index, onNurture }) {
  const Icon = plant.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.7, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-primary/10 bg-card/60 backdrop-blur-xl overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${plant.glowColor} 0%, transparent 60%)`,
        }}
      />

      <div className="relative p-6 md:p-8 flex flex-col h-full">
        {/* Top row: icon + rarity */}
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 rounded-xl border border-primary/10 bg-primary/5">
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <span
            className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium px-3 py-1 rounded-full border"
            style={{
              color: plant.rarityColor,
              borderColor: plant.rarityColor + '33',
              backgroundColor: plant.rarityColor + '0D',
            }}
          >
            {plant.rarity}
          </span>
        </div>

        {/* Name & Description */}
        <h3 className="font-serif text-xl md:text-2xl font-light italic text-foreground mb-2">
          {plant.name}
        </h3>
        <p className="text-xs font-sans font-light leading-relaxed text-muted-foreground mb-6 flex-1">
          {plant.description}
        </p>

        {/* Element */}
        <p className="text-[10px] tracking-[0.15em] uppercase font-sans text-primary/60 mb-4">
          Element · {plant.element}
        </p>

        {/* Growth Progress */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] tracking-wider uppercase font-sans text-muted-foreground">
              Growth
            </span>
            <span className="text-[10px] font-sans text-foreground/70 tabular-nums">
              {plant.growth}%
            </span>
          </div>
          <div className="h-1 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: plant.barColor }}
              initial={{ width: 0 }}
              animate={{ width: `${plant.growth}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Nurture Button */}
        <Button
          variant="outline"
          onClick={onNurture}
          disabled={plant.growth >= 100}
          className="w-full border-primary/20 bg-transparent hover:bg-primary/10 hover:border-primary/30 text-foreground font-sans font-light text-xs tracking-wider uppercase h-10 transition-all duration-300 group/btn"
        >
          <Sprout className="w-3.5 h-3.5 mr-2 text-primary group-hover/btn:scale-110 transition-transform" strokeWidth={1.5} />
          {plant.growth >= 100 ? 'Fully Bloomed' : 'Nurture'}
          {plant.growth >= 100 && (
            <Heart className="w-3 h-3 ml-2 text-accent fill-accent" strokeWidth={1.5} />
          )}
        </Button>
      </div>
    </motion.div>
  );
}