let emptyStyles;

function setStyle(element) {
  const elementStyleComputed = getComputedStyle(element);
  let computedStyleStr = '';
  for (let i = 0; i < elementStyleComputed.length; i++) {
    const key = elementStyleComputed.item(i);
    const value = elementStyleComputed.getPropertyValue(key);
    if (value !== emptyStyles.getPropertyValue(key)) {
      computedStyleStr += `${key}:${value};`;
    }
  }
  element.setAttribute('style', computedStyleStr);
}

export default {
  bundle(svg) {
    const emptySvg = window.document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    window.document.body.appendChild(emptySvg);
    emptyStyles = getComputedStyle(emptySvg);
    const treeWalker = document.createTreeWalker(
      svg,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: () => NodeFilter.FILTER_ACCEPT,
      },
      false
    );

    do {
      setStyle(treeWalker.currentNode);
    } while (treeWalker.nextNode());
    emptySvg.remove();
  },
};
