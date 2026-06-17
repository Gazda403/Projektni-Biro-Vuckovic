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

// Edge-preserving connectivity check
function isConnected(x, nx, roofline, threshold) {
  const start = Math.min(x, nx);
  const end = Math.max(x, nx);
  for (let i = start; i < end; i++) {
    if (Math.abs(roofline[i + 1] - roofline[i]) >= threshold) {
      return false;
    }
  }
  return true;
}

fs.createReadStream(INPUT_PATH)
  .pipe(new PNG())
  .on("parsed", function () {
    const { width, height, data } = this;
    
    // Step 1: Raw roofline
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

    // Step 3: Old smoothing (pure minimum)
    const SMOOTH_RADIUS = 20;
    const oldSmoothed = [...repairedRoofline];
    for (let x = 0; x < width; x++) {
      let minY = height;
      for (let dx = -SMOOTH_RADIUS; dx <= SMOOTH_RADIUS; dx++) {
        const nx = Math.max(0, Math.min(width - 1, x + dx));
        if (repairedRoofline[nx] < minY) minY = repairedRoofline[nx];
      }
      oldSmoothed[x] = minY;
    }

    // Step 3: New edge-preserving smoothing
    const newSmoothed = [...repairedRoofline];
    const JUMP_THRESHOLD = 35;
    for (let x = 0; x < width; x++) {
      let minY = height;
      for (let dx = -SMOOTH_RADIUS; dx <= SMOOTH_RADIUS; dx++) {
        const nx = Math.max(0, Math.min(width - 1, x + dx));
        if (isConnected(x, nx, repairedRoofline, JUMP_THRESHOLD)) {
          if (repairedRoofline[nx] < minY) {
            minY = repairedRoofline[nx];
          }
        }
      }
      newSmoothed[x] = minY;
    }

    // Compare at left cliff (x = 220 to 230)
    console.log("=== Left Cliff Comparison ===");
    for (let x = 220; x <= 230; x++) {
      console.log(`x=${x}: Raw=${repairedRoofline[x]} | OldSmoothed=${oldSmoothed[x]} | NewSmoothed=${newSmoothed[x]}`);
    }

    // Compare at right cliff (x = 1420 to 1435)
    console.log("\n=== Right Cliff Comparison ===");
    for (let x = 1420; x <= 1435; x++) {
      console.log(`x=${x}: Raw=${repairedRoofline[x]} | OldSmoothed=${oldSmoothed[x]} | NewSmoothed=${newSmoothed[x]}`);
    }
  });
