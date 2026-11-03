export const SITE = {
  phones: ['08023202635', '08035666250'],
  email: 'legendpaints@yahoo.com',
  address: '3, Abiodun Odueke Crescent, Off Una Road, Iju-Ishaga, Lagos',
  hours: 'Mon – Sat · 9am – 5pm',
  whatsapp: '2348023202635',
  instagram: 'https://www.instagram.com/legendpaintsng',
  facebook: 'https://web.facebook.com/profile.php?id=61561375317701',
};
export const wa = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
