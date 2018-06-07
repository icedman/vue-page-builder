<template>
    <div id="app">        

        <nav-bar></nav-bar>
        <editor></editor>
    </div>
</template>

<script>
import Editor from './Editor';
import Navbar from './Navbar';

export default {
    name: 'app',

    data() {
        return {};
    },

    computed: {},

    methods: {},

    mounted() {},

    components: {
        editor: Editor,
        'nav-bar': Navbar
    }
};
</script>

<style>
</style>
