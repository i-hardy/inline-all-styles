let emptySvg;

function getComparisonSvg() {
  emptySvg = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  window.document.body.appendChild(emptySvg);
  return getComputedStyle(emptySvg);
}

function setStyle(element) {
  const blankSvgStyles = getComparisonSvg();
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
  emptySvg.remove();
}

export default {
  bundle(svg) {
    const treeWalker = document.createTreeWalker(
      svg,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: () => NodeFilter.FILTER_ACCEPT,
      },
      false,
    );

    do {
      setStyle(treeWalker.currentNode);
    } while (treeWalker.nextNode());
  },
};
