<template>
  <div class="form-field">
    <div class="label form-label">{{property.title}}</div>
    <div class="form-control">
      <b-select v-model="target" @input="$emit('input', target)">
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
