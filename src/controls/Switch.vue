<template>
  <div class="form-field">
    <div class="label form-label">{{property.title}}</div>
    <div class="form-control">
      <b-switch v-model="target" @input="$emit('input', target)">
        {{property.values[value?0:1]}}
      </b-switch>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'form-control-switch',

  props: {
    value: null,
    property: Object
  },

  data () {
    return {
      target: this.value ? true : false
    }
  }
}
</script>
