// Genera versiones WebP responsivas de las fotos y un manifiesto con los anchos disponibles.
const sharp = require("sharp"), fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "..");
const dirs = ["assets/img/stock", "assets/img/stock/ov"];
const targets = [640, 1024, 1600, 2400];
(async () => {
  const manifest = {};
  for (const d of dirs) {
    for (const f of fs.readdirSync(path.join(root, d)).filter((f) => f.endsWith(".jpg"))) {
      const src = path.join(root, d, f), base = f.replace(/\.jpg$/, "");
      const meta = await sharp(src).metadata();
      const widths = targets.filter((w) => w < meta.width).concat([meta.width]);
      for (const w of widths) {
        const out = path.join(root, d, `${base}-${w}.webp`);
        if (!fs.existsSync(out)) await sharp(src).resize({ width: w }).webp({ quality: w >= 1600 ? 78 : 80 }).toFile(out);
      }
      manifest[`${d}/${f}`] = widths;
      console.log(`${d}/${f}: ${meta.width}x${meta.height} -> ${widths.join(",")}`);
    }
  }
  fs.writeFileSync(path.join(root, "assets/js/imagenes.js"),
    "/* Generado por _tools/resize.js: anchos WebP disponibles por fotografía. */\nwindow.IMG = " + JSON.stringify(manifest, null, 1) + ";\n");
})();
