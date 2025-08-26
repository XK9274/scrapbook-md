import React, {useEffect, useState} from 'react';

// Small, focused colour selector that sets CSS variables and persists selection.
export default function ColourSelector(): React.JSX.Element {
  const [selected, setSelected] = useState<string>('');

  // Shorter palette: 8 colours (4 cool, 4 warm) — balanced selection
  const palette = [
    '#11accd', // teal
    '#63d9ea', // cyan
    '#0c7f99', // deep teal
    '#6495ed', // blue

    '#ff6b35', // warm orange (current)
    '#ff8c00', // dark orange
    '#ff4500', // orange-red
    '#df0030'  // magenta-red
  ];

  // Helper: convert hex to rgb object
  const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    const num = parseInt(h, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  // Helper: convert rgb to hex
  const rgbToHex = (r: number, g: number, b: number) =>
    '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

  // Simple shade: mix with white for positive pct, with black for negative pct
  const shade = (hex: string, pct: number) => {
    const {r, g, b} = hexToRgb(hex);
    if (pct === 0) return hex;
    if (pct > 0) {
      const nr = Math.round(r + (255 - r) * pct);
      const ng = Math.round(g + (255 - g) * pct);
      const nb = Math.round(b + (255 - b) * pct);
      return rgbToHex(nr, ng, nb);
    }
    // negative -> darker
    const nr = Math.round(r * (1 + pct));
    const ng = Math.round(g * (1 + pct));
    const nb = Math.round(b * (1 + pct));
    return rgbToHex(Math.max(0, nr), Math.max(0, ng), Math.max(0, nb));
  };

  // Build an ascii gradient variable string from a base hex. We generate 6 stops
  const buildAsciiGradient = (baseHex: string) => {
    // from darker (top) to lighter (bottom)
    const stops = [ -0.18, -0.08, 0, 0.08, 0.16, 0.28 ].map(p => shade(baseHex, p));
    const perc = [0, 20, 40, 60, 80, 100];
    const parts = stops.map((c, i) => `${c} ${perc[i]}%`);
    return `linear-gradient(to bottom, ${parts.join(', ')})`;
  };

  // Apply selected color to CSS variables and persist
  const applyColor = (hex: string) => {
    const root = document.documentElement;
    if (!root) return;
    // primary value and a few derived shades used across the site
    root.style.setProperty('--ifm-color-primary', hex);
    root.style.setProperty('--ideas-primary', hex);
    root.style.setProperty('--tags-primary', hex);

    // Derived lighter/darker shades
    root.style.setProperty('--ifm-color-primary-dark', shade(hex, -0.08));
    root.style.setProperty('--ifm-color-primary-darker', shade(hex, -0.12));
    root.style.setProperty('--ifm-color-primary-darkest', shade(hex, -0.2));
    root.style.setProperty('--ifm-color-primary-light', shade(hex, 0.08));
    root.style.setProperty('--ifm-color-primary-lighter', shade(hex, 0.12));
    root.style.setProperty('--ifm-color-primary-lightest', shade(hex, 0.2));

    // RGB triple for CSS rgba() usage elsewhere
    const {r, g, b} = hexToRgb(hex);
    root.style.setProperty('--ifm-color-primary-rgb', `${r},${g},${b}`);

    // ascii banner gradient
    const ascii = buildAsciiGradient(hex);
    root.style.setProperty('--ascii-gradient', ascii);

    try { localStorage.setItem('scrapbook:primaryColor', hex); } catch {}
    setSelected(hex);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('scrapbook:primaryColor');
      if (saved) {
        setSelected(saved);
        // apply on load
        setTimeout(() => applyColor(saved), 0);
      }
    } catch {}
    // set default ascii gradient if not present
    try {
      const root = document.documentElement;
      if (root && !root.style.getPropertyValue('--ascii-gradient')) {
        root.style.setProperty('--ascii-gradient', buildAsciiGradient(getDefault()));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDefault = () => '#ff6b35';

  return (
    <div aria-label="Theme colour selector" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', width: '92px', marginLeft: '6px' }}>
      {palette.map((c, i) => (
        <button
          key={c + i}
          onClick={(e) => { e.preventDefault(); applyColor(c); }}
          title={`Select ${c}`}
          aria-label={`Select colour ${c}`}
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '4px',
            border: selected === c ? '2px solid rgba(255,255,255,0.9)' : '1px solid rgba(255,255,255,0.12)',
            background: c,
            padding: 0,
            cursor: 'pointer'
          }}
        />
      ))}
    </div>
  );
}
