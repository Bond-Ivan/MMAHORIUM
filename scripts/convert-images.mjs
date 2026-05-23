import sharp from 'sharp';
import { readdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../public');

const files = readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

console.log(`Found ${files.length} image files...`);

for (const file of files) {
  const input = path.join(dir, file);
  const output = path.join(dir, file.replace(/\.(png|jpg|jpeg)$/, '.webp'));

  if (existsSync(output)) {
    console.log(`⏭ skip ${file} (webp exists)`);
    continue;
  }

  await sharp(input).webp({ quality: 75 }).toFile(output);
  console.log(`✓ ${file} → ${output.split('/').pop()}`);
}

console.log('Done!');