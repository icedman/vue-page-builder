<template>
  <div class="form-field">
    <div class="label form-label">{{property.title}}</div>
    <div class="form-control">
      <b-input type="text" :placeholder="property.placeholder" v-model="target" @input="$emit('input', target)">
      </b-input>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'form-control-text',

  props: {
    value: String,
    property: Object
  },

  data () {
    return {
      target: this.value
    }
  }
}
</script>
