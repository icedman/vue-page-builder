<template>
    <div class="form-field">
        <div class="label form-label">{{property.title}}</div>
        <div class="form-control">
        <b-switch v-model="value">
            {{property.values[value?0:1]}}
        </b-switch>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    name: 'form-control-switch',

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
