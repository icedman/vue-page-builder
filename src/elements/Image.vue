<template>
  	<img :src="content">
</template>
<script>

export default {
    name: 'image-block',

    element: {
        title: 'Image',

        properties: [
            {
                name: 'content',
                section: 'content',
                title: 'URL',
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
            return 'https://bulma.io/images/placeholders/128x128.png';
        }
    },

    mounted() {
    }
};
</script>
<style>
</style>
