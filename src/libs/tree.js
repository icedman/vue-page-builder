export default class Tree {
  constructor (name, data) {
    this.id = Tree.generateId()
    this.name = name || ''
    this.parent = () => null
    this.children = []
    this.data = data || null
  }

  static createNode (name, data) {
    return new Tree(name, data)
  }

  static cloneData (data) {
    // better way of deep cloning?
    return JSON.parse(JSON.stringify(data))
  }

  static generateId () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  }

  static _generateId () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4()
  }

  appendChild (node) {
    if (node.id == this.id) {
      return
    }
    if (node.parent()) {
      node.parent().removeChild(node)
    }
    node.parent = () => this
    this.children.push(node)
    return node
  }

  removeChild (node) {
    if (this.children.find(c => c.id == node.id)) {
      node.parent = () => null
      this.children = this.children.filter(c => c.id != node.id)
      return
    }
    this.children.forEach(child => {
      child.removeChild(node)
    })
    return node
  }

  remove () {
    if (!this.parent()) {
      return
    }
    return this.parent().removeChild(this)
  }

  appendChildAt (node, index) {
    if (node.id == this.id) {
      return
    }
    if (node.parent()) {
      node.parent().removeChild(node)
    }
    node.parent = () => this
    this.children.splice(index, 0, node)
    return node
  }

  appendChildAfter (node, sibling) {
    this.appendChildAt(node, sibling.getIndex() + 1)
  }

  findChildById (id) {
    if (this.id == id) {
      return this
    }
    var res = null
    this.children.forEach(child => {
      res = res || child.findChildById(id)
    })
    return res
  }

  findChildByName (name) {
    if (this.name == name) {
      return this
    }
    var res = null
    this.children.forEach(child => {
      res = res || child.findChildByName(name)
    })
    return res
  }

  getIndex () {
    if (!this.parent()) {
      return null
    }
    return this.parent().getChildIndex(this)
  }

  getChildIndex (node) {
    return (this.children || []).map(c => c.id).indexOf(node.id)
  }

  root () {
    if (this.parent()) {
      return this.parent().root()
    }
    return this
  }

  clone () {
    var node = Tree.createNode()
    node.name = this.name
    if (this.data) {
      node.data = Tree.cloneData(this.data)
    }
    this.children.forEach(child => {
      var childNode = child.clone()
      node.appendChild(childNode)
    })
    return node
  }

  toString (pretty) {
    if (pretty) {
      return JSON.stringify(this, null, 4)
    }
    return JSON.stringify(this)
  }

  static createFromJSON (obj) {
    if (typeof obj === 'string') {
      obj = JSON.parse(obj)
    }
    if (!obj) {
      return
    }
    var node = Tree.createNode(obj.name)
    node.id = obj.id
    if (obj.data) {
      node.data = Tree.cloneData(obj.data)
    }
    obj.children.forEach(child => {
      var childNode = Tree.createFromJSON(child)
      node.appendChild(childNode)
    })
    return node
  }

  static createSample () {
    var t = Tree.createNode('root')
    var c = t.appendChild(Tree.createNode('child 1'))
    c.appendChild(Tree.createNode('child 1.1'))
    c.appendChild(Tree.createNode('child 1.2'))
    c = t.appendChild(Tree.createNode('child 2'))
    c.appendChild(Tree.createNode('child 2.1'))
    c.appendChild(Tree.createNode('child 2.2'))
    t.appendChild(Tree.createNode('child 3'))
    return t
  }
}
