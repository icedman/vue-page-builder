<template>
  <div style="zoom:0.8">
    {{node}}
    <div class="b-p-b-15" v-for="(p, index) in properties" v-bind:key="index" v-if="node && node.data">
      <component :ref="'editor-' + p.name" :is="p.component" :property="p" v-model="node.data[p.name]">
      </component>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Checkbox,
  Switch,
  InputNumber,
  InputText,
  InputBox,
  Select,
  CodeMirror
} from './controls/'
import UIDefs from './UIDefs.js'
export default {
  props: {
    value: Object
  },

  data () {
    return {
      node: this.value,
      title: '',
      tabs: UIDefs.tabs,
      properties: []
    }
  },

  watch: {
    value: {
      handler: function (newValue, oldValue) {
        this.node = newValue
        this.buildProperties ()
      }
    }
  },

  methods: {
      buildProperties () {

        this.properties = []
        var addProperties = properties => {
          properties.forEach(p => {
            if (p.component && p.component.template) {
              Vue.component(p.component.name, p.component)
            }

            var component = p.component || {}
            if (typeof component !== 'object') {
              component = {
                name: component
              }
            }

            this.properties.push(
              Object.assign(p, {
                component: component.name
              })
            )
          })
        }

        var addContainerProperties = () => {
          addProperties(UIDefs.defaultProperties)
        }

        var addElementProperties = () => {
          if (!this.node || !this.node.data || !this.node.data.element) {
            return
          }

          // element properties
          var elementDef = this.$elements[this.node.data.element]
          if (!elementDef || !elementDef.element) {
            return
          }

          var element = elementDef.element
          if (element.tabs) {
            this.tabs = Object.assign(this.tabs, element.tabs)
          }

          this.title = element.title
          addProperties(element.properties)
        }

        addContainerProperties()
        addElementProperties()
      },
  },

  mounted () {
    this.buildProperties()
  },

  components: {
    'form-control-checkbox': Checkbox,
    'form-control-switch': Switch,
    'form-control-number': InputNumber,
    'form-control-text': InputText,
    'form-control-box': InputBox,
    'form-control-select': Select,
    'form-control-code': CodeMirror
  }
}
</script>
<style>
</style>
