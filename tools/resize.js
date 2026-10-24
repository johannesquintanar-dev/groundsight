// Genera versiones WebP responsivas de las fotos y un manifiesto con los anchos disponibles.
// Uso: node tools/resize.js          (solo crea las que falten)
//      node tools/resize.js --force  (vuelve a comprimir todas y borra anchos que ya no se usan)
const sharp = require("sharp"), fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "..");
const dirs = ["assets/img/stock", "assets/img/stock/ov"];
// 480/800 cubren celulares 1x-2x; 1200 celulares 3x; 1600/2400 escritorio y pantallas grandes
const targets = [480, 800, 1200, 1600, 2400];
const force = process.argv.includes("--force");
// Calidad menor en anchos grandes: las fotos van bajo velos oscuros y el ahorro es mayor
const quality = (w) => (w <= 800 ? 68 : w <= 1200 ? 64 : 60);
(async () => {
  const manifest = {};
  for (const d of dirs) {
    const files = fs.readdirSync(path.join(root, d));
    for (const f of files.filter((f) => f.endsWith(".jpg"))) {
      const src = path.join(root, d, f), base = f.replace(/\.jpg$/, "");
      const meta = await sharp(src).metadata();
      const widths = targets.filter((w) => w < meta.width).concat(meta.width < 2400 ? [meta.width] : []);
      if (force) {
        // Borra variantes con anchos que ya no forman parte del juego actual
        files.filter((x) => new RegExp(`^${base}-(\\d+)\\.webp$`).test(x))
          .filter((x) => !widths.includes(Number(x.match(/-(\d+)\.webp$/)[1])))
          .forEach((x) => fs.unlinkSync(path.join(root, d, x)));
      }
      for (const w of widths) {
        const out = path.join(root, d, `${base}-${w}.webp`);
        if (force || !fs.existsSync(out)) await sharp(src).resize({ width: w }).webp({ quality: quality(w), effort: 5 }).toFile(out);
      }
      manifest[`${d}/${f}`] = widths;
      console.log(`${d}/${f}: ${meta.width}x${meta.height} -> ${widths.join(",")}`);
    }
  }
  fs.writeFileSync(path.join(root, "assets/js/imagenes.js"),
    "/* Generado por tools/resize.js: anchos WebP disponibles por fotografía. */\nwindow.IMG = " + JSON.stringify(manifest, null, 1) + ";\n");
})();
