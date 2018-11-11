<template>
  <div class="form-field">
    <div class="label form-label">{{property.title}}</div>
    <div class="form-control">
      <b-select v-model="value">
        <option v-for="opt in property.options" :key="opt.value" :value="opt.value">{{opt.name}}
        </option>
      </b-select>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'form-control-select',

  props: {
    node: Object,
    property: Object
  },

  data () {
    return {
      value: ''
    }
  },

  mounted () {
    this.value = this.node.data[this.property.name]
  }
}
</script>
