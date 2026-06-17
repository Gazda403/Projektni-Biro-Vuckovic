const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const INPUT_PATH = path.join(__dirname, "../public/images/ChatGPT Image Jun 16, 2026, 01_06_04 PM.png");

fs.createReadStream(INPUT_PATH)
  .pipe(new PNG())
  .on("parsed", function () {
    const { width, height, data } = this;
    console.log(`Image: ${width}x${height}`);

    console.log(`\nColor profile at x = 100:`);
    for (let y = 0; y < height; y += 50) {
      const idx = (y * width + 100) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      const brightness = (r + g + b) / 3;
      console.log(`y=${y}: R=${r}, G=${g}, B=${b}, A=${a} | Brightness=${brightness.toFixed(1)}`);
    }
  });
