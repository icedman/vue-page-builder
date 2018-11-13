import Tree from "./tree";

class Parser {
  constructor() {
    this.stack = [];
  }

  push(node) {
    this.stack.push(node);
  }

  pop() {
    return this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  parseDOMNode(domNode) {
    if (typeof domNode === 'string') {
        var t = document.createElement('template')
        t.innerHTML = domNode
        domNode = t.content
    }
    var topNode = this.top();
    topNode.data = topNode.data || {};

    // children
    Array.prototype.forEach.call(domNode.childNodes, c => {
      topNode = this.top();
      if (c.nodeType === document.COMMENT_NODE) {
        var str = c.textContent.trim();
        if (str.startsWith("wp:")) {
          // block name
          var attr = {};
          var blockName = "";
          var bn = /wp:([a-zA-Z0-9\-]*)\s/.exec(str + " ");
          if (bn) {
            blockName = bn[1];
            if (str.endsWith("/")) {
              str = str.slice(0, str.length - 1);
              str = str.replace("/", "");
            }

            try {
              attr = JSON.parse(str.replace(bn[0].trim(), "").trim());
            } catch (err) {
              // unparseable?
            }
          }

          attr.blockType = blockName;
          attr.flex = attr.flex || 1;

          // attributes
          var cc = Tree.createNode(blockName, attr);
          topNode.appendChild(cc);
          this.push(cc);

          topNode = cc;
        }

        if (str.startsWith("/wp:")) {
          topNode = topNode;
          this.pop();
          return;
        }
      }

      if (c.nodeType !== document.COMMENT_NODE) {
        if (!topNode.data.content && c.outerHTML)
            topNode.data.content = c.outerHTML;
      }

      this.parseDOMNode(c);

      if (c.nodeType === document.COMMENT_NODE) {
        var str = c.textContent.trim();
        if (str.endsWith("/")) {
          this.pop();
          return;
        }
      }
    });
  }

  cleanUp(node) {
    if (
      node.data &&
      node.data.content &&
      node.children &&
      node.children.length
    ) {
      delete node.data.content;
    }

    var map = {
      paragraph: {
        element: "text-block"
      },
      heading: {
        element: "heading-block",
        unwrap: "h1,h2,h3,h4,h5,h6,h7,h8"
      },
      button: {
        element: "button-block",
        unwrap: "a"
      }
    };
    var elm = map[node.name] || {
      element: "text-block"
    };
    node.data.element = elm.element;

    // content unwrap
    var d = document.createElement("div");
    d.innerHTML = node.data.content;
    if (elm.unwrap) {
      var wrapper = d.querySelector(elm.unwrap);
      if (wrapper) {
        node.data.content = wrapper.innerHTML;
      }
    }

    (node.children || []).forEach(c => this.cleanUp(c));

    // convert columns/column
    if (node.name === "columns") {
      node.data.row = true;
    }
    if (node.name === "column" && node.children.length === 1) {
      node.data = Object.assign(node.data, node.children[0].data);
      node.children = [];
    }
  }

  parseDocument(contentNode) {
    this.stack = [Tree.createNode("root")];
    this.parseDOMNode(contentNode);
    var res = this.top();
    this.cleanUp(res);
    return res;
  }
}

class Writer {
  constructor() {
    this.out = "";
  }

  writeNode(node) {
    if (!node) {
      return;
    }

    var data = node.data || {};
    var element = data.blockType || "box";

    if (node.name === 'columns') {
        element = 'box'
    }

    var attrs = JSON.parse(JSON.stringify(data || {}));
    attrs.content = "";
    var jattrs = JSON.stringify(attrs);

    this.out += `<!-- wp:${element} ${jattrs} -->\n`;
    this.out += data.content || "";

    for (var i = 0; i < (node.children || []).length; i++) {
      var n = node.children[i];
      this.writeNode(n);
      this.out += `\n`;
    }

    this.out += `\n<!-- /wp:${element} -->\n`;
  }

  write(root) {
    this.out = "";
    root.children.forEach(n => this.writeNode(n))
    // this.writeNode(root);
    return this.out;
  }
}

export default class Blocks {
  static parser() {
    return new Parser();
  }

  static writer() {
    return new Writer();
  }
}
