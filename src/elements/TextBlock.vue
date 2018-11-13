<template>
  <div v-html="content"></div>
</template>
<script>
let contentEditComponent = {
  name: 'text-block-editor',

  template: `
    <div>
    <b-tabs v-model="tabIndex" type="is-toggle is-small" position="is-centered" class="xblock">
      <b-tab-item label="HTML"></b-tab-item>
      <b-tab-item label="Code"></b-tab-item>
    <editor-tinymce ref="htmlEditor"
        v-show="tabIndex==0"
        :id="'editor-tinymce' + property.name"
        :other_options="tinyOptions"
        v-model="target"
        @input="$emit('input', target)"
        >
    </editor-tinymce>

    <codemirror ref="codeEditor" v-if="tabIndex==1" :options="codeOptions" maxlength="200" type="textarea" v-model="target" @change="$emit('input', target)"></codemirror>

    </b-tabs>
    </div>
    `,

  props: {
    value: String,
    property: Object
  },

  data () {
    return {
      tabIndex: 0,
      target: this.value,
      showCode: false,
      tinyOptions: {
        menubar: false,
        branding: false
      },
      codeOptions: {
        mode: 'htmlmixed',
        lineNumbers: true
      }
    }
  },

  mounted () {
    setTimeout(() => {
      if (this.$refs.htmlEditor && this.$refs.htmlEditor.editor) {
        this.$refs.htmlEditor.editor.render()
      }
      if (this.$refs.codeEditor && this.$refs.codeEditor.editor) {
        this.$refs.codeEditor.editor.refresh()
      }
    }, 0)
  }
}

/*
  "formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat"
  */

export default {
  name: 'text-block',

  element: {
    title: 'Text Block',

    properties: [
      {
        name: 'content',
        section: 'content',
        default: '<b>Text Block</b><p>Lorem Ipsum</p>',
        component: contentEditComponent,
        'componentMini': 'div'
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
