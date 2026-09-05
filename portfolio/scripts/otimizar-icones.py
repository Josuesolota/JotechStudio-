#!/usr/bin/env python3
"""
Otimiza os PNG gerados por `gerar-icones.py` (quantização para paleta de 255
cores + otimização zlib). Reduz ~60% do tamanho sem diferença visível nos
tamanhos em que os ícones são realmente vistos.

Uso (a partir da pasta `portfolio/`):
    python3 scripts/otimizar-icones.py
"""
import glob
import os

from PIL import Image

alvos = glob.glob("public/icons/*.png") + glob.glob("public/screenshots/*.png")

for caminho in sorted(alvos):
    antes = os.path.getsize(caminho)
    img = Image.open(caminho).convert("RGB")
    img.quantize(colors=255, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG).save(
        caminho, optimize=True
    )
    depois = os.path.getsize(caminho)
    print(f"{os.path.basename(caminho):<28} {antes // 1024:>4} KB → {depois // 1024:>4} KB")
