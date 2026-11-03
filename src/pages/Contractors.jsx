import { useState } from 'react';
import { api } from '../api.js';
import { SITE, wa } from '../config.js';

const perks = [
  ['Nationwide delivery', 'From our Lagos factory to your site. We deliver factory-direct to most states, so your painters are never left waiting on a distributor.'],
  ['Factory-direct pricing', 'Cut out the distributor markup. Buy bulk straight from our Lagos manufacturing facility.'],
  ['100% colour consistency', 'Computerised tinting gives batch-to-batch exact matching, so touch-ups blend in and save you a coat.'],
];
const empty = { name: '', company: '', phone: '', email: '', details: '' };

export default function Contractors() {
  const [f, setF] = useState(empty);
  const [state, setState] = useState({ busy: false, done: false, error: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setState({ busy: true, done: false, error: '' });
    try { await api.post('/quotes', f); setState({ busy: false, done: true, error: '' }); }
    catch (err) { setState({ busy: false, done: false, error: err.message }); }
  }
  const waText = `Hello Legend Paints! I'm ${f.name}${f.company ? ` from ${f.company}` : ''}. I need a quote for: ${f.details}`;

  return (
    <>
      <section className="hero small contractor-hero-section">
        <video className="contractor-video" src="/legend-paints-pour.mp4" poster="/legend-paints-poster.jpg" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="contractor-video-shade" />
        <div className="wrap hero-in contractor-hero">
          <div className="contractor-hero-copy">
            <p className="eyebrow">Contractor supply programme</p>
            <h1>Stop losing money to delayed paint deliveries and patchy finishes.</h1>
            <p className="lead">Factory-direct bulk pricing with no middlemen, delivery to most states in Nigeria, and 100% batch-to-batch colour consistency for your next site.</p>
            <div className="row"><a className="btn gold" href="#quote">Get a custom bulk quote</a><a className="btn ghost" href={`tel:${SITE.phones[0]}`}>Call sales team</a></div>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <p className="eyebrow dark-eyebrow">Why contractors choose Legend</p>
        <h2>Built factory-direct, scaled for margins</h2>
        <div className="perks">{perks.map(([t, d], i) => <div key={t}><span className="perk-number">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
        <blockquote>
          <span className="quote-mark">&ldquo;</span>
          &ldquo;Finding a reliable supplier was a nightmare until I tried Legend Paints. The paint goes on thick and hides imperfections, saving my guys a whole coat. Getting it factory-direct to my site in Lekki meant no distributor markups.&rdquo;
          <cite>Tunde, Site Manager, Lekki</cite>
        </blockquote>
      </section>
      <section className="wrap section split" id="quote">
        <div>
          <p className="eyebrow dark-eyebrow">Consistency you can build on</p>
          <h2>The &ldquo;exact match&rdquo; colour guarantee</h2>
          <p>A client rejecting a finish because the colour is slightly off is costly. We obsess over batch-to-batch consistency so the bucket you buy today matches the one you buy next month.</p>
          <ul className="ticks dark">
            <li>Excellent hiding power, so no time wasted on extra coats</li>
            <li>Formulated to resist mould in heavy Nigerian humidity</li>
            <li>A dedicated account manager who answers the phone</li>
          </ul>
        </div>
        <form className="form" onSubmit={submit}>
          <span className="form-kicker">Start your project</span>
          <h2>Get a custom quote</h2>
          <p className="muted">One room or a whole estate: our team replies within 30 minutes during business hours ({SITE.hours}), or first thing the next working day.</p>
          {state.done ? (
            <div className="ok" role="status">
              <b>Quote request received.</b> We will call you shortly. Want a faster reply?
              <p><a className="btn dark" href={wa(waText)} target="_blank" rel="noreferrer">Also message us on WhatsApp</a></p>
            </div>
          ) : (
            <>
              <label>Full name<input required value={f.name} onChange={set('name')} autoComplete="name" /></label>
              <label>Company name (optional)<input value={f.company} onChange={set('company')} autoComplete="organization" /></label>
              <label>Phone number<input required type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" /></label>
              <label>Email address<input type="email" value={f.email} onChange={set('email')} autoComplete="email" /></label>
              <label>What do you need painted?<textarea required rows="4" value={f.details} onChange={set('details')} placeholder="Type of building, size, products and colours, delivery location" /></label>
              {state.error && <p className="err" role="alert">{state.error}</p>}
              <button className="btn dark full" disabled={state.busy}>{state.busy ? 'Sending…' : 'Request my quote'}</button>
            </>
          )}
        </form>
      </section>
    </>
  );
}
