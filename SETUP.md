# Portfolio Arthur - Guia de Setup

## Arquivos Inclusos

Este projeto contém:
- Todos os componentes React (TypeScript)
- Configurações Vite, Tailwind, TypeScript
- Assets 3D (shaders, texturas)
- Build pronto para produção

## Como usar na sua máquina

### 1. Extrair arquivos
```bash
unzip portfolio-arthur-completo.zip
cd project
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar em desenvolvimento
```bash
npm run dev
```
Abre em: http://localhost:5173

### 4. Build para produção
```bash
npm run build
```
Arquivos prontos em: `dist/`

## Tecnologias

- React 18 + TypeScript
- Vite (bundler rápido)
- Tailwind CSS
- Framer Motion (animações)
- Three.js + React Three Fiber (3D)
- Lucide React (ícones)

## Estrutura

```
src/
├── components/
│   ├── Earth.tsx
│   ├── Galaxy.tsx
│   ├── ProjectModal.tsx
│   └── Section.tsx
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts

static/
└── earth/
    ├── day.jpg
    └── night.jpg
```

## Funcionalidades

✓ Portfolio com efeitos 3D (Terra e Galáxia)
✓ Bilíngue (PT/EN)
✓ Animações suaves
✓ Modal de projetos
✓ Design responsivo
✓ Performance otimizada

Pronto para usar! 🚀
