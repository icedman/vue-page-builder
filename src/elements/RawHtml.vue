<template>
    <div v-html="content"></div>
</template>
<script>
let contentEditComponent = {
    name: 'raw-html-editor',

    template: `
    <div>
    <editor-tinymce 
        :id="'editor-tinymce' + property.name"
        :other_options="editorOptions"
        v-model="value">
    </editor-tinymce>
    </div>
    `,

    props: {
        node: Object,
        property: Object
    },

    data() {
        return {
            value: '',
            editorOptions: {
                menubar: false,
                branding: false
            }
        };
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
    name: 'raw-html',

    element: {
        title: 'Raw HTML',

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
                value: '<b>Raw Html</b><p>Lorem Ipsum</p>'
            });
        }
    }
};
</script>
<style>
</style>
