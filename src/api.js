import { useEffect, useState } from 'react';

const base = import.meta.env.VITE_API_URL || '';
const publicDataEnabled = import.meta.env.VITE_ENABLE_REMOTE_DATA === 'true';
export const token = {
  get: () => localStorage.getItem('lp_token'),
  set: (t) => localStorage.setItem('lp_token', t),
  clear: () => localStorage.removeItem('lp_token'),
};
export const img = (u) => (u && u.startsWith('/uploads') && base ? base + u : u);

async function req(path, { method = 'GET', body, form } = {}) {
  const headers = {};
  if (token.get()) headers.Authorization = `Bearer ${token.get()}`;
  if (body) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${base}/api${path}`, { method, headers, body: form || (body && JSON.stringify(body)) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || 'Request failed'), { status: res.status });
  return data;
}
export const api = {
  get: (p) => req(p),
  post: (p, body) => req(p, { method: 'POST', body }),
  put: (p, body) => req(p, { method: 'PUT', body }),
  del: (p) => req(p, { method: 'DELETE' }),
  upload: (file) => { const f = new FormData(); f.append('file', file); return req('/admin/upload', { method: 'POST', form: f }); },
};

export function useData(path, initial = []) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let live = true;
    if (!publicDataEnabled) {
      setLoading(false);
      return () => { live = false; };
    }
    setLoading(true);
    setError('');
    api.get(path).then((d) => live && setData(d)).catch((e) => live && setError(e.message)).finally(() => live && setLoading(false));
    return () => { live = false; };
  }, [path]);
  return { data, loading, error };
}
