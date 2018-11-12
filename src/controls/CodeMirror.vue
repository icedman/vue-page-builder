<template>
  <div>
    <div class="form-field">
      <div class="label form-label">{{property.title}}</div>
    </div>
    <div class="form-control">
      <codemirror ref="codeEditor" :options="codeOptions" maxlength="200" type="textarea"
        v-model="target" @change="$emit('input', target)"></codemirror>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'form-control-code',

  props: {
    value: String,
    property: Object
  },

  data () {
    return {
      target: this.value,
      codeOptions: {
        mode: 'htmlmixed',
        lineNumbers: true
      }
    }
  },

  methods: {
    refresh () {
      this.$refs.codeEditor.editor.setOption('mode', this.codeOptions.mode)
      this.$refs.codeEditor.editor.refresh()
    }
  },

  mounted () {
    if (this.property.mode) {
      this.codeOptions.mode = this.property.mode
      this.refresh()
    }
  }
}
</script>
