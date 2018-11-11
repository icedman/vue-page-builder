<template>
  <div v-html="content"></div>
</template>
<script>
let contentEditComponent = {
  name: 'raw-html-editor',

  template: `
    <div>
    <codemirror :options="options" maxlength="200" type="textarea" v-model="value"></codemirror>
    </div>
    `,

  props: {
    node: Object,
    property: Object
  },

  data () {
    return {
      value: '',
      options: {
        mode: 'htmlmixed',
        lineNumbers: true
      }
    }
  },

  mounted () {
    setTimeout(() => {
      this.value = this.node.data[this.property.name]
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
        component: contentEditComponent
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
  },

  mounted () {}
}
</script>
<style>
</style>
