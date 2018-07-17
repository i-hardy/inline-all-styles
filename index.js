const nodeTraverser = {
  tree: [],
  traverseChildren: function (node) {
    if (node && node.hasChildNodes()) {
      let child = node.firstChild;
      while (child) {
        if (child.nodeType === 1 && child.nodeName !== 'SCRIPT') {
          nodeTraverser.tree.push(child);
          nodeTraverser.traverseChildren(child);
        }
        child = child.nextSibling;
      }
    }
  },
  traverse: function (node) {
    nodeTraverser.tree.push(node);
    nodeTraverser.traverseChildren(node);
    return nodeTraverser.tree;
  },
};

const styleSetter = {
  emptySvg: null,
  getComparisonSvg: function () {
    styleSetter.emptySvg = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    window.document.body.appendChild(styleSetter.emptySvg);
    return getComputedStyle(styleSetter.emptySvg);
  },
  setStyle: function (element) {
    const blankSvgStyles = styleSetter.getComparisonSvg();
    const elementStyleComputed = getComputedStyle(element);
    let computedStyleStr = '';
    for (let i = 0; i < elementStyleComputed.length; i++) {
      const key = elementStyleComputed.item(i);
      const value = elementStyleComputed.getPropertyValue(key);
      if (value !== blankSvgStyles.getPropertyValue(key)) {
        computedStyleStr += `${key}:${value};`;
      }
    }
    element.setAttribute('style', computedStyleStr);
    styleSetter.emptySvg.remove();
  },
};

export default {
  bundle: function (svg) {
    const allElements = nodeTraverser.traverse(svg);
    allElements.forEach((node) => {
      node.setAttribute('data-old-style', node.style);
      styleSetter.setStyle(node);
    });
  },
  unbundle: function (svg) {
    const allElements = nodeTraverser.traverse(svg);
    allElements.forEach((node) => {
      const oldStyle = node.getAttribute('data-old-style');
      node.setAttribute('style', oldStyle);
    });
  },
};
