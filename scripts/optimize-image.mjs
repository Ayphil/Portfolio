import sharp from "sharp";

const [input, output, widthText, qualityText] = process.argv.slice(2);

if (!input || !output || !widthText || !qualityText) {
  throw new Error("Usage: optimize-image.mjs <input> <output> <max-width> <quality>");
}

await sharp(input)
  .rotate()
  .resize({ width: Number(widthText), height: Number(widthText), fit: "inside", withoutEnlargement: true })
  .webp({ quality: Number(qualityText), effort: 5 })
  .toFile(output);
