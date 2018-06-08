<template>
    <div>
        <div class="modal-card modal-select">
        <header class="modal-card-head no-select">
            <p class="modal-card-title">Select element</p>
        </header>
        <section class="modal-card-body modal-select-body">
        
            <div>
            <div class="card element-card" v-for="(e,index) in elements" v-bind:key="index">
                <div class="card-content">
                    <div class="title" draggable="true"
                    @drag="drag($event, e)"
                    @dragstart="dragStart($event, e)"
                    @dragend="dragEnd($event, e)">

                    {{e.title}}
                    </div>
                </div>
                <footer class="card-footer" v-if="showAddButton">
                    <a class="card-footer-item"
                        @click="select(e)"
                        >
                        Add
                    </a>
                </footer>
            </div>
                        <div style="clear:both"></div>
            </div>

        </section>
        <footer class="modal-card-foot">
            
        </footer>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            elements: []
        };
    },

    computed: {
        showAddButton () {
            var active = this.$store.state.tree.selected;
            if (!active) {
                return false;
            }
            return true;
        }
    },

    methods: {

        getElementDefaults (element) {
            var res = {
                element: element.name,
                flex: 1
            };

            // element properties
            var elementDef = this.$elements[element.name];
            if (!elementDef || !elementDef.element || !elementDef.element.properties) {
                return res;
            }

            // grab defaults
            Object.keys(elementDef.element.properties).forEach(k => {
                var prop = elementDef.element.properties[k];
                if (prop.default) {
                    res[prop.name] = prop.default;
                } else {
                    res[prop.name] = '';
                }
            });

            return res;
        },

        select(element) {
            var active = this.$store.state.tree.selected;
            if (!active) {
                this.$emit('close');
                return;
            }

            this.$store.commit('tree/setData', {
                target: active,
                data: this.getElementDefaults(element)
            });

            this.$store.dispatch('tree/flash', active);
            this.$emit('close');
        },

        dragStart(event, target) {
            var img = new Image();
            img.src = 'static/icons/1-column.svg';

            /*
            var img = document.getElementById("dragCanvas");
            var ctx = img.getContext("2d");
            ctx.rect(4,4,112,52);
            ctx.stroke();
            img.style.display = "block";
            */

            event.dataTransfer.setDragImage(img, 10, 10);
            this.$emit('close');
        },

        drag(event, target) {
            event.preventDefault();
            event.stopPropagation();

            var node = this.$tree.createNode();
            node.data = this.getElementDefaults({ name: target.name });

            this.$store.commit('tree/setDrag', node);
        },

        dragEnd(event, target) {
            event.preventDefault();
            event.stopPropagation();
            this.$store.commit('tree/setDrag', null);
            this.$store.commit('tree/setDrop', null);
            setTimeout(() => {
                this.$store.commit('tree/setSelected', null);
            }, 500);
        },
    },

    mounted () {

        var elements = [];
        Object.keys(this.$elements).forEach(k=>{
            var elem = this.$elements[k];
            if (!elem.element) {
                return;
            }

            elements.push(Object.assign(
                JSON.parse(JSON.stringify(elem.element)), // deep clone
                { name: k }
            ));
        });

        this.elements = elements;
    }
};
</script>
<style>
.modal-select {
    background-color: #fff;
    min-width: 60vw;
}
.element-card {
    float: left;
    margin: 8px;
    min-width: 380px;
}
</style>
