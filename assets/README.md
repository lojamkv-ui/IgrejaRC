# Assets — IARCristo

## Estrutura

```
assets/
├── brand/          # Identidade visual
│   ├── logo.png
│   ├── assinatura-pastor.png
│   └── favicon.svg
├── icons/          # Ícones SVG (stroke, currentColor)
│   ├── dashboard.svg
│   ├── membros.svg
│   ├── visitantes.svg
│   ├── familias.svg
│   ├── departamentos.svg
│   ├── agenda.svg
│   ├── relatorios.svg
│   ├── usuarios.svg
│   ├── menu.svg, busca.svg, camera.svg, ...
│   └── ...
└── images/         # Imagens gerais (fotos de eventos, etc.)
```

## Uso

- Páginas em `pages/`: `../assets/icons/membros.svg`
- Logo no menu: `../public/assets/logo.png` ou `../assets/brand/logo.png`
- Favicon: `../assets/brand/favicon.svg`

Ícones usam `stroke="currentColor"` e herdam a cor do menu.
