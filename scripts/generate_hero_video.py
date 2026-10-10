#!/usr/bin/env python
"""
Original cinematic hero background renderer for the Harsh Lakhara portfolio.

Produces an abstract, premium technology animation on a near-black field:
soft drifting violet/blue volumetric glows, a few orbiting light trails, and
a depth field of slow particles. No text, no logos, no watermarks. The motion
is periodic so the clip loops seamlessly, and brightness is biased toward the
right so the left side stays readable behind the hero headline.

Outputs:
  public/videos/hero-loop.mp4        (H.264, yuv420p, +faststart)
  public/images/hero-poster.webp     (a representative frame)

Deps (install once):  pip install numpy Pillow imageio imageio-ffmpeg
Run:                   python scripts/generate_hero_video.py
"""

from __future__ import annotations
import os
import math
import numpy as np
from PIL import Image, ImageFilter
import imageio.v2 as imageio

# ----------------------------- configuration --------------------------------
W, H = 1280, 720
FPS = 24
SECONDS = 10
FRAMES = FPS * SECONDS          # one full loop period
PREROLL = FRAMES                # warm up the trail buffer by one full period
DECAY = 0.90                    # light-trail persistence per frame

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEO_OUT = os.path.join(ROOT, "public", "videos", "hero-loop.mp4")
POSTER_OUT = os.path.join(ROOT, "public", "images", "hero-poster.webp")

# Palette (linear-ish RGB, 0..255)
VIOLET = np.array([139, 92, 246], dtype=np.float32)
BLUE = np.array([56, 189, 248], dtype=np.float32)
SOFT_VIOLET = np.array([167, 139, 250], dtype=np.float32)

# Coordinate grids
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)

# Horizontal readability mask: darker on the left third, full on the right.
left_mask = np.clip((xx / W - 0.12) / 0.5, 0.0, 1.0)
left_mask = 0.45 + 0.55 * (left_mask ** 1.3)
left_mask = left_mask[:, :, None]

# Gentle top-to-bottom base gradient (deep charcoal)
base_top = np.array([11, 13, 19], dtype=np.float32)
base_bot = np.array([6, 7, 11], dtype=np.float32)
grad_t = (yy / H)[:, :, None]
BASE = base_top * (1 - grad_t) + base_bot * grad_t  # (H,W,3)


def radial(cx: float, cy: float, sigma: float, color: np.ndarray, amp: float) -> np.ndarray:
    """A soft volumetric glow centered at (cx, cy)."""
    d2 = (xx - cx) ** 2 + (yy - cy) ** 2
    g = np.exp(-d2 / (2.0 * sigma * sigma))
    return g[:, :, None] * color[None, None, :] * amp


def splat(acc: np.ndarray, cx: float, cy: float, radius: float, color: np.ndarray, amp: float) -> None:
    """Add a small Gaussian point of light into the accumulation buffer (in place)."""
    r = int(radius * 3)
    x0, x1 = max(0, int(cx) - r), min(W, int(cx) + r + 1)
    y0, y1 = max(0, int(cy) - r), min(H, int(cy) + r + 1)
    if x0 >= x1 or y0 >= y1:
        return
    lx = xx[y0:y1, x0:x1]
    ly = yy[y0:y1, x0:x1]
    d2 = (lx - cx) ** 2 + (ly - cy) ** 2
    g = np.exp(-d2 / (2.0 * radius * radius))
    acc[y0:y1, x0:x1, :] += g[:, :, None] * color[None, None, :] * amp


# ----------------------------- scene elements -------------------------------
rng = np.random.default_rng(42)

# Orbiting light trails (bias centers to the right half)
TRAILS = []
for i in range(6):
    TRAILS.append(
        dict(
            ocx=W * (0.55 + 0.1 * rng.random()) + rng.uniform(-40, 40),
            ocy=H * (0.3 + 0.45 * rng.random()),
            rx=rng.uniform(80, 240),
            ry=rng.uniform(60, 180),
            fx=rng.choice([1, 1, 2]),          # integer freq -> seamless loop
            fy=rng.choice([1, 2, 2]),
            phase=rng.uniform(0, 2 * math.pi),
            color=VIOLET if i % 2 == 0 else BLUE,
            radius=rng.uniform(5, 9),
            amp=rng.uniform(0.9, 1.4),
        )
    )

# Depth particles (slow drift, subtle twinkle), denser to the right
N_PART = 90
part = dict(
    bx=np.concatenate([rng.uniform(0, W, N_PART // 3), rng.uniform(W * 0.45, W, N_PART - N_PART // 3)]),
    by=rng.uniform(0, H, N_PART),
    dr=rng.uniform(6, 26, N_PART),
    fx=rng.integers(1, 3, N_PART).astype(np.float32),
    fy=rng.integers(1, 3, N_PART).astype(np.float32),
    ph=rng.uniform(0, 2 * math.pi, N_PART),
    tw=rng.uniform(0, 2 * math.pi, N_PART),
    rad=rng.uniform(1.2, 3.0, N_PART),
    col=np.where(rng.random((N_PART, 1)) > 0.5, SOFT_VIOLET[None, :], BLUE[None, :]),
)


def render_frame(frame: int, acc: np.ndarray) -> np.ndarray:
    t = frame / FRAMES
    ang = 2 * math.pi * t

    # fade the trail accumulation
    acc *= DECAY

    # draw orbiting trail heads
    for tr in TRAILS:
        x = tr["ocx"] + tr["rx"] * math.cos(tr["fx"] * ang + tr["phase"])
        y = tr["ocy"] + tr["ry"] * math.sin(tr["fy"] * ang + tr["phase"])
        splat(acc, x, y, tr["radius"], tr["color"], tr["amp"])

    # draw particles
    px = part["bx"] + part["dr"] * np.cos(part["fx"] * ang + part["ph"])
    py = part["by"] + part["dr"] * np.sin(part["fy"] * ang + part["ph"])
    tw = 0.55 + 0.45 * np.sin(3 * ang + part["tw"])
    for i in range(N_PART):
        splat(acc, px[i], py[i], part["rad"][i], part["col"][i], 0.5 * float(tw[i]))

    # bloom: blur a clamped copy of the accumulation for soft halos
    acc_clamped = np.clip(acc, 0, 255).astype(np.uint8)
    glow = Image.fromarray(acc_clamped).filter(ImageFilter.GaussianBlur(radius=18))
    glow = np.asarray(glow, dtype=np.float32)

    # two large drifting ambient glows (volumetric feel)
    amb = np.zeros((H, W, 3), dtype=np.float32)
    amb += radial(
        W * (0.72 + 0.05 * math.cos(ang)),
        H * (0.28 + 0.05 * math.sin(ang)),
        sigma=300, color=VIOLET, amp=0.42,
    )
    amb += radial(
        W * (0.85 + 0.05 * math.cos(ang + 2)),
        H * (0.8 + 0.05 * math.sin(ang + 1)),
        sigma=340, color=BLUE, amp=0.34,
    )
    amb += radial(
        W * (0.2 + 0.04 * math.sin(ang)),
        H * (0.15 + 0.03 * math.cos(ang)),
        sigma=260, color=SOFT_VIOLET, amp=0.14,
    )

    frame_rgb = BASE + amb + glow * 0.7 + np.clip(acc, 0, 255) * 0.6
    frame_rgb *= left_mask
    return np.clip(frame_rgb, 0, 255).astype(np.uint8)


def main() -> None:
    os.makedirs(os.path.dirname(VIDEO_OUT), exist_ok=True)
    os.makedirs(os.path.dirname(POSTER_OUT), exist_ok=True)

    acc = np.zeros((H, W, 3), dtype=np.float32)

    # Warm up trail buffer so the loop boundary is seamless
    print(f"Warming up ({PREROLL} frames)...")
    for f in range(PREROLL):
        render_frame(f % FRAMES, acc)

    print(f"Rendering {FRAMES} frames at {W}x{H}@{FPS} -> {VIDEO_OUT}")
    writer = imageio.get_writer(
        VIDEO_OUT,
        fps=FPS,
        codec="libx264",
        format="FFMPEG",
        macro_block_size=8,
        ffmpeg_params=[
            "-pix_fmt", "yuv420p",
            "-crf", "26",
            "-preset", "slow",
            "-movflags", "+faststart",
            "-profile:v", "high",
        ],
    )

    poster_frame = int(FRAMES * 0.62)
    poster_img = None
    for f in range(FRAMES):
        img = render_frame(f, acc)
        writer.append_data(img)
        if f == poster_frame:
            poster_img = img.copy()
        if f % 40 == 0:
            print(f"  frame {f}/{FRAMES}")
    writer.close()

    if poster_img is None:
        poster_img = img
    Image.fromarray(poster_img).save(POSTER_OUT, "WEBP", quality=82, method=6)
    print(f"Poster saved -> {POSTER_OUT}")
    print("Done.")


if __name__ == "__main__":
    main()
