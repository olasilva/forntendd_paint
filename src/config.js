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
export const fallbackProducts = [
  { id: 'fallback-original', name: 'Legend Original Paints', category: 'interior', tag: 'Interior', description: 'Durable, smooth interior emulsion for beautiful everyday spaces.', image: '/pain6y.jpg' },
  { id: 'fallback-silk', name: 'Silk Emulsion', category: 'interior', tag: 'Interior', description: 'A washable silk finish with a soft, elegant sheen.', image: '/paint11.jpg' },
  { id: 'fallback-flexcote', name: 'Flexcote', category: 'exterior', tag: 'Exterior', description: 'Weather-resistant protection designed for Nigerian conditions.', image: '/paint22.jpg' },
  { id: 'fallback-textured', name: 'Matt Textured', category: 'exterior', tag: 'Exterior / Specialty', description: 'A richly textured finish that helps hide surface imperfections.', image: '/paint33.jpg' },
  { id: 'fallback-acrylic', name: 'Acrylic High Grade Emulsion', category: 'interior', tag: 'Premium interior', description: 'Premium acrylic coverage with a refined, long-lasting finish.', image: '/paint44.jpg' },
];
export const fallbackPosts = [
  { id: 'fallback-colour-guide', slug: 'choosing-the-right-paint-colour', title: 'Choosing the right paint colour for your space', excerpt: 'A practical guide to selecting colours that feel right in Nigerian light and climate.', body: 'The right colour can change how a room feels from morning to evening. Start by observing the natural light and the surfaces already in the room.\n\nTest a physical colour card before ordering. Screens vary, and the same shade can look warmer or cooler depending on the surrounding finishes.', createdAt: '2026-01-15' },
];
export const wa = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
