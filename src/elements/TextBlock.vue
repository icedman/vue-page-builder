<template>
    <div v-html="content"></div>
</template>
<script>
let contentEditComponent = {
    name: 'text-block-editor',

    template: `
    <div>
    <b-tabs @input="refreshCodeEditor" type="is-toggle is-small" position="is-centered" class="block">

    <b-tab-item label="HTML">
    <editor-tinymce 
        :id="'editor-tinymce' + property.name"
        :other_options="tinyOptions"
        v-model="value">
    </editor-tinymce>
    </b-tab-item>
    
    <b-tab-item label="Code">
    <codemirror ref="codeEditor" :options="codeOptions" maxlength="200" type="textarea" v-model="value"></codemirror>
    </b-tab-item>

    </b-tabs>
    </div>
    `,

    props: {
        node: Object,
        property: Object
    },

    data() {
        return {
            value: '',
            showCode: false,
            tinyOptions: {
                menubar: false,
                branding: false
            },
            codeOptions: {
                mode: 'htmlmixed',
                lineNumbers: true
            }
        };
    },

    methods: {
        refreshCodeEditor(idx) {
            setTimeout(() => {
                this.$refs.codeEditor.editor.refresh();
            }, 0);
        }
    },

    mounted() {
        setTimeout(() => {
            this.value = this.node.data[this.property.name];
        }, 0);
    }
};

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
                default: true,
                section: 'content',
                component: contentEditComponent
            }
        ]
    },

    data() {
        return {};
    },

    props: {
        node: Object
    },

    computed: {
        content() {
            if (this.node && this.node.data) {
                return this.node.data.content || '';
            }
            return '';
        }
    },

    mounted() {
        if (!this.node.data.content) {
            this.$store.commit('tree/setData', {
                target: this.node,
                key: 'content',
                value: '<b>Text Block</b><p>Lorem Ipsum</p>'
            });
        }
    }
};
</script>