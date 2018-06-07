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
                component: 'form-control-text'  
            }
        ]
    },

    data() {
        return {
            tag: 'h2'
        };
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

        this.tag = this.node.data.tag;
    }
};
</script>
<style>
h2 {
    font-size: 18pt;
}
</style>
