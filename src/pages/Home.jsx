import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../api.js';
import Bucket from '../components/Bucket.jsx';
import { fallbackProducts, productPhotos, SITE } from '../config.js';

const fallback = [{ id: 'f', code: '1025', name: 'Cameo', hex: '#D2A375' }];
const clients = ['RCCG', 'Obafemi Awolowo University', 'National Universities Commission', 'National Council for Arts and Culture', 'Bevis Homes', 'Ambrose Alli University'];

export default function Home() {
  const { data: colors } = useData('/colors', fallback);
  const { data: products } = useData('/products', fallbackProducts);
  const picks = colors.filter((c) => ['1025', '1002', '1011', '1018', '1014', '1032', '1039', '1030'].includes(c.code));
  const swatches = picks.length ? picks : colors.slice(0, 8);
  const [sel, setSel] = useState(null);
  const vref = useRef(null);
  useEffect(() => {
    const v = vref.current;
    if (!v || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    v.pause();
    const last = () => { v.currentTime = v.duration || 6.9; };
    v.readyState >= 1 ? last() : v.addEventListener('loadedmetadata', last, { once: true });
  }, []);
  const cur = swatches.find((c) => c.id === sel) || swatches.find((c) => c.code === '1025') || swatches[0];

  return (
    <>
      <section className="vhero">
        <video ref={vref} className="vhero-video" src="/legend-paints-pour.mp4" poster="/legend-paints-poster.jpg" autoPlay loop muted playsInline preload="auto" aria-hidden="true" />
        <div className="vhero-shade" />
        <div className="wrap vhero-copy">
          <h1>Colour with confidence, through every Lagos season.</h1>
          <p className="lead">Premium, anti-fungal paint engineered for Nigerian humidity. Beautiful finishes, dependable protection, and factory-direct value delivered to your door.</p>
          <div className="row">
            <Link className="btn gold" to="/products">Browse products</Link>
            <Link className="btn ghost-dark" to="/contractors#quote">Get a quote</Link>
          </div>
        </div>
      </section>

      <section className="hero" data-reveal>
        <div className="wrap hero-in">
          <div className="hero-copy">
            <h2>See the colour before you buy the bucket.</h2>
            <p className="lead">Tap a swatch to repaint this wall, or open the Colour Studio to try a whole room.</p>
            <div className="row">
              <Link className="btn gold" to="/colors">Open Colour Studio</Link>
            </div>
            <ul className="ticks">
              <li><b>Anti-fungal</b> blocks mould and damp</li>
              <li><b>UV colour-lock</b> no fading in harsh sun</li>
              <li><b>Direct delivery</b> from factory to your door</li>
            </ul>
          </div>
          <div className="wall-card">
            <div className="wall" style={{ background: cur?.hex }}>
              <div className="wall-light" />
              <div className="wall-label"><b>{cur?.name}</b><span>{cur?.code} · {cur?.hex}</span></div>
            </div>
            <div className="chips" role="group" aria-label="Preview a colour on the wall">
              {swatches.map((c) => (
                <button key={c.id} className={c.id === cur?.id ? 'chip on' : 'chip'} style={{ background: c.hex }} onClick={() => setSel(c.id)} aria-label={c.name} aria-pressed={c.id === cur?.id} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="band" data-reveal>
        <div className="wrap split">
          <div>
            <h2>Stop losing money to delayed paint deliveries.</h2>
            <p>Factory-direct bulk pricing with no middlemen. Delivering to most states in Nigeria, with 100% batch-to-batch colour consistency, guaranteed.</p>
            <div className="row">
              <Link className="btn gold" to="/contractors">Contractor portal</Link>
              <a className="btn ghost" href={`tel:${SITE.phones[0]}`}>Call sales team</a>
            </div>
          </div>
          <dl className="stats">
            <div><dt>20+</dt><dd>years manufacturing, established 2003 in Lagos</dd></div>
            <div><dt>500+</dt><dd>contractor partners across Nigeria</dd></div>
            <div><dt>30 min</dt><dd>quote response for bulk orders</dd></div>
          </dl>
        </div>
      </section>

      <section className="wrap section" data-reveal>
        <p className="muted center">Trusted by Nigeria&rsquo;s leading institutions and companies</p>
        <ul className="clients">{clients.map((c) => <li key={c}>{c}</li>)}</ul>
      </section>

      <section className="wrap section" data-reveal>
        <h2>One factory. Every finish your project needs.</h2>
        <p className="muted lead-sm">From flagship emulsions to marble-grit exteriors, all mixed in Lagos and covered by the same batch-consistency guarantee.</p>
        <div className="grid">
          {products.slice(0, 6).map((p, i) => (
            <Link key={p.id} to={`/products?category=${p.category}`} className="pcard">
              <Bucket src={p.image || productPhotos[i % productPhotos.length].src} label={p.name} color={swatches[(i * 3) % swatches.length]?.hex} />
              <small>{p.tag}</small>
              <h3>{p.name}</h3>
            </Link>
          ))}
        </div>
        <p><Link className="btn dark" to="/products">See all products</Link></p>
      </section>

      <section className="cameo" data-reveal>
        <div className="wrap split">
          <div>
            <small>2026 Colour of the Year</small>
            <h2>Meet Cameo, then paint your own wall with it.</h2>
            <p>A soft café-au-lait warmth, plus 39 more colours from the Legend factory card. Paint a room live: main wall, accent wall, the works. No app, no download.</p>
            <Link className="btn dark" to="/colors?wall=1025">Try Cameo in the Colour Studio</Link>
          </div>
          <div className="cameo-swatch"><b>1025</b><span>Cameo</span><span>#D2A375</span></div>
        </div>
      </section>
    </>
  );
}
