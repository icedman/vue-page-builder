<template>
    <div>
        <div class="modal-card modal-editor">
        <header class="modal-card-head">
            <div style="flex:1"><h2><p class="modal-card-title">{{title}}</p></h2></div>
            <!-- <a @click="close()"><i class="fa fa-times"></i></a> -->
        </header>
        <section class="modal-card-body modal-editor-body">
        <b-tabs class="block" v-model="activeTab">
            <b-tab-item v-for="(t, index) in sections" 
                v-bind:key="index"
                :label="t.title"
                :visible="t.visible">

        <div v-for="(p, index) in properties" v-bind:key="index"
            v-if="p.section==t.name && !p.hide">
            <component :ref="'editor-' + p.name" 
                :is="p.component"
                :property="p"
                :node="node">
            </component>
        </div>

            </b-tab-item>

        </b-tabs>
        </section>
        <footer class="modal-card-foot">
            <div style="flex:1"></div>
            <div>
            <button class="button is-primary" @click="save()">
                <span class="icon"><i class="fa fa-check"></i></span>
                <span>Ok</span>
            </button>
            <!-- <button class="button is-secondary" @click="close()">
                <span class="icon"><i class="fa fa-times"></i></span>
                <span>Cancel</span>
            </button> -->
            </div>
        </footer>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Checkbox, Switch, InputNumber, InputText, InputBox } from './controls/';
import UIDefs from './UIDefs.js';
export default {
    data() {
        return {
            activeTab: 0,
            node: null,
            title: '',
            tabs: UIDefs.tabs,
            properties: []
        };
    },

    computed: {
        sections() {
            return Object.keys(this.tabs).map(k => {
                this.tabs[k].name = k;
                return this.tabs[k];
            });
        }
    },

    methods: {
        save() {
            var data = Object.assign(this.node.data);
            Object.keys(this.$refs).forEach(k => {
                var ref = this.$refs[k][0];
                if (!ref.property || !ref.property.name) {
                    return;
                }
                data[ref.property.name] = ref.value;
            });
            this.$store.commit('tree/setData', {
                target: this.node,
                data: data
            });
            this.$emit('close');
        },

        close() {
            this.$emit('close');
        }
    },

    mounted() {
        this.node = this.$store.state.tree.selected;

        var addProperties = properties => {
            properties.forEach(p => {
                if (p.component && p.component.template) {
                    Vue.component(p.component.name, p.component);
                }

                var component = p.component || {};
                if (typeof component != 'object') {
                    component = { name: component };
                }

                var section = p.section;
                if (typeof section == 'object') {
                    this.tabs[section.name] = section;
                    section = section.name;
                }

                if (!section || section == '') {
                    section = 'layout';
                }

                this.properties.push(
                    Object.assign(p, {
                        component: component.name
                    })
                );
            });
        };

        var addContainerProperties = () => {
            addProperties(UIDefs.defaultProperties);
        };

        var addElementProperties = () => {
            if (!this.node.data || !this.node.data.element) {
                return;
            }

            // element properties
            var elementDef = this.$elements[this.node.data.element];
            if (!elementDef || !elementDef.element) {
                return;
            }

            var element = elementDef.element;
            if (element.tabs) {
                this.tabs = Object.assign(this.tabs, element.tabs);
            }

            this.title = element.title;

            addProperties(element.properties);
        };

        addContainerProperties();
        addElementProperties();

        // toggle tabs
        Object.keys(this.tabs).forEach(k=>{this.tabs[k].visible = false});
        var hasSomeVisibleTabs = false;
        var defaultTab = '';
        this.properties.forEach(p => {
            if (p.default) {
                defaultTab = p.section;
            }
            var tab = this.tabs[p.section];
            if (tab) {
                tab.visible = true;
                hasSomeVisibleTabs = true;
            }
        });

        if (!hasSomeVisibleTabs) {
            this.$emit('close');
        }

        // show default tab
        var idx = Object.keys(this.tabs).indexOf(defaultTab);
        this.activeTab = idx >= 0 ? idx : 0;

        if (this.title == '') {
            this.title = 'Box';
        }

        this.$store.commit('tree/setSelected', null);
        window.$editor = this;
    },

    components: {
        'form-control-checkbox': Checkbox,
        'form-control-switch': Switch,
        'form-control-number': InputNumber,
        'form-control-text': InputText,
        'form-control-box': InputBox,
    }
};
</script>
<style>
.modal-editor {
    background-color: #fff;
    min-width: 60vw;
}
.modal-editor-body {
    /*padding: 0px;*/
    /*min-height: 400px;*/
}
.modal-editor-body .form-field {
    display: flex;
    padding: 8px;
}
.modal-editor-body .form-field .form-label {
    flex: 1;
    margin: auto;
}
.modal-editor-body .form-field .form-control {
    flex: 3;
}
.modal-editor-body .tab-content {
    box-sizing: border-box;
    padding: 4px;
}
</style>
