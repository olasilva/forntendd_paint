import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE } from '../config.js';

const nav = [['/contractors', 'For Contractors'], ['/colors', 'Colour Studio'], ['/products', 'Products'], ['/blog', 'Blog']];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  useEffect(() => {
    setOpen(false);
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 50);
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const reveal = (root = document) => root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => observer.observe(el));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: 0.12 });
    reveal();
    const mutations = new MutationObserver(() => reveal());
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, [pathname]);

  return (
    <>
      <a className="skip" href="#main">Skip to main content</a>
      <header className="bar">
        <div className="wrap bar-in">
          <Link to="/" className="logo" aria-label="Legend Paints home"><img className="logo-mark" src="/legend2.jpg" alt="" />Legend Paints</Link>
          <button className="menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
          <nav className={open ? 'nav open' : 'nav'}>
            {nav.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
            <Link className="btn gold" to="/contractors#quote">Get a quote</Link>
          </nav>
        </div>
      </header>
      <main id="main" className="page-shell"><Outlet /></main>
      <footer className="foot">
        <div className="wrap foot-in">
          <div>
            <div className="logo"><img className="logo-mark" src="/legend2.jpg" alt="" />Legend Paints</div>
            <p>Premium, weather-resistant paints manufactured in Lagos. A subsidiary of Gerolyn Chemical &amp; Allied Products Ltd. Made in Lagos since 2003.</p>
          </div>
          <div>
            <h4>Explore</h4>
            {[...nav, ['/', 'Home']].map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}
          </div>
          <div>
            <h4>Contact</h4>
            <p>{SITE.address}</p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            {SITE.phones.map((p) => <a key={p} href={`tel:${p}`}>{p}</a>)}
            <p>{SITE.hours}</p>
            <a href={SITE.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
        <div className="wrap foot-base">© {new Date().getFullYear()} Legend Paints · Gerolyn Chemical &amp; Allied Products Ltd.</div>
      </footer>
    </>
  );
}
