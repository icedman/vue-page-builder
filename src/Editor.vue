<template>
  <div>
    <action-bar></action-bar>

      <canvas id="dragCanvas" width="120px" height="60px" style="position: absolute; top:-100px; left:-100px"></canvas>
      <img id="dragImage" style="position: absolute; top:-100px; left:-100px" src="static/icons/1-column.svg" />

    <div class="columns">
      <div id="root" class="column" :class="getEditorClass">

        <component :is="'tree-node'" :node="root" style="border:0px"></component>

        <div class="container"
          style="margin: auto; margin-top: 40px; padding:40px; text-align: center; border-top: 1px dashed #a0a0a0">
          <a class="add-button" @click="addColumn(0)"><img src="static/icons/1-column.svg" /></a>
          <a class="add-button" @click="addColumn(2)"><img src="static/icons/2-column.svg" /></a>
          <a class="add-button" @click="addColumn(3)"><img src="static/icons/3-column.svg" /></a>
          <a class="add-button" @click="addColumn(4)"><img src="static/icons/4-column.svg" /></a>
          <a class="add-button" @click="addColumn(5)"><img src="static/icons/5-column.svg" /></a>
          <a class="add-button" @click="addTextBlock()"><img src="static/icons/text-block.svg" /></a>
          <!--
        <a class="add-button" @click="addColumn(5)"><img src="static/icons/element.svg"/></a>
        <a class="add-button" @click="addColumn(5)"><img src="static/icons/custom.svg"/></a>
         -->
        </div>

        <pre style="max-width:80vw">
        {{$store.state.tree}}
        </pre>
        
      </div>

      <div class="column">
        <component is="inspector"></component>
      </div>

    </div>
  </div>
</template>

<script>
import ActionBar from './ActionBar'
import Inspector from './Inspector'
import TreeNode from './TreeNode'

export default {
  name: 'editor',

  data () {
    return {
      content: 'Welcome to Your Vue.js App'
    }
  },

  computed: {
    getEditorClass () {
      if (this.getLive()) {
        return ['live-mode']
      }
      return null
    },

    root () {
      return this.$store.state.tree.root
    },

    drag () {
      if (!this.$store.state.tree.drag) return {}
      return this.$store.state.tree.drag
    },

    drop () {
      if (!this.$store.state.tree.drop) return {}
      return this.$store.state.tree.drop
    },

    selected () {
      if (!this.$store.state.tree.selected) return {}
      return this.$store.state.tree.selected
    }
  },

  methods: {
    getLive () {
      return this.$store.state.tree.live == true
    },

    addColumn (count) {
      var target = this.$store.state.tree.root
      var row = this.$tree.createNode()
      var column = null
      row.data = {
        row: true
      }
      for (var i = 0; i < count; i++) {
        var c = this.$tree.createNode()
        c.data = {
          flex: 1
        }
        column = c
        row.appendChild(c)
      }
      // target.appendChild(row);
      this.$store.commit('tree/appendChild', {
        target: target,
        child: row
      })
      this.$store.dispatch('tree/flash', row)
      this.$store.commit('tree/setSelected', null)

      return column
    },

    addTextBlock () {
      var blockType = 'text-block'
      var element = this.$elements.getByName(blockType)
      if (!element) {
        return
      }

      var target = this.$store.state.tree.root
      var row = this.$tree.createNode()
      row.data = Object.assign({ flex:1, element: blockType }, this.$elements.getDefaults(blockType))
      this.$store.commit('tree/appendChild', {
        target: target,
        child: row
      })
      this.$store.dispatch('tree/flash', row)
      this.$store.commit('tree/setSelected', null)
    },

    onKeyDown (event) {
      if (event.key == 'Escape') {
        this.$store.commit('tree/setSelected', null)
        this.$store.commit('tree/setHovered', null)
      }
    }
  },

  mounted () {
    window.$app = this
    this.$store.dispatch('tree/load', {
      name: 'tree-root'
    })

    window.addEventListener('keydown', e => {
      this.onKeyDown(e)
    })
  },

  components: {
    'tree-node': TreeNode,
    'action-bar': ActionBar,
    'inspector': Inspector
  }
}
</script>

<style>
.add-button img {
  width: 60px;
  opacity: 0.15;
  margin-left: 8px;
  margin-right: 8px;
  transition: opacity 200ms;
}

.add-button:hover img {
  opacity: 0.8;
}

.no-select,
a,
img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  user-select: none;
}

#tinymce {
  display: none;
}

* .tooltip {
  z-index: 100;
}
</style>
