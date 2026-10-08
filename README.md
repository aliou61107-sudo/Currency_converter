# currency

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
# Currency Converter

Convertisseur de devises realise avec Vue 3, TypeScript et Vite. L'interface reprend la maquette du sujet : deux devises, un montant, un clavier numerique et une conversion USD vers EUR par defaut.

## Fonctionnalites

- Devises disponibles : EUR, USD, TND, GBP, JPY et CAD.
- Conversion avec taux fixes de secours et tentative de recuperation via l'API Frankfurter.
- Conversion automatique pendant la saisie et lors du changement de devise.
- Clavier numerique a l'ecran et prise en charge du clavier physique.
- Inversion des devises, bouton d'effacement et validation du montant.
- Montant limite a 10 caracteres et un seul separateur decimal.

## Installation et lancement

Prérequis : Node.js 22 ou une version plus recente.

```sh
npm install
npm run dev
```

L'application est ensuite disponible sur l'URL indiquee par Vite, generalement `http://localhost:5173/`.

## Verification

```sh
npm run build
```

Cette commande lance le controle TypeScript puis genere la version de production dans `dist/`.

## Organisation

- `src/components/CurrencyConverter.vue` : interface et logique du convertisseur.
- `src/data/taux.ts` : devises et taux de secours.
- `docs/compte-rendu-convertisseur.docx` : compte rendu Word avec captures d'ecran.

## Git

Le depot exclut les dependances et les fichiers de build via `.gitignore`. Les captures et le compte rendu sont conserves dans `docs/` pour accompagner le rendu.
