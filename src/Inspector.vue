<template>
<div class="b-m-t-15">
  <!-- <b-tabs v-model="tabIndex" type="is-toggle is-small" position="is-centered"> -->
      <element-inspector key="inspector-element" v-model="$store.getters['tree/selected']"></element-inspector>
  <!-- </b-tabs> -->
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

    components: {
        'element-inspector': ElementInspector
    }
}
</script>
<style></style>