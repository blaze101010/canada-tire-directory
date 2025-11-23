const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const svgPath = path.join(__dirname, '../app/icon.svg');
  const publicDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../app');

  // Read the SVG file
  const svgBuffer = fs.readFileSync(svgPath);

  console.log('Generating favicon files...');

  // Generate favicon.ico (32x32)
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✓ Generated public/favicon.ico');

  // Generate apple-icon.png (180x180) in app directory
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(appDir, 'apple-icon.png'));
  console.log('✓ Generated app/apple-icon.png');

  // Generate additional sizes for better compatibility
  // 192x192 for Android
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✓ Generated public/icon-192.png');

  // 512x512 for Android
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('✓ Generated public/icon-512.png');

  console.log('\nAll favicon files generated successfully!');
}

generateFavicons().catch(console.error);
