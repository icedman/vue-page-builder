<template>
    <div class="field">
        <div>
        <b-checkbox v-model="value">
            {{property.title}}
        </b-checkbox>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    name: 'form-control-checkbox',

    props: {
        node: Object,
        property: Object
    },

    data() {
        return {
            value: ''
        };
    },

    mounted() {
        this.value = this.node.data[this.property.name];
    }
};
</script>
