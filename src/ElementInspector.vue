<template>
  <div>
    <div class="message is-info b-p-20 b-m-r-10" v-if="!node">
      No block selected
    </div>
    <b-tabs type="is-toggle is-small" position="is-centered" class="xblock" v-if="node && node.data">
    <b-tab-item v-for="(t, index) in sections" v-bind:key="index" :label="t.title">

      <div v-for="(p, index) in properties" v-bind:key="index">
      <component class="b-p-b-15" v-if="p.section==t.name && !p.hide"
          :is="p.componentMini || p.component" :property="p" v-model="node.data[p.name]">
      </component>
      </div>

    </b-tab-item>
    </b-tabs>
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
  InputBoxMini,
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

  computed: {
    sections () {
      return Object.keys(this.tabs).map(k => {
        this.tabs[k].name = k
        return this.tabs[k]
      })
    }
  },

  watch: {
    value: {
      handler: function (newValue, oldValue) {
        this.node = {}
        this.$nextTick(() =>{
          this.node = newValue
          this.buildProperties()
        })
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
              Object.assign(JSON.parse(JSON.stringify(p)), {
                component: component.name.includes('box') ? 'form-control-box-mini' : component.name
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
    'form-control-box-mini': InputBoxMini,
    'form-control-select': Select,
    'form-control-code': CodeMirror
  }
}
</script>
<style>
</style>
