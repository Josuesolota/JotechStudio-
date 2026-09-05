#!/usr/bin/env python3
"""
Gera todo o conjunto de ícones da PWA a partir do ícone oficial da marca.

Uso (a partir da pasta `portfolio/`):
    pip install Pillow
    python3 scripts/gerar-icones.py

Entrada:  brand-source/icon.png  (engrenagem 1024x1024, fundo já limpo)
Saída:    public/icons/*.png, public/brand/gear.png, public/favicon.ico

Depois de gerar, otimize os PNG (reduz ~60% do tamanho sem perda visível):
    python3 scripts/otimizar-icones.py
"""
from PIL import Image, ImageDraw, ImageFilter
import os

SRC = "brand-source/icon.png"
OUT = "public/icons"
BRAND_BG = (6, 11, 20)          # #060B14 - fundo da marca
os.makedirs(OUT, exist_ok=True)

src = Image.open(SRC).convert("RGB")

# 1) Recorte apertado da engrenagem (bounding box por luminância)
gray = src.convert("L")
mask = gray.point(lambda p: 255 if p > 28 else 0)
bbox = mask.getbbox()
print("bbox:", bbox)
gear = src.crop(bbox)
# quadrado
w, h = gear.size
side = max(w, h)
sq = Image.new("RGB", (side, side), BRAND_BG)
sq.paste(gear, ((side - w) // 2, (side - h) // 2))
gear = sq

# 2) Versão com alpha (fundo escuro -> transparente) para uso no header/UI
rgba = gear.convert("RGBA")
px = rgba.load()
for y in range(rgba.height):
    for x in range(rgba.width):
        r, g, b, _ = px[x, y]
        lum = max(r, g, b)
        a = 0 if lum < 22 else (255 if lum > 60 else int((lum - 22) / 38 * 255))
        px[x, y] = (r, g, b, a)
rgba.resize((512, 512), Image.LANCZOS).save("public/brand/gear.png")

def compose(size, scale, radius_ratio=0.0, bg=BRAND_BG):
    """Coloca a engrenagem centrada num canvas quadrado da marca."""
    canvas = Image.new("RGBA", (size, size), bg + (255,))
    inner = max(1, int(size * scale))
    g = gear.resize((inner, inner), Image.LANCZOS).convert("RGBA")
    off = (size - inner) // 2
    canvas.paste(g, (off, off), g)
    if radius_ratio:
        r = int(size * radius_ratio)
        m = Image.new("L", (size, size), 0)
        ImageDraw.Draw(m).rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=255)
        canvas.putalpha(m)
    return canvas

# 3) Ícones "any" (PWA) — engrenagem quase a preencher
for s in (48, 72, 96, 128, 144, 152, 192, 256, 384, 512, 1024):
    compose(s, 0.94).convert("RGB").save(f"{OUT}/icon-{s}.png", optimize=True)

# 4) Maskable — zona segura: conteúdo dentro de 80% do círculo central
for s in (192, 512):
    compose(s, 0.60).convert("RGB").save(f"{OUT}/maskable-{s}.png", optimize=True)

# 5) Apple touch icon (iOS aplica o próprio arredondamento; sem alpha)
compose(180, 0.80).convert("RGB").save(f"{OUT}/apple-touch-icon.png", optimize=True)
compose(167, 0.80).convert("RGB").save(f"{OUT}/apple-touch-icon-167.png", optimize=True)
compose(152, 0.80).convert("RGB").save(f"{OUT}/apple-touch-icon-152.png", optimize=True)

# 6) Favicons
compose(16, 0.98).convert("RGB").save(f"{OUT}/favicon-16.png")
compose(32, 0.98).convert("RGB").save(f"{OUT}/favicon-32.png")
compose(48, 0.98).convert("RGB").save(f"{OUT}/favicon-48.png")
ico = compose(256, 0.96).convert("RGB")
ico.save("public/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])

print("ok:", sorted(os.listdir(OUT)))
