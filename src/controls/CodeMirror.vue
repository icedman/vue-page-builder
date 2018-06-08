<template>
    <div>
        <div class="form-field">
            <div class="label form-label">{{property.title}}</div>
        </div>
        <div class="form-control">
        <codemirror ref="codeEditor" :options="codeOptions" maxlength="200" type="textarea" v-model="value"></codemirror>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    name: 'form-control-code',

    props: {
        node: Object,
        property: Object
    },

    data() {
        return {
            value: '',
            codeOptions: {
                mode: 'htmlmixed',
                lineNumbers: true
            }
        };
    },

    methods: {
        refresh () {
            this.$refs.codeEditor.editor.setOption('mode', this.codeOptions.mode);
            this.$refs.codeEditor.editor.refresh();
        }
    },

    mounted() {
        if (this.property.mode) {
            this.codeOptions.mode = this.property.mode;
            this.refresh();
        }
        this.value = this.node.data[this.property.name];
    }
};
</script>
