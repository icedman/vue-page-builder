<template>
    <button class="button is-primary">{{content}}</button>
</template>
<script>

export default {
    name: 'button-block',

    element: {
        title: 'Button',

        properties: [
            {
                name: 'content',
                section: 'content',
                title: 'Label',
                default: 'Button',
                component: 'form-control-text'
            },
            {
                name: 'onclick',
                section: 'content',
                title: 'On Click',
                component: 'form-control-text'
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
        content() {
            if (this.node && this.node.data && this.node.data.content) {
                return this.node.data.content;
            }
            return 'Button';
        }
    },

    methods: {

    },

    mounted() {
    }
};
</script>
<style>
</style>
