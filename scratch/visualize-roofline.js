const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const INPUT_PATH = path.join(__dirname, "../public/images/ChatGPT Image Jun 16, 2026, 01_06_04 PM.png");
const OUTPUT_PATH = path.join(__dirname, "../public/images/roofline-check.png");

// Copy the exact isSkyPixel from cutout-building.js v5
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
    console.log(`Image loaded: ${width}x${height}`);

    // Step 1: Raw per-column roofline
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

    // Step 2: Pylon repair
    const sorted = [...roofline].sort((a, b) => a - b);
    const globalMedian = sorted[Math.floor(sorted.length * 0.5)];
    const PYLON_THRESHOLD = globalMedian * 0.50;

    const repairedRoofline = [...roofline];
    for (let x = 0; x < width; x++) {
      if (roofline[x] < PYLON_THRESHOLD) {
        let repaired = globalMedian;
        for (let radius = 1; radius < width; radius++) {
          const l = x - radius, r2 = x + radius;
          if (l  >= 0     && roofline[l]  >= PYLON_THRESHOLD) { repaired = roofline[l];  break; }
          if (r2 <  width && roofline[r2] >= PYLON_THRESHOLD) { repaired = roofline[r2]; break; }
        }
        repairedRoofline[x] = repaired;
      }
    }

    // Step 3: Smoothing
    const SMOOTH_RADIUS = 20;
    const smoothed = [...repairedRoofline];
    for (let x = 0; x < width; x++) {
      let minY = height;
      for (let dx = -SMOOTH_RADIUS; dx <= SMOOTH_RADIUS; dx++) {
        const nx = Math.max(0, Math.min(width - 1, x + dx));
        if (repairedRoofline[nx] < minY) minY = repairedRoofline[nx];
      }
      smoothed[x] = minY;
    }

    // Draw lines on the image to visualize:
    // Green line for raw roofline (if not repaired)
    // Red line for final smoothed roofline
    for (let x = 0; x < width; x++) {
      // Draw red line at smoothed roofline
      const smoothY = smoothed[x];
      if (smoothY >= 0 && smoothY < height) {
        const idx = (smoothY * width + x) * 4;
        data[idx] = 255;   // R
        data[idx+1] = 0;   // G
        data[idx+2] = 0;   // B
        data[idx+3] = 255; // A
      }

      // Draw green line at raw roofline
      const rawY = roofline[x];
      if (rawY >= 0 && rawY < height) {
        const idx = (rawY * width + x) * 4;
        // Don't overwrite if same as red line
        if (rawY !== smoothY) {
          data[idx] = 0;
          data[idx+1] = 255;
          data[idx+2] = 0;
          data[idx+3] = 255;
        }
      }
    }

    const buffer = PNG.sync.write(this);
    fs.writeFileSync(OUTPUT_PATH, buffer);
    console.log(`Saved visualization to: ${OUTPUT_PATH}`);
  });
