import React, { useState } from 'react';
import { Flower2, Flame, TreePine } from 'lucide-react';
import useMoonPhase from '@/hooks/useMoonPhase';
import BackgroundGlow from '@/components/garden/BackgroundGlow';
import Header from '@/components/garden/Header';
import SectionTitle from '@/components/garden/SectionTitle';
import PlantCard from '@/components/garden/PlantCard';

const INITIAL_PLANTS = [
  {
    id: 'lavender',
    name: 'Moonlight Lavender',
    description: 'A silvery-violet herb that blooms only under waning moons. Its fragrance induces vivid prophetic dreams.',
    element: 'Lunar Water',
    rarity: 'Rare',
    rarityColor: '#a78bfa',
    icon: Flower2,
    growth: 24,
    glowColor: 'rgba(167,139,250,0.06)',
    barColor: '#a78bfa',
  },
  {
    id: 'cinder',
    name: 'Cinder Bloom',
    description: 'Born from volcanic ash, this ember-petaled flower radiates warmth and can ignite under a full moon.',
    element: 'Solar Fire',
    rarity: 'Legendary',
    rarityColor: '#f59e0b',
    icon: Flame,
    growth: 58,
    glowColor: 'rgba(245,158,11,0.06)',
    barColor: '#f59e0b',
  },
  {
    id: 'ivy',
    name: 'Star-Stitched Ivy',
    description: 'An ancient creeping vine whose leaves are traced with bioluminescent constellations after dusk.',
    element: 'Verdant Earth',
    rarity: 'Uncommon',
    rarityColor: '#34d399',
    icon: TreePine,
    growth: 41,
    glowColor: 'rgba(52,211,153,0.06)',
    barColor: '#34d399',
  },
];

export default function Garden() {
  const moonData = useMoonPhase();
  const [plants, setPlants] = useState(INITIAL_PLANTS);

  const handleNurture = (id) => {
    setPlants(prev =>
      prev.map(p =>
        p.id === id ? { ...p, growth: Math.min(p.growth + 7, 100) } : p
      )
    );
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#040d0a' }}>
      <BackgroundGlow />

      <Header moonData={moonData} />

      <main className="relative z-10 px-6 md:px-12 lg:px-20 pb-20 pt-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {plants.map((plant, index) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                index={index}
                onNurture={() => handleNurture(plant.id)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-10 text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground/40">
          Selene's Garden · Tended by Moonlight
        </p>
      </footer>
    </div>
  );
}