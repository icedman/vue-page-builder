<template>
<div class="block b-p-t-15">
  <b-tabs v-model="tabIndex" type="is-toggle is-small" position="is-centered" class="xblock">
      <b-tab-item label="Document">
      </b-tab-item>
      <b-tab-item label="Block">
      </b-tab-item>

      <div v-show="tabIndex==0">
        <element-inspector key="inspector-document" v-model="node"></element-inspector>
      </div>
      <div v-show="tabIndex==1">
        <element-inspector key="inspector-element"v-model="node"></element-inspector>
      </div>

  </b-tabs>
</div>
</template>
<script>
import ElementInspector from './ElementInspector'
export default {
    data () {
        return {
            tabIndex: 0
        }
    },

    computed: {
        node () {
            if (this.$store.state.tree && this.$store.state.tree.selected) {
                return this.$store.state.tree.selected
            }
            return null
        }
    },

    components: {
        'element-inspector': ElementInspector
    }
}
</script>
<style></style>