function getComparisonSvg() {
  const emptySvg = window.document.createElementNS(prefix.svg, 'svg');
  window.document.body.appendChild(emptySvg);
  const emptySvgComputed = getComputedStyle(emptySvg);
  emptySvg.remove();
  return emptySvgComputed;
}

function explicitlySetStyle(element) {
  const blankSvgStyles = getComparisonSvg();
  const elementStyleComputed = getComputedStyle(element);
  // let key;
  // let value;
  let computedStyleStr = '';
  for (let i = 0; i < elementStyleComputed.length; i++) {
    const key = elementStyleComputed.item(i);
    const value = elementStyleComputed.getPropertyValue(key);
    if (value !== blankSvgStyles.getPropertyValue(key)) {
      computedStyleStr += `${key}:${value};`;
    }
  }
  element.setAttribute('style', computedStyleStr);
}

function traverse(obj) {
  const tree = [];
  function visit(node) {
    if (node && node.hasChildNodes()) {
      let child = node.firstChild;
      while (child) {
        if (child.nodeType === 1 && child.nodeName !== 'SCRIPT') {
          tree.push(child);
          visit(child);
        }
        child = child.nextSibling;
      }
    }
  }
  tree.push(obj);
  visit(obj);
  return tree;
}

export default {
  set(svg) {
    const prefix = {
      xmlns: 'http://www.w3.org/2000/xmlns/',
      xlink: 'http://www.w3.org/1999/xlink',
      svg: 'http://www.w3.org/2000/svg',
    };
    const allElements = traverse(svg);
    allElements.forEach((node) => {
      explicitlySetStyle(node);
    });
  },
  unset(svg) {
    const allElements = traverse(svg);
    allElements.forEach((node) => {
      node.setAttribute('style', '');
    });
  },
};
