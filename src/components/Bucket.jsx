import { img } from '../api.js';

export default function Bucket({ label = '', src }) {
  if (src) return <img className="bucket-img" src={img(src)} alt={label} loading="lazy" />;
  return (
    <div className="product-photo-missing" role="img" aria-label={`${label || 'Product'} photo not available`}>
      <span>Real product photo</span>
      <small>Photo coming soon</small>
    </div>
  );
}
