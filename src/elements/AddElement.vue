<template>
  <div class="addElement" :class="addElementClass" style="width: 100%; height: 100%;">
    <div style="max-width: 76px; height: 100%; margin:auto;">
      <a class="add-button" @click="add()">&nbsp;</a>
    </div>
  </div>
</template>
<script>
import ElementSelect from '../ElementSelect'

export default {
  name: 'add-element',

  props: {
    node: Object
  },

  computed: {
    addElementClass () {
      if (this.node && this.$store.state.tree.selected == this.node) {
        return 'shown'
      }
      return ''
    }
  },

  methods: {
    add () {
      this.$store.commit('tree/setSelected', this.node)
      this.$modal.open({
        parent: this,
        component: ElementSelect,
        hasModalCard: true,
        canCancel: true
      })
    }
  }
}
</script>
<style>
.addElement .add-button {
  opacity: 0;
}

.addElement.shown .add-button {
  display: inline-block;
  background-image: url("/static/icons/element.svg");
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  opacity: 0.15;
  min-height: 40px;
}

.addElement .add-button:hover {
  opacity: 0.8;
  transition: opacity 200ms;
}
</style>
