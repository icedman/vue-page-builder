<template>
<div>

    <!-- action bar -->
    <div class="action-bar no-select action-bar-visible" :style="getActionBarPosition()">

        <b-tooltip label="Add Container" type="is-warning">
        <button class="button is-primary is-small" title="" @click="addItem()">
            <span class="icon">
                <i class="fa fa-plus"></i>
            </span>
        </button>
        </b-tooltip>

        <b-tooltip label="Duplicate" type="is-warning">
        <button class="button is-primary is-small" @click="cloneItem()">
            <span class="icon">
                <i class="fa fa-clone"></i>
            </span>
        </button>
        </b-tooltip>

        <b-tooltip label="Edit" type="is-warning">
        <button class="button is-primary is-small"
            @click="edit()">
            <span class="icon">
                <i class="fa fa-pencil"></i>
            </span>
        </button>
        </b-tooltip>

        <!-- <b-tooltip label="Adjust flex weight" type="is-warning">
        <button class="button is-primary is-small"
            @click="showFlexSlider=true">
            <span class="icon">
                <i class="fa fa-arrows-alt-h"></i>
            </span>
        </button>
        </b-tooltip> -->
        
        <b-tooltip label="Change Orientation" type="is-warning">
        <button class="button is-primary is-small" :class="getToggleClass()" @click="toggleRow()">
            <span class="icon">
                <i :class="getToggleIconClass()"></i>
            </span>
        </button></b-tooltip><b-tooltip label="Remove" type="is-danger">
        <button class="button is-danger is-small" @click="remove()">
            <span class="icon">
                <i class="fa fa-times"></i>
            </span>
        </button>
        </b-tooltip></div>

    <!-- add bar -->
    <div class="add-bar-container" :style="getAddBarPosition()">
        <div class="add-bar">

        <b-tooltip :label="getAddAfterText()" type="is-warning">
        <button class="button is-primary is-small" @click="addItemAfter()">
        <span class="icon">
            <i class="fa fa-plus"></i>
        </span>
        </button>
        </b-tooltip>

        </div>
    </div>
</div>
</template>
<script>
import ElementEditor from './ElementEditor';

var buttonOffset = 14;
export default {

    data () {
        return {
            lastSelected: null,
            showFlexSlider: false,
            top: 0,
            left: 0
        };
    },

    computed: {

        selected() {
            // if (this.lastSelected && this.showFlexSlider) {
            //     return this.lastSelected;
            // }
            if (this.$store.state.tree.drag) {
                return {};
            }
            if (!this.$store.state.tree.selected) {
                return {};
            }
            this.lastSelected = this.$store.state.tree.selected;
            return this.lastSelected;
        },

        name() {
            if (!this.$store.state.tree.selected) {
                return '';
            }
            return this.$store.state.tree.selected.name;
        }
    },

    methods: {

        getFlexValue () {
            if (
                !this.selected ||
                !this.selected.parent ||
                !this.selected.parent()
            ) {
                return 0;
            }
            var data = this.selected.data || {};
            var flex = data.flex || 0;
            return flex;
        },

        getActionBarPosition() {
            if (
                !this.selected ||
                !this.selected.parent ||
                !this.selected.parent()
            ) {
                return [{ visibility: 'hidden' }, { opacity: 0 }, { top: `${top}px` }, { left: `${left}px` }];
            }

            var id = this.selected.id;
            var target = document.querySelector('#node-' + id);
            if (!target) return [{ visibility: 'hidden' }, { opacity: 0 }];
            var rect = target.getBoundingClientRect();
            var top = rect.y - buttonOffset + window.scrollY;
            var left = rect.x + window.scrollX;

            this.top = top;
            this.left = left;
            return [{ top: `${top}px` }, { left: `${left}px` }];
        },

        getAddBarPosition() {
            if (
                !this.selected ||
                !this.selected.parent ||
                !this.selected.parent()
            ) {
                return [{ visibility: 'hidden' }, { opacity: 0 }];
            }

            var id = this.selected.id;
            var target = document.querySelector('#node-' + id);
            if (!target) return [{ visibility: 'hidden' }, { opacity: 0 }];
            var rect = target.getBoundingClientRect();
            var top = rect.y + rect.height - buttonOffset + window.scrollY;
            var left = rect.x + window.scrollX;
            var width = rect.width;
            var height = rect.height;

            var parentData = this.selected.parent().data || {};
            if (parentData.row) {
                top = rect.y + rect.height / 2 + window.scrollY - buttonOffset;
                left = rect.x + rect.width + window.scrollX - buttonOffset;
                return [{ top: `${top}px` }, { left: `${left}px` }];
            }
            return [
                { top: `${top}px` },
                { left: `${left}px` },
                { width: `${width}px` }
            ];
        },

        getAddAfterText() {
            var target = this.selected;
            if (!target || !target.parent) {
                return;
            }
            var parent = target.parent();
            if (parent && parent.data && parent.data.row) {
                return 'Add Column';
            }
            return 'Add Row';
        },

        getToggleIconClass() {
            var target = this.selected;
            if (!target) {
                return;
            }
            if (target.data && target.data.row) {
                return 'fa fa-ellipsis-v';
            }
            return 'fa fa-ellipsis-h';
        },

        getToggleClass() {
            var target = this.selected;
            if (!target || !target.children) {
                return;
            }
            return target.children.length > 1 ? '' : 'hide-toggle-orientation';
        },

        remove() {
            var target = this.selected;
            if (!target) {
                return;
            }
            if (target.data && target.data.element) {
                this.$store.commit('tree/setData', {
                    target: target,
                    data: {
                        flex: 1
                    }
                });
                return;
            }

            this.$store.commit('tree/removeChild', target);
        },

        addItem() {
            var target = this.selected;
            if (!target) {
                return;
            }
            var c = this.$tree.createNode();
            c.data = { flex: 1 };
            this.$store.commit('tree/appendChild', {
                target: target,
                child: c
            });
        },

        addItemAfter() {
            var target = this.selected;
            if (!target || !target.parent()) {
                return;
            }
            var c = this.$tree.createNode();
            c.data = { flex: 1 };
            this.$store.commit('tree/appendChildAfter', {
                target: target.parent(),
                child: c,
                sibling: target
            });
        },

        cloneItem() {
            var target = this.selected;
            if (!target || !target.parent()) {
                return;
            }
            var c = this.selected.clone();
            this.$store.commit('tree/appendChildAfter', {
                target: target.parent(),
                child: c,
                sibling: target
            });
        },

        toggleRow() {
            var target = this.selected;
            if (!target) {
                return;
            }
            // make this a proper mutation
            target.data = target.data || {};
            target.data.row = !target.data.row;

            // forces refresh
            this.$store.commit('tree/setSelected', null);
        },

        edit() {
            var target = this.selected;
            this.$modal.open({
                parent: this,
                component: ElementEditor,
                hasModalCard: true,
                // canCancel: false
                // canCancel: 'x'
            });
        }
    },

    components: {
    }
};
</script>
<style lang="scss">
$toolbarColor: black;
.action-bar {
    position: absolute;
    opacity: 1;
    transition: opacity 1000ms;
    background-color: $toolbarColor;
    border-radius: 8px;
    padding: 0px;
}
.add-bar-container {
    position: absolute;
    opacity: 1;
    transition-delay: 200ms;
    transition: opacity 1000ms;
    text-align: center;
    pointer-events: none;
}
.add-bar {
    display: inline-block;
    background-color: $toolbarColor;
    border-radius: 8px;
    padding: 0px;
    pointer-events: all;
}
.action-bar button.is-primary,
.action-bar button.is-danger,
.add-bar button.is-primary {
    background-color: transparent;
    border-radius: 8px;
}
.action-bar button.is-primary:focus,
.action-bar button.is-danger:focus,
.add-bar button.is-primary:focus {
    outline: 0;
}
.hide-toggle-orientation {
    display: none;
}
</style>
