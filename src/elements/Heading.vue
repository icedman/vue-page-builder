<template>
    <component :is="tag">{{content}}</component>
</template>
<script>

export default {
    name: 'heading',

    element: {
        title: 'Heading',

        properties: [
            {
                name: 'content',
                default: true, // default section
                section: 'content',
                title: 'Heading',
                component: 'form-control-text'
            },
            {
                name: 'tag',
                title: 'Tag',
                section: 'content',
                options: [
                    { name: 'H1', value: 'h1' },
                    { name: 'H2', value: 'h2' },
                    { name: 'H3', value: 'h3' },
                    { name: 'H4', value: 'h4' }
                ],
                component: 'form-control-select'  
            }
        ]
    },

    data() {
        return {
        };
    },

    props: {
        node: Object
    },

    computed: {
        tag () {
            if (this.node && this.node.data) {
                return this.node.data.tag || 'h2';
            }
            return 'h2';
        },

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
                value: 'This is a heading'
            });
        }
        if (!this.node.data.tag) {
            this.$store.commit('tree/setData', {
                target: this.node,
                key: 'tag',
                value: 'h2'
            });
        }
    }
};
</script>
<style>
h2 {
    font-size: 18pt;
}
</style>
