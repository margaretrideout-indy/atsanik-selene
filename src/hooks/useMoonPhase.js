import { useState, useEffect } from 'react';

const MOON_PHASES = [
  { name: 'New Moon', emoji: '🌑' },
  { name: 'Waxing Crescent', emoji: '🌒' },
  { name: 'First Quarter', emoji: '🌓' },
  { name: 'Waxing Gibbous', emoji: '🌔' },
  { name: 'Full Moon', emoji: '🌕' },
  { name: 'Waning Gibbous', emoji: '🌖' },
  { name: 'Last Quarter', emoji: '🌗' },
  { name: 'Waning Crescent', emoji: '🌘' },
];

export default function useMoonPhase() {
  const [moonData, setMoonData] = useState({ phase: '', illumination: 0, emoji: '' });

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      // Known new moon: Jan 6, 2000 18:14 UTC
      const knownNewMoon = new Date(2000, 0, 6, 18, 14, 0);
      const synodicMonth = 29.53058867;
      const daysSinceKnown = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
      const currentAge = ((daysSinceKnown % synodicMonth) + synodicMonth) % synodicMonth;
      const phaseProgress = currentAge / synodicMonth; // 0 to 1

      // Illumination: 0 at new moon, 100 at full moon, back to 0
      const illumination = Math.round(
        (1 - Math.cos(phaseProgress * 2 * Math.PI)) / 2 * 100
      );

      // Phase index (0–7)
      const phaseIndex = Math.floor(phaseProgress * 8) % 8;
      const phase = MOON_PHASES[phaseIndex];

      setMoonData({
        phase: phase.name,
        illumination,
        emoji: phase.emoji,
      });
    };

    calculate();
    const interval = setInterval(calculate, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return moonData;
}