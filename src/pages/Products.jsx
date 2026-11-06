import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '../api.js';
import Bucket from '../components/Bucket.jsx';
import { fallbackProducts, productPhotos, wa } from '../config.js';

const cats = [['', 'All products'], ['interior', 'Interior paint'], ['exterior', 'Exterior paint'], ['wood-metal', 'Wood & metal']];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('category') || '';
  const { data, loading, error } = useData('/products', fallbackProducts);
  const shown = cat ? data.filter((p) => p.category === cat || (cat === 'interior' && /Interior/.test(p.tag)) ) : data;

  return (
    <div className="wrap page">
      <h1>Our products</h1>
      <p className="lead-sm muted">We manufacture quality, affordable and durable paint. Whatever the project, Legend Paints is the right choice.</p>
      <section className="product-gallery" aria-labelledby="range-heading" data-reveal>
        <div>
          <p className="eyebrow dark-eyebrow">From our factory</p>
          <h2 id="range-heading">Explore the Legend range</h2>
        </div>
        <div className="product-gallery-grid">
          {productPhotos.map((photo) => (
            <figure key={photo.src} className="product-gallery-card">
              <img src={photo.src} alt={photo.label} loading="lazy" />
              <figcaption>{photo.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <div className="tabs" role="tablist">
        {cats.map(([v, l]) => (
          <button key={v} role="tab" aria-selected={cat === v} className={cat === v ? 'tab on' : 'tab'} onClick={() => setParams(v ? { category: v } : {})}>{l}</button>
        ))}
      </div>
      {loading && <p>Loading products…</p>}
      {error && <p className="err">Could not load products: {error}</p>}
      {!loading && !shown.length && <p>No products in this category yet. <Link to="/contractors#quote">Ask us what we can make for you.</Link></p>}
      <div className="plist">
        {shown.map((p, i) => (
          <article key={p.id} className="prow" data-reveal>
            <div className="prow-img"><Bucket src={p.image || productPhotos[i % productPhotos.length].src} label={p.name} /></div>
            <div>
              <small>{p.tag}</small>
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <a className="btn dark" href={wa(`Hello Legend Paints! I'd like a quote for ${p.name}.\n\nQuantity: [number of buckets] × 20L\nDelivery area: [your area]`)} target="_blank" rel="noreferrer">Get a quote</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
