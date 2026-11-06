import { Link, useParams } from 'react-router-dom';
import { useData } from '../api.js';
import { fallbackPosts } from '../config.js';

const date = (d) => new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });

export function Blog() {
  const { data, loading, error } = useData('/posts', fallbackPosts);
  return (
    <div className="wrap page narrow" data-reveal>
      <h1>Blog</h1>
      <p className="lead-sm muted">Practical advice on painting for Nigerian homes and sites.</p>
      {loading && <p>Loading…</p>}
      {error && <p className="err" role="alert">Could not load posts: {error}</p>}
      {!loading && !data.length && <p>No posts yet.</p>}
      {data.map((p) => (
        <article key={p.id} className="post-row">
          <small>{date(p.createdAt)}</small>
          <h2><Link to={`/blog/${p.slug}`}>{p.title}</Link></h2>
          <p>{p.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const fallbackPost = fallbackPosts.find((post) => post.slug === slug) || null;
  const { data: p, loading, error } = useData(`/posts/${slug}`, fallbackPost);
  if (loading) return <div className="wrap page"><p>Loading…</p></div>;
  if (error || !p) return <div className="wrap page"><h1>Post not found</h1><Link to="/blog">Back to the blog</Link></div>;
  return (
    <article className="wrap page narrow prose" data-reveal>
      <small>{date(p.createdAt)}</small>
      <h1>{p.title}</h1>
      {p.body.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}
      <Link to="/blog">← All posts</Link>
    </article>
  );
}
