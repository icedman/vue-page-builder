import Vue from 'vue'
import App from './App.vue'
import Store from './stores'
import Tree from './libs/tree.js'

import Buefy from 'buefy'

import { codemirror } from 'vue-codemirror-lite'

import AddElement from './elements/AddElement'
import RawHTML from './elements/RawHTML'
import TextBlock from './elements/TextBlock'
import Heading from './elements/Heading'
import Image from './elements/Image'
import Button from './elements/Button'
Vue.use(Buefy)
Vue.component('editor-tinymce', TinymceVue.default)
Vue.component('codemirror', codemirror)
require('codemirror/mode/htmlmixed/htmlmixed')
require('codemirror/mode/css/css')

Vue.prototype.$tree = Tree

// --------------
// basic elements
// --------------
Vue.prototype.$elements = {}
Vue.prototype.$registerElement = component => {
  Vue.prototype.$elements[component.name] = component
  Vue.component(component.name, component)
}

Vue.prototype.$registerElement(AddElement)
Vue.prototype.$registerElement(RawHTML)
Vue.prototype.$registerElement(TextBlock)
Vue.prototype.$registerElement(Heading)
Vue.prototype.$registerElement(Image)
Vue.prototype.$registerElement(Button)

new Vue({
  el: '#app',
  store: Store,
  render: h => h(App)
})
