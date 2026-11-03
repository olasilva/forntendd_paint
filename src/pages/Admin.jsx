import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, token, img } from '../api.js';

const resources = {
  products: {
    label: 'Products', fields: [
      { k: 'name', l: 'Name' },
      { k: 'category', l: 'Category', t: 'select', o: ['interior', 'exterior', 'wood-metal'] },
      { k: 'tag', l: 'Label shown on card (e.g. Exterior / Specialty)' },
      { k: 'description', l: 'Description', t: 'textarea' },
      { k: 'image', l: 'Product photo', t: 'image' },
    ], cols: ['name', 'category', 'tag'], blank: { category: 'interior', featured: true },
  },
  colors: {
    label: 'Colours', fields: [
      { k: 'code', l: 'Colour code' }, { k: 'name', l: 'Name' },
      { k: 'family', l: 'Family', t: 'select', o: ['Whites & Neutrals', 'Blues', 'Greens', 'Yellows & Earth', 'Reds & Browns', 'Rose & Lilac'] },
      { k: 'hex', l: 'Colour', t: 'color' },
      { k: 'product', l: 'Product type' }, { k: 'finish', l: 'Finish' }, { k: 'blurb', l: 'Short description (optional)' },
    ], cols: ['code', 'name', 'family', 'hex'], blank: { hex: '#cccccc', family: 'Whites & Neutrals', product: 'Emulsion', finish: 'Matt' },
  },
  posts: {
    label: 'Blog posts', fields: [
      { k: 'title', l: 'Title' }, { k: 'excerpt', l: 'Summary', t: 'textarea', rows: 2 },
      { k: 'body', l: 'Body (blank line between paragraphs)', t: 'textarea', rows: 12 },
      { k: 'published', l: 'Published', t: 'check' },
    ], cols: ['title', 'published'], blank: { published: false },
  },
};

function Field({ f, value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const v = value ?? '';
  if (f.t === 'textarea') return <label>{f.l}<textarea rows={f.rows || 4} value={v} onChange={(e) => onChange(e.target.value)} /></label>;
  if (f.t === 'select') return <label>{f.l}<select value={v} onChange={(e) => onChange(e.target.value)}>{f.o.map((o) => <option key={o}>{o}</option>)}</select></label>;
  if (f.t === 'color') return <label>{f.l}<input type="color" value={v || '#cccccc'} onChange={(e) => onChange(e.target.value)} /></label>;
  if (f.t === 'check') return <label className="inline"><input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} /> {f.l}</label>;
  if (f.t === 'image') {
    return (
      <label>{f.l}
        {v && <img className="thumb" src={img(v)} alt="" />}
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={async (e) => {
          const file = e.target.files[0]; if (!file) return;
          setBusy(true); setErr('');
          try { onChange((await api.upload(file)).url); } catch (x) { setErr(x.message); }
          setBusy(false);
        }} />
        {busy && <small>Uploading…</small>}{err && <small className="err">{err}</small>}
        {v && <button type="button" className="link" onClick={() => onChange('')}>Remove photo</button>}
      </label>
    );
  }
  return <label>{f.l}<input value={v} onChange={(e) => onChange(e.target.value)} /></label>;
}

function Crud({ name }) {
  const cfg = resources[name];
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);
  const [err, setErr] = useState('');
  const load = () => api.get(`/${name}`).then(setItems).catch((e) => setErr(e.message));
  useEffect(() => { setEdit(null); load(); }, [name]); // eslint-disable-line

  async function save(e) {
    e.preventDefault(); setErr('');
    try {
      if (edit.id) await api.put(`/${name}/${edit.id}`, edit); else await api.post(`/${name}`, edit);
      setEdit(null); load();
    } catch (x) { setErr(x.message); }
  }
  async function remove(it) {
    if (!confirm(`Delete "${it.name || it.title}"? This cannot be undone.`)) return;
    await api.del(`/${name}/${it.id}`); load();
  }

  if (edit) {
    return (
      <form className="form admin-form" onSubmit={save}>
        <h2>{edit.id ? 'Edit' : 'Add'} {cfg.label.toLowerCase().replace(/s$/, '')}</h2>
        {cfg.fields.map((f) => <Field key={f.k} f={f} value={edit[f.k]} onChange={(v) => setEdit({ ...edit, [f.k]: v })} />)}
        {err && <p className="err" role="alert">{err}</p>}
        <div className="row"><button className="btn dark">Save changes</button><button type="button" className="btn ghost-dark" onClick={() => setEdit(null)}>Cancel</button></div>
      </form>
    );
  }
  return (
    <div>
      <div className="row between"><h2>{cfg.label} ({items.length})</h2><button className="btn dark" onClick={() => setEdit({ ...cfg.blank })}>Add new</button></div>
      {err && <p className="err">{err}</p>}
      <div className="scroll"><table>
        <thead><tr>{cfg.cols.map((c) => <th key={c}>{c}</th>)}<th /></tr></thead>
        <tbody>{items.map((it) => (
          <tr key={it.id}>
            {cfg.cols.map((c) => <td key={c}>{c === 'hex' ? <span className="dot" style={{ background: it.hex }} title={it.hex} /> : typeof it[c] === 'boolean' ? (it[c] ? 'Published' : 'Draft') : it[c]}</td>)}
            <td className="acts"><button className="link" onClick={() => setEdit(it)}>Edit</button><button className="link danger" onClick={() => remove(it)}>Delete</button></td>
          </tr>
        ))}</tbody>
      </table></div>
    </div>
  );
}

function Quotes() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');
  const load = () => api.get('/admin/quotes').then(setItems).catch((e) => setErr(e.message));
  useEffect(() => { load(); }, []);
  return (
    <div>
      <h2>Quote requests ({items.length})</h2>
      {err && <p className="err">{err}</p>}
      {!items.length && <p className="muted">No quote requests yet. Requests from the contractor page appear here.</p>}
      {items.map((q) => (
        <article key={q.id} className="qcard">
          <div className="row between">
            <b>{q.name}{q.company ? `, ${q.company}` : ''}</b>
            <small>{new Date(q.createdAt).toLocaleString('en-NG')}</small>
          </div>
          <p>{q.details}</p>
          <p className="muted"><a href={`tel:${q.phone}`}>{q.phone}</a>{q.email && <> · <a href={`mailto:${q.email}`}>{q.email}</a></>}</p>
          <div className="row">
            <select value={q.status} onChange={async (e) => { await api.put(`/admin/quotes/${q.id}`, { status: e.target.value }); load(); }}>
              {['new', 'contacted', 'won', 'closed'].map((s) => <option key={s}>{s}</option>)}
            </select>
            <button className="link danger" onClick={async () => { if (confirm('Delete this request?')) { await api.del(`/admin/quotes/${q.id}`); load(); } }}>Delete</button>
          </div>
        </article>
      ))}
    </div>
  );
}

function Login({ onDone }) {
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  async function go(e) {
    e.preventDefault(); setErr('');
    try { token.set((await api.post('/auth/login', f)).token); onDone(); } catch (x) { setErr(x.message); }
  }
  return (
    <div className="login">
      <form className="form" onSubmit={go}>
        <h1>Staff sign in</h1>
        <label>Email<input type="email" required autoComplete="username" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
        <label>Password<input type="password" required autoComplete="current-password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></label>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn dark full">Sign in</button>
        <Link to="/">← Back to site</Link>
      </form>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(!!token.get());
  const [tab, setTab] = useState('quotes');
  useEffect(() => { if (authed) api.get('/auth/me').catch(() => { token.clear(); setAuthed(false); }); }, [authed]);
  if (!authed) return <Login onDone={() => setAuthed(true)} />;
  const tabs = [['quotes', 'Quote requests'], ...Object.entries(resources).map(([k, v]) => [k, v.label])];
  return (
    <div className="admin">
      <aside>
        <div className="logo"><span className="logo-dot" />Legend Admin</div>
        {tabs.map(([k, l]) => <button key={k} className={tab === k ? 'side on' : 'side'} onClick={() => setTab(k)}>{l}</button>)}
        <Link className="side" to="/">View site</Link>
        <button className="side" onClick={() => { token.clear(); setAuthed(false); }}>Sign out</button>
      </aside>
      <section>{tab === 'quotes' ? <Quotes /> : <Crud key={tab} name={tab} />}</section>
    </div>
  );
}
