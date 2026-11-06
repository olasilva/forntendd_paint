import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '../api.js';
import { wa } from '../config.js';

const fallbackColors = [
  { id: 'fallback-cameo', code: '1025', name: 'Cameo', hex: '#D2A375', family: 'Yellows & Earth', product: 'Emulsion', finish: 'Matt' },
  { id: 'fallback-accent', code: '1016', name: 'Deep Green', hex: '#385548', family: 'Greens', product: 'Emulsion', finish: 'Matt' },
];

function Room() {
  return <img className="room" src="/house.png" alt="Bright interior with painted green walls and built-in seating" />;
}

export default function Colors() {
  const { data: colors, loading } = useData('/colors', fallbackColors);
  const [params] = useSearchParams();
  const [surface, setSurface] = useState('main');
  const [family, setFamily] = useState('All');
  const [pick, setPick] = useState({ main: null, accent: null });
  const wallCode = params.get('wall');
  const families = useMemo(() => ['All', ...new Set(colors.map((c) => c.family).filter(Boolean))], [colors]);

  useEffect(() => {
    if (!colors.length) return;
    const first = colors.find((c) => c.code === wallCode) || colors.find((c) => c.code === '1025') || colors[0];
    const accent = colors.find((c) => c.code === '1016') || colors[0];
    setPick((p) => ({ main: wallCode ? first : (p.main || first), accent: p.accent || accent }));
  }, [colors, wallCode]);

  const cur = pick[surface];
  const list = family === 'All' ? colors : colors.filter((c) => c.family === family);
  const msg = cur && `Hello Legend Paints! I'd like to order paint in "${cur.name}" (${cur.code} · ${cur.product} · ${cur.finish}).\n\nQuantity: [number of buckets] × 20L\nDelivery area: [your area]`;

  return (
    <div className="wrap page">
      <h1>Colour Studio</h1>
      <p className="lead-sm muted">Explore the Legend palette and see how each colour feels in a finished space.</p>
      {loading && <p>Loading colours…</p>}
      {pick.main && (
        <div className="studio" data-reveal>
          <div>
            <Room />
            <div className="tabs">
              {[['main', 'Main wall'], ['accent', 'Accent wall']].map(([k, l]) => (
                <button key={k} className={surface === k ? 'tab on' : 'tab'} onClick={() => setSurface(k)}>{l}: {pick[k].name}</button>
              ))}
            </div>
          </div>
          <aside className="detail">
            <div className="big-swatch" style={{ background: cur.hex }} />
            <small>{cur.code}</small>
            <h2>{cur.name}</h2>
            <p className="muted">{cur.blurb || `${cur.family || 'Legend colour'}, ${cur.product}, ${cur.finish}.`}</p>
            <a className="btn gold full" href={wa(msg)} target="_blank" rel="noreferrer">Order via WhatsApp</a>
            <Link className="btn dark full" to="/contractors#quote">Get a quote</Link>
            <p className="fine">Screens render colour differently, so {cur.name} may look slightly warmer, cooler or brighter on your actual wall. Check the physical Legend colour card before you order.</p>
          </aside>
        </div>
      )}
      <div className="tabs" role="group" aria-label="Colour family">
        {families.map((f) => <button key={f} className={family === f ? 'tab on' : 'tab'} onClick={() => setFamily(f)}>{f}</button>)}
      </div>
      <div className="swatches">
        {list.map((c) => (
          <button key={c.id} className={cur && c.id === cur.id ? 'sw on' : 'sw'} onClick={() => setPick({ ...pick, [surface]: c })}>
            <span style={{ background: c.hex }} /><b>{c.name}</b><small>{c.code}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
