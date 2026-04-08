import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function generateOG() {
  // Read the logo SVG and set it to a fixed size
  const logoSvg = readFileSync(join(publicDir, 'logo.svg'), 'utf-8');
  const logoWidth = 500;
  const logoHeight = Math.round(logoWidth * (75.45 / 373.81)); // maintain aspect ratio

  const logoPng = await sharp(Buffer.from(logoSvg))
    .resize(logoWidth, logoHeight)
    .png()
    .toBuffer();

  // Resize the background to OG dimensions
  const bg = await sharp(join(publicDir, 'bg.png'))
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover' })
    .toBuffer();

  // Create "COMING SOON" text as SVG
  const comingSoonSvg = `
    <svg width="400" height="50" xmlns="http://www.w3.org/2000/svg">
      <text x="200" y="38" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="32" font-weight="500"
        letter-spacing="4" fill="white">
        COMING SOON
      </text>
    </svg>`;

  const comingSoonPng = await sharp(Buffer.from(comingSoonSvg))
    .png()
    .toBuffer();

  // Composite logo and text centered on background
  const logoX = Math.round((OG_WIDTH - logoWidth) / 2);
  const logoY = Math.round((OG_HEIGHT - logoHeight) / 2) - 40;
  const textX = Math.round((OG_WIDTH - 400) / 2);
  const textY = logoY + logoHeight + 30;

  await sharp(bg)
    .composite([
      { input: logoPng, left: logoX, top: logoY },
      { input: comingSoonPng, left: textX, top: textY },
    ])
    .jpeg({ quality: 90 })
    .toFile(join(publicDir, 'og-image.jpg'));

  console.log('OG image generated: public/og-image.jpg');
}

generateOG().catch(console.error);
