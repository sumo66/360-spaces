import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function generateOG() {
  // Read the logo SVG and set it to a larger size
  const logoSvg = readFileSync(join(publicDir, 'logo.svg'), 'utf-8');
  const logoWidth = 750;
  const logoHeight = Math.round(logoWidth * (75.45 / 373.81));

  const logoPng = await sharp(Buffer.from(logoSvg))
    .resize(logoWidth, logoHeight)
    .png()
    .toBuffer();

  // Resize the background to OG dimensions
  const bg = await sharp(join(publicDir, 'bg.png'))
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover' })
    .toBuffer();

  // Center logo on background
  const logoX = Math.round((OG_WIDTH - logoWidth) / 2);
  const logoY = Math.round((OG_HEIGHT - logoHeight) / 2);

  await sharp(bg)
    .composite([
      { input: logoPng, left: logoX, top: logoY },
    ])
    .jpeg({ quality: 90 })
    .toFile(join(publicDir, 'og-image.jpg'));

  console.log('OG image generated: public/og-image.jpg');
}

generateOG().catch(console.error);
