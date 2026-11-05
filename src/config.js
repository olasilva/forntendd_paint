export const SITE = {
  phones: ['08023202635', '08035666250'],
  email: 'legendpaints@yahoo.com',
  address: '2 Alhaji Yisa Street, Off UNA Road, Iju Ishaga, Lagos',
  hours: 'Mon – Sat · 9am – 5pm',
  whatsapp: '2348023202635',
  instagram: 'https://www.instagram.com/legendpaintsng',
  facebook: 'https://web.facebook.com/profile.php?id=61561375317701',
};
export const productPhotos = [
  { src: '/pain6y.jpg', label: 'Legend Original Paints' },
  { src: '/paint11.jpg', label: 'Silk Emulsion' },
  { src: '/paint22.jpg', label: 'Flexcote' },
  { src: '/paint33.jpg', label: 'Matt Textured' },
  { src: '/paint33%20(1).jpg', label: 'Legend Products' },
  { src: '/paint44.jpg', label: 'Acrylic High Grade Emulsion' },
  { src: '/paint5t.jpg', label: 'Royale Paints' },
];
export const wa = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
