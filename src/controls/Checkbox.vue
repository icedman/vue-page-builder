<template>
    <div class="field">
        <div>xx
        <b-checkbox v-model="target" @input="$emit('input', target)">
            {{property.title}}
        </b-checkbox>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'form-control-checkbox',

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
