const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const FILE_PATH = path.join(__dirname, "../public/images/building-cutout.png");

if (!fs.existsSync(FILE_PATH)) {
  console.error("File does not exist:", FILE_PATH);
  process.exit(1);
}

fs.createReadStream(FILE_PATH)
  .pipe(new PNG())
  .on("parsed", function() {
    const { width, height, data } = this;
    console.log(`Analyzing cutout: ${width}x${height}`);

    // Let's count how many pixels are fully opaque, fully transparent, and semi-transparent
    let transparent = 0;
    let semi = 0;
    let opaque = 0;

    // We can also find the first transparent pixel from the bottom in each column (which would mean a hole inside the building)
    let holes = [];

    for (let x = 0; x < width; x++) {
      let foundOpaque = false;
      for (let y = height - 1; y >= 0; y--) {
        const idx = (y * width + x) * 4;
        const a = data[idx + 3];

        if (a === 255) {
          foundOpaque = true;
        } else if (a === 0) {
          transparent++;
          // If we already saw opaque pixels below this y, and now we see a transparent pixel,
          // it might be a hole in the building, UNLESS it's above the roofline.
          // Let's check if there are opaque pixels above this transparent pixel too.
          if (foundOpaque) {
            // Check if there are opaque pixels higher up in the column
            let opaqueAbove = false;
            for (let y2 = y - 1; y2 >= 0; y2--) {
              if (data[(y2 * width + x) * 4 + 3] === 255) {
                opaqueAbove = true;
                break;
              }
            }
            if (opaqueAbove && holes.length < 50) {
              holes.push({ x, y });
            }
          }
        } else {
          semi++;
        }
      }
    }

    console.log(`Transparent: ${transparent} (${(transparent/(width*height)*100).toFixed(1)}%)`);
    console.log(`Semi-transparent: ${semi} (${(semi/(width*height)*100).toFixed(1)}%)`);
    console.log(`Opaque: ${opaque} (${(opaque/(width*height)*100).toFixed(1)}%)`);
    console.log(`Number of 'hole' pixels detected (transparent pixel sandwiched between opaque pixels vertically): ${holes.length}`);
    if (holes.length > 0) {
      console.log("Sample hole coordinates (first 10):", holes.slice(0, 10));
    }
  });
