const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const INPUT_PATH = path.join(
  __dirname,
  "../public/images/ChatGPT Image Jun 16, 2026, 01_06_04 PM.png"
);

fs.createReadStream(INPUT_PATH)
  .pipe(new PNG({ filterType: 4 }))
  .on("parsed", function () {
    const { width, height, data } = this;
    console.log(`Dimensions: ${width}x${height}`);

    // Let's sample the sky at various x coordinates at y = 10
    console.log("--- Sky Samples (y = 10) ---");
    for (let percent = 0; percent <= 100; percent += 10) {
      const x = Math.min(width - 1, Math.round((percent / 100) * width));
      const idx = (10 * width + x) * 4;
      console.log(
        `x: ${x} (${percent}%) - R: ${data[idx]}, G: ${data[idx + 1]}, B: ${data[idx + 2]}`
      );
    }

    // Let's sample the roofline (approx y = 550 - 650)
    console.log("\n--- Roof Samples (approximate) ---");
    // Left roof area (around x = 200, y = 600)
    const samples = [
      { name: "Left roof green", x: Math.round(width * 0.2), y: Math.round(height * 0.58) },
      { name: "Center roof green", x: Math.round(width * 0.5), y: Math.round(height * 0.59) },
      { name: "Right roof green", x: Math.round(width * 0.8), y: Math.round(height * 0.68) },
      { name: "Left hedges", x: Math.round(width * 0.1), y: Math.round(height * 0.9) },
    ];

    samples.forEach((s) => {
      const idx = (s.y * width + s.x) * 4;
      console.log(
        `${s.name} (x: ${s.x}, y: ${s.y}) - R: ${data[idx]}, G: ${data[idx + 1]}, B: ${data[idx + 2]}`
      );
    });
  });
