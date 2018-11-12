<template>
  <div v-html="content"></div>
</template>
<script>
let contentCodeComponent = {
  name: 'raw-html-editor',

  template: `
    <div>
    <codemirror ref="codeEditor" :options="options" maxlength="200" type="textarea" v-model="target" @change="$emit('input', target)"></codemirror>
    </div>
    `,

  props: {
    value: String,
    property: Object
  },

  data () {
    return {
      showEditor: false,
      target: this.value,
      options: {
        mode: 'htmlmixed',
        lineNumbers: true
      }
    }
  },

  mounted () {
    setTimeout(() => {
      if (this.$refs.codeEditor && this.$refs.codeEditor.editor) {
        this.$refs.codeEditor.editor.refresh()
      }
    }, 0)
  }
}

export default {
  name: 'raw-html',

  element: {
    title: 'Raw HTML',

    properties: [
      {
        name: 'content',
        section: 'content',
        default: '<b>Raw Html</b><p>Lorem Ipsum</p>',
        component: contentCodeComponent
      }
    ]
  },

  data () {
    return {}
  },

  props: {
    node: Object
  },

  computed: {
    content () {
      if (this.node && this.node.data) {
        return this.node.data.content || ''
      }
      return ''
    }
  }
}
</script>
<style>
</style>
