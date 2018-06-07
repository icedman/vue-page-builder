import Vue from 'vue';
import App from './App.vue';
import Store from './stores';
import Tree from './libs/tree.js';

import Buefy from 'buefy';
Vue.use(Buefy);
Vue.component('editor-tinymce', TinymceVue.default);

Vue.prototype.$tree = Tree;

// elements
Vue.prototype.$elements = {};
Vue.prototype.$registerElement = component => {
    Vue.prototype.$elements[component.name] = component;
    Vue.component(component.name, component);
};
import AddElement from './elements/AddElement';
import RawHTML from './elements/RawHTML';
import TextBlock from './elements/TextBlock';
import Heading from './elements/Heading';

Vue.prototype.$registerElement(AddElement);
Vue.prototype.$registerElement(RawHTML);
Vue.prototype.$registerElement(TextBlock);
Vue.prototype.$registerElement(Heading);

new Vue({
    el: '#app',
    store: Store,
    render: h => h(App)
});