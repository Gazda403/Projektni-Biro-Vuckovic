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
    const roofline = new Array(width).fill(height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
        if (!isSkyPixel(r, g, b, a)) {
          roofline[x] = y;
          break;
        }
      }
    }

    console.log("Roofline values for x=1400 to x=1500:");
    let line = "";
    for (let x = 1400; x < 1500; x++) {
      line += `${x}:${roofline[x]} `;
      if ((x + 1) % 10 === 0) {
        console.log(line);
        line = "";
      }
    }
  });
