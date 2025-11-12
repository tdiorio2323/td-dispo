#!/usr/bin/env bash
set -euo pipefail

# === Quick Printz — Generate PWA Icons ===
# Requires: sharp-cli (npm i -g sharp-cli)

LOGO="public/lovable-uploads/quickprintz-logo.png"   # source logo
OUTDIR="public"          # where icons will go

if ! command -v sharp &> /dev/null; then
  echo "⚠ sharp-cli not found. Install with: npm install -g sharp-cli"
  exit 1
fi

if [ ! -f "$LOGO" ]; then
  echo "⚠ Source logo not found at $LOGO"
  exit 1
fi

echo "🔧 Generating icons from $LOGO..."

# standard PWA icons
sharp -i "$LOGO" -o "$OUTDIR/icon-192.png" resize 192 192
sharp -i "$LOGO" -o "$OUTDIR/icon-512.png" resize 512 512

# maskable icon (extra padding for adaptive shapes)
sharp -i "$LOGO" -o "$OUTDIR/icon-512-maskable.png" resize 512 512 extend 32 32 32 32

echo "✅ Icons generated in $OUTDIR:"
ls -lh "$OUTDIR"/icon-*.png