const sharp = require('sharp');

const createIcon = async (size) => {
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#111111"/>
      <circle cx="${size/2}" cy="${size/2}" r="${size*0.45}" stroke="#00FF33" stroke-width="${size*0.015}" fill="none"/>
      <circle cx="${size/2}" cy="${size/2}" r="${size*0.35}" stroke="#00FF33" stroke-opacity="0.5" stroke-width="${size*0.008}" fill="none"/>
      <circle cx="${size/2}" cy="${size/2}" r="${size*0.25}" stroke="#00FF33" stroke-opacity="0.3" stroke-width="${size*0.008}" fill="none"/>
      <line x1="${size/2}" y1="0" x2="${size/2}" y2="${size}" stroke="#00FF33" stroke-opacity="0.5" stroke-width="${size*0.008}"/>
      <line x1="0" y1="${size/2}" x2="${size}" y2="${size/2}" stroke="#00FF33" stroke-opacity="0.5" stroke-width="${size*0.008}"/>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(`static/images/icon-${size}.png`);
};

// Create icons
Promise.all([
  createIcon(180),
  createIcon(192)
]).catch(console.error);
