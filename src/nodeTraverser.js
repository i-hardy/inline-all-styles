class NodeTraverser {
  constructor(parentNode) {
    this.tree = [];
    this.node = parentNode;
    this.tree.push(this.node);
  }
  traverse(node) {
    const self = this;
    if (node && node.hasChildNodes()) {
      let child = node.firstChild;
      while (child) {
        if (child.nodeType === 1 && child.nodeName !== 'SCRIPT') {
          self.tree.push(child);
          self.visit(child);
        }
        child = child.nextSibling;
      }
    }
  }
  getAllNodes() {
    this.traverse(this.node);
    return this.tree;
  }
}