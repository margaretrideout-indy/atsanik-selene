import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const now = new Date();
  const { phase, illumination, emoji, age } = calculateMoonPhase(now);

  return Response.json({ phase, illumination, emoji, age, timestamp: now.toISOString() });
});

// Accurate astronomical moon phase calculation
// Based on Jean Meeus "Astronomical Algorithms"
function calculateMoonPhase(date) {
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const synodicMonth = 29.53058867;
  const msPerDay = 1000 * 60 * 60 * 24;

  const daysSince = (date - knownNewMoon) / msPerDay;
  const age = ((daysSince % synodicMonth) + synodicMonth) % synodicMonth;
  const progress = age / synodicMonth; // 0 → 1

  // Illumination: 0 at new moon, 1 at full moon, 0 again at next new moon
  const illumination = Math.round(((1 - Math.cos(progress * 2 * Math.PI)) / 2) * 100);

  // Phase bands
  let phase, emoji;
  if (age < 1.85) {
    phase = 'New Moon'; emoji = '🌑';
  } else if (age < 7.38) {
    phase = 'Waxing Crescent'; emoji = '🌒';
  } else if (age < 9.22) {
    phase = 'First Quarter'; emoji = '🌓';
  } else if (age < 14.76) {
    phase = 'Waxing Gibbous'; emoji = '🌔';
  } else if (age < 16.61) {
    phase = 'Full Moon'; emoji = '🌕';
  } else if (age < 22.15) {
    phase = 'Waning Gibbous'; emoji = '🌖';
  } else if (age < 23.99) {
    phase = 'Last Quarter'; emoji = '🌗';
  } else if (age < 29.53) {
    phase = 'Waning Crescent'; emoji = '🌘';
  } else {
    phase = 'New Moon'; emoji = '🌑';
  }

  return { phase, illumination, emoji, age: Math.round(age * 10) / 10 };
}