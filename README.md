# SVG Style Bundler

A lightweight, zero-dependency Javascript utility that will convert all of an SVG element's computed styles to inline styles. Useful for converting SVGs to other image formats and otherwise porting them outside of their current context.

Inspired by the New York Times's excellent [SVG Crowbar](http://nytimes.github.io/svg-crowbar/).

## Installation

### CDN

Include the following script tag in your page:

```html
<script src="https://unpkg.com/svg-style-bundler"></script>
```

### npm/yarn

```bash
npm install --save svg-style-bundler
```

then in your app

```javascript
import styleBundler from 'svg-style-bundler';
```

or

```javascript
const styleBundler = require('svg-style-bundler');
```

## Usage

Pass in your SVG element using `styleBundler.bundle(svgElement)`

Note that this **will** alter the element, and may have unintended affects on appearance and responsiveness. I highly recommend performing this operation on a duplicate, like so:

```javascript
const svg = document.querySelector('svg');
// Pass in true to also clone child nodes
const dupedSvg = svg.cloneNode(true);
// Insert the duplicate into the DOM
window.document.body.appendChild(dupedSvg);
styleBundler.bundle(dupedSvg);
```

Pairs nicely with [Canvg](https://github.com/canvg/canvg).