# Ícones e assets da marca

Todos os ícones da PWA derivam de **um único ficheiro**:
`brand-source/icon.png` — a engrenagem oficial, 1024×1024, com o fundo já
uniformizado para o navy da marca (`#060B14`).

## Regenerar tudo

```bash
cd portfolio
pip install Pillow
python3 scripts/gerar-icones.py     # gera todos os tamanhos
python3 scripts/otimizar-icones.py  # reduz ~60% do peso
```

## O que é gerado

| Ficheiro                          | Uso                                              |
| --------------------------------- | ------------------------------------------------ |
| `public/icons/icon-{48…512}.png`  | Ícones `purpose: any` do manifest                |
| `public/icons/maskable-{192,512}` | Android — conteúdo dentro da zona segura (60%)   |
| `public/icons/apple-touch-icon*`  | iOS / iPadOS ("Adicionar ao ecrã principal")     |
| `public/icons/favicon-{16,32,48}` | Favicons PNG                                     |
| `public/favicon.ico`              | Favicon multi-resolução (legado)                 |
| `public/brand/gear.png`           | Engrenagem com fundo transparente, para a UI     |

`public/favicon.svg` é desenhado à mão (SVG vetorial com o gradiente da marca)
— não é gerado pelo script.

## Porquê duas variantes de ícone

- **`any`** — a engrenagem ocupa 94% do quadrado. É o ícone que aparece em
  separadores, atalhos de desktop e listas.
- **`maskable`** — o Android recorta o ícone em formas variadas (círculo,
  *squircle*, gota). O conteúdo tem de caber num círculo central de 80% do
  lado, por isso aqui a engrenagem ocupa apenas 60% — sem isto, os dentes da
  engrenagem seriam cortados.

## Capturas do manifest

`public/screenshots/desktop.png` (1280×800) e `mobile.png` (412×892) aparecem
na caixa de instalação do Chrome/Android. São capturas reais da página inicial
— refaça-as sempre que o visual mudar significativamente, mantendo exatamente
estas dimensões (têm de coincidir com o declarado no `manifest.webmanifest`).
