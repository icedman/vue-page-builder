<template>
  <component :is="tag" :class="getHeadingClass()" v-html="content"></component>
</template>
<script>
export default {
  name: 'heading-block',

  element: {
    title: 'Heading',

    properties: [
      {
        name: 'content',
        section: 'content',
        title: 'Heading',
        default: 'This is a heading.',
        component: 'form-control-text'
      },
      {
        name: 'tag',
        title: 'Tag',
        section: 'content',
        default: 'h2',
        options: [
          {
            name: 'H1',
            value: 'h1'
          },
          {
            name: 'H2',
            value: 'h2'
          },
          {
            name: 'H3',
            value: 'h3'
          },
          {
            name: 'H4',
            value: 'h4'
          }
        ],
        component: 'form-control-select'
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
    tag () {
      if (this.node && this.node.data) {
        return this.node.data.tag || 'h2'
      }
      return 'h2'
    },

    content () {
      if (this.node && this.node.data && this.node.data.content) {
        return this.node.data.content
      }
      return ''
    }
  },

  methods: {
    getHeadingClass () {
      switch (this.tag) {
        case 'h1':
          return ['title', 'is-1']
        case 'h2':
          return ['title', 'is-2']
        case 'h3':
          return ['title', 'is-3']
        case 'h4':
          return ['title', 'is-4']
      }
      return ['title', 'is-2']
    }
  },

  mounted () {}
}
</script>
<style>
</style>
