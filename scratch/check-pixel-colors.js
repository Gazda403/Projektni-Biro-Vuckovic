const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const INPUT_PATH = path.join(__dirname, "../public/images/ChatGPT Image Jun 16, 2026, 01_06_04 PM.png");

function isSkyPixel(r, g, b, a) {
  if (a < 20) return true;

  const brightness = (r + g + b) / 3;

  if (brightness < 88) return false;

  const blueDominant = (b >= r - 15) && (b >= g - 15) && brightness >= 90;

  const saturation = Math.max(r, g, b) - Math.min(r, g, b);
  const sunsetGlow = brightness > 218 && r > 215 && g > 205 && b > 188 && saturation < 35;

  return blueDominant || sunsetGlow;
}

fs.createReadStream(INPUT_PATH)
  .pipe(new PNG())
  .on("parsed", function () {
    const { width, height, data } = this;
    
    for (let x = 225; x <= 226; x++) {
      console.log(`\n=== Scanning column ${x} ===`);
      let firstNonSkyY = -1;
      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
        const isSky = isSkyPixel(r, g, b, a);
        if (!isSky && firstNonSkyY === -1) {
          firstNonSkyY = y;
          console.log(`First NON-sky pixel at y=${y}: R=${r}, G=${g}, B=${b}, A=${a} (isSky=false)`);
        }
        // Let's also print around 590 to 605 and 805 to 820
        if ((y >= 590 && y <= 605) || (y >= 805 && y <= 820)) {
          console.log(`y=${y}: R=${r}, G=${g}, B=${b}, A=${a} | isSky=${isSky}`);
        }
      }
    }
  });
