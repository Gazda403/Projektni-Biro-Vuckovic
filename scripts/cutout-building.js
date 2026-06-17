/**
 * cutout-building.js v6
 * Generates a transparent-sky cutout of the OXO building hero image.
 *
 * v6 improvements:
 *  - Edge-preserving smoothing filter to prevent building roofline from
 *    bleeding horizontally into the sky (eliminates solid sky blocks on both sides)
 *  - Stricter sunset glow detection (avoids eating pale building facades on the right)
 *  - Simple & reliable pylon repair (v3-style, no isolation logic that breaks on wide backgrounds)
 *  - Feathering (6px gradient) for a clean transition
 */

const fs   = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const INPUT_PATH  = path.join(__dirname, "../public/images/ChatGPT Image Jun 16, 2026, 01_06_04 PM.png");
const OUTPUT_PATH = path.join(__dirname, "../public/images/building-cutout.png");

// ─── Sky pixel classification ──────────────────────────────────────────────────
function isSkyPixel(r, g, b, a) {
  if (a < 20) return true; // source-transparent pixels

  const brightness = (r + g + b) / 3;

  // Too dark to be sky
  if (brightness < 88) return false;

  // Twilight/overcast sky: blue-dominant or neutral with decent brightness
  const blueDominant = (b >= r - 15) && (b >= g - 15) && brightness >= 90;

  // Warm right-side sunset glow: very bright AND near-white (low saturation)
  // Require saturation < 35 so pale building facades don't get caught
  const saturation = Math.max(r, g, b) - Math.min(r, g, b);
  const sunsetGlow = brightness > 218 && r > 215 && g > 205 && b > 188 && saturation < 35;

  return blueDominant || sunsetGlow;
}

// Edge-preserving connectivity check: prevents smoothing across sharp cliffs
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
  .pipe(new PNG({ filterType: 4 }))
  .on("parsed", function () {
    const { width, height, data } = this;
    console.log(`Image loaded: ${width}x${height}`);

    // ── Step 1: Raw per-column roofline (top→bottom first non-sky pixel) ────────
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

    // ── Step 2: Global median + pylon repair ────────────────────────────────────
    // Any column with roofline far above the median is a background object
    // (thin pylon, background tower, etc.) — replace with nearest normal value.
    const sorted = [...roofline].sort((a, b) => a - b);
    const globalMedian = sorted[Math.floor(sorted.length * 0.5)];
    const PYLON_THRESHOLD = globalMedian * 0.50; // columns above 50% of median = artifact

    console.log(`Median roofline: y=${globalMedian}, pylon threshold: y<${Math.round(PYLON_THRESHOLD)}`);

    for (let x = 0; x < width; x++) {
      if (roofline[x] < PYLON_THRESHOLD) {
        // Replace with value from nearest normal-roofline column
        let repaired = globalMedian;
        for (let radius = 1; radius < width; radius++) {
          const l = x - radius, r2 = x + radius;
          if (l  >= 0     && roofline[l]  >= PYLON_THRESHOLD) { repaired = roofline[l];  break; }
          if (r2 <  width && roofline[r2] >= PYLON_THRESHOLD) { repaired = roofline[r2]; break; }
        }
        roofline[x] = repaired;
      }
    }

    // ── Step 3: Edge-preserving smooth (radius 20, cliff threshold 35px) ────────
    const SMOOTH_RADIUS = 20;
    const JUMP_THRESHOLD = 35;
    const smoothed = [...roofline];
    
    for (let x = 0; x < width; x++) {
      let minY = height;
      for (let dx = -SMOOTH_RADIUS; dx <= SMOOTH_RADIUS; dx++) {
        const nx = Math.max(0, Math.min(width - 1, x + dx));
        if (isConnected(x, nx, roofline, JUMP_THRESHOLD)) {
          if (roofline[nx] < minY) {
            minY = roofline[nx];
          }
        }
      }
      smoothed[x] = minY;
    }

    // ── Step 4: Apply transparency with feathered edge ──────────────────────────
    const FEATHER_PX = 6;

    for (let x = 0; x < width; x++) {
      const cutY = Math.max(0, smoothed[x] - 2); // 2px upward safety margin

      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * 4;

        if (y < cutY) {
          const dist = cutY - y; // 1 = right at edge
          if (dist <= FEATHER_PX) {
            // Soft fade — lowest alpha closest to building
            const ratio = (dist - 1) / FEATHER_PX;
            data[idx + 3] = Math.round(data[idx + 3] * ratio);
          } else {
            data[idx + 3] = 0; // fully transparent
          }
        }

        // Below the cut — also wipe stray sky-coloured pixels in the fringe zone
        if (y >= cutY && y < smoothed[x] + 12) {
          const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
          if (isSkyPixel(r, g, b, a)) {
            data[idx + 3] = 0;
          }
        }
      }
    }

    // ── Step 5: Write ────────────────────────────────────────────────────────────
    const buffer = PNG.sync.write(this);
    fs.writeFileSync(OUTPUT_PATH, buffer);
    console.log(`✅ Cutout saved to: ${OUTPUT_PATH}`);
  })
  .on("error", err => { console.error(err); process.exit(1); });
