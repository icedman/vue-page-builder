<template>
  <div class="node" :id="getId()" :class="getContainerClass()" :style="getContainerStyle()" :draggable="draggable" @dragover="canDrop($event, node)" @drop="drop($event, node)" @drag="drag($event, node)" @dragstart="dragStart($event, node)" @dragend="dragEnd($event, node)" @click="select($event, node)" @mouseover="hover($event, node)">
    <component :is="nodeElement" :node="node"></component>
    <tree-node v-for="c in children" v-bind:key="c.id" :node="c">
    </tree-node>

    <!-- div class="dropTargetPlaceholder" v-if="showDropTargetPlaceholder"></div -->
  </div>
</template>
<script>
import { _ } from './libs/lodash.js'

export default {
  name: 'tree-node',

  data () {
    return {}
  },

  props: {
    node: Object
  },

  computed: {
    children () {
      if (!this.node) {
        return []
      }
      return this.node.children
    },

    showDropTargetPlaceholder () {
      if (!this.node || !this.$store.state.tree.drop) {
        return false
      }
      if (this.node == this.$store.state.tree.drop) {
        return true
      }
      return false
    },

    nodeElement () {
      if (!this.node || !this.node.parent || !this.node.parent()) {
        return ''
      }
      if (this.node.data && this.node.data.element) {
        return this.node.data.element
      }
      if (!this.node.children.length) {
        return 'add-element'
      }
      return ''
    },

    draggable () {
      return this.node && this.node.parent()
    }
  },

  methods: {
    canDrop (event, target) {
      // can drop?
      event.preventDefault()
      event.stopPropagation()
      this.$store.commit('tree/setDrop', target)
    },

    drop (event, target) {
      event.preventDefault()
      event.stopPropagation()
      var dragItem = this.$store.state.tree.drag
      var dropTarget = target
      if (!dragItem) {
        return
      }
      if (dragItem.id == dropTarget.id) {
        return
      }

      // sort siblings
      var dragParent = dragItem.parent()
      var dropParent = dropTarget.parent()
      if (dropParent && dragParent && dropParent.id == dragParent.id) {
        this.$store.commit('tree/appendChildAt', {
          target: dropParent,
          child: dragItem,
          index: dropTarget.getIndex()
        })

        this.$store.dispatch('tree/flash', dragItem)
        return
      }

      if (dragItem.data && dragItem.data.element) {
        if (dropParent && dropTarget.children.length == 0) {
          if (dropTarget.data && dropTarget.data.element) {
            var newChild = this.$tree.createNode()
            newChild.data = this.$tree.cloneData(dropTarget.data)
            this.$store.commit('tree/setHistory', false)
            this.$store.commit('tree/setData', {
              target: dropTarget,
              data: {
                flex: 1
              }
            })
            this.$store.commit('tree/appendChild', {
              target: dropTarget,
              child: newChild
            })
            this.$store.commit('tree/setHistory', true)
            this.$store.commit('tree/appendChild', {
              target: dropTarget,
              child: dragItem
            })
            this.$store.dispatch('tree/flash', dragItem)
            return
          }

          // move element (data only)
          this.$store.commit('tree/setHistory', false)
          this.$store.commit('tree/setData', {
            target: dropTarget,
            data: dragItem.data
          })
          this.$store.commit('tree/setHistory', true)
          this.$store.commit('tree/setData', {
            target: dragItem,
            data: {
              flex: 1
            }
          })

          this.$store.dispatch('tree/flash', dropTarget)
          return
        }
      }

      // dropTarget.appendChild(dragItem);
      this.$store.commit('tree/appendChild', {
        target: dropTarget,
        child: dragItem
      })

      this.$store.dispatch('tree/flash', dragItem)
    },

    dragStart (event, target) {
      // var img = document.getElementById("dragImage");
      // img.src = 'static/icons/1-column.svg';

      var img = document.getElementById('dragCanvas')
      var ctx = img.getContext('2d')
      // ctx.rect(4,4,112,52);
      // ctx.stroke();
      img.style.display = 'block'

      event.dataTransfer.setDragImage(img, 10, 10)
    },

    drag (event, target) {
      event.preventDefault()
      event.stopPropagation()
      this.$store.commit('tree/setDrag', target)
    },

    dragEnd (event, target) {
      event.preventDefault()
      event.stopPropagation()
      this.$store.commit('tree/setDrag', null)
      this.$store.commit('tree/setDrop', null)
      setTimeout(() => {
        this.$store.commit('tree/setSelected', null)
      }, 500)
    },

    select (event, target) {
      event.preventDefault()
      event.stopPropagation()
      this._select(this, target)
    },

    hover (event, target) {
      event.preventDefault()
      event.stopPropagation()

      if (!this.node) {
        return
      }

      this.$store.commit('tree/setHovered', this.node)
      if (this.$store.state.tree.selected != this.node) {
        this.$store.commit('tree/setSelected', null)
      }

      setTimeout(() => {
        if (
          this.$store.state.tree &&
          this.$store.state.tree.hover &&
          this.$store.state.tree.hover.id == this.node.id
        ) {
          this.$store.commit('tree/setSelected', this.node)
        }
      }, 800)
    },

    _clearFlash: _.debounce(self => {
      self.$store.commit('tree/setFlash', {
        target: self.node,
        value: null
      })
    }, 750),

    _select: _.debounce((self, target) => {
      self.$store.commit('tree/setSelected', target)
    }, 120),

    getId () {
      if (this.node && this.node.id) {
        return `node-${this.node.id}`
      }
      return ''
    },

    getContainerClass () {
      var classes = []
      var node = this.node
      if (node && node.data) {
        if (node.data.row) {
          classes.push('columns')
        }
        if (node.data.className) {
          var cls = node.data.className.split(',')
          classes = [...classes, ...cls]
        }
        if (node.data.flex) {
          // classes.push('flex-' + node.data.flex);
          classes.push('column')
          if (node.data.flex > 1 && node.data.flex < 12) {
            classes.push('is-' + node.data.flex)
          }
        }
      }
      if (this.$store.state.tree.selected) {
        if (this.$store.state.tree.selected.id == node.id) {
          classes.push('selected')
        }
      }
      if (this.$store.state.tree.hover) {
        if (this.$store.state.tree.hover.id == node.id) {
          classes.push('dropTarget')
        }
      }
      if (this.$store.state.tree.drag) {
        if (this.$store.state.tree.drag.id == node.id) {
          classes.push('dragItem')
        }
      }
      if (this.$store.state.tree.drop) {
        if (this.$store.state.tree.drop.id == node.id) {
          classes.push('dropTarget')
        }
      }
      if (this.node.data && this.node.data.flash) {
        classes.push('flash')
        this._clearFlash(this)
      }
      return classes
    },

    getContainerStyle () {
      var styles = []
      var node = this.node
      if (node && node.data) {
        if (node.data.box) {
          Object.keys(node.data.box).forEach(k => {
            if (!node.data.box[k]) {
              return
            }
            var style = {}
            style[k] = node.data.box[k]
            styles.push(style)
          })
        }
      }

      return styles
    }
  },

  mounted () {}
}
</script>
<style lang="scss">
$borderSize: 2px;
$borderStyle: dotted;

.node {
  border: $borderSize $borderStyle rgba(50, 50, 50, 0.15);
  box-sizing: border-box;
  min-width: 80px;
  min-height: 80px;
  padding: 10px;
  margin: 4px;
  transition: border-color 250ms;
  /*margin-bottom: 10px;*/
}

.live-mode .node {
  border: 0px !important;
  min-width: 40px;
  min-height: 40px;
  margin: 0px;
  padding: 0px;
}

.selected .node {
  border: $borderSize $borderStyle rgba(50, 50, 50, 0.15);
}

.nodeName {
  padding: 4px;
}

.flex-row {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
}

.flex-2 {
  flex: 2;
}

.flex-3 {
  flex: 3;
}

.flex-4 {
  flex: 4;
}

.flex-5 {
  flex: 5;
}

.flex-6 {
  flex: 6;
}

.flex-7 {
  flex: 7;
}

.flex-8 {
  flex: 8;
}

.flex-9 {
  flex: 9;
}

.flex-10 {
  flex: 10;
}

.flex-11 {
  flex: 11;
}

.selected {
  border-color: black;
}

.dragItem {
  opacity: 0.5;
  border-color: skyblue;
}

.dropTarget {
  border-color: skyblue;
}

.dropTargetPlaceholder {
  flex: 1;
  border: 2px solid #e0e0e0;
  background: #e0e0e0;
  margin: 4px;
}

* .flash {
  border: $borderSize solid red !important;
}
</style>
