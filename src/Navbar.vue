<template>
<nav class="navbar is-secondary has-shadow" style="z-index:1">
  <div class="navbar-brand">

    <div class="navbar-burger burger is-hoverable" :class="menuActiveClass" data-target="navMenuToggled" @click="toggleMenu($event)">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navMenuToggled" class="navbar-menu" :class="menuActiveClass">
    <div class="navbar-start">
    
    <a v-for="item in menuItems" v-if="!item.right" :to="item.path" class="navbar-item is-hoverable" :class="getItemClass(item)" :key="item.id" @click="clickMenuItem(item)">
        <i :class="item.icon" v-if="item.icon"></i>
      <span v-if="item.title" class="navbar-item-text is-hidden-diesktop">{{item.title}}</span>
    </a>

    </div>

    <div class="navbar-end">

    <a v-for="item in menuItems" v-if="item.right" :to="item.path" class="navbar-item is-hoverable" :class="getItemClass(item)" :key="item.id" @click="clickMenuItem(item)" >
        <i :class="item.icon" v-if="item.icon"></i>
      <!-- <span v-if="item.title" class="navbar-item-text is-hidden-diesktop">{{item.title}}</span> -->
    </a>

    </div>

  </div>
</nav>
</template>

<script>
import 'vue-router';
import ElementSelect from './ElementSelect';

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export default {
    data() {
        return {
            menuActive: false,
            history: [],
            menuItems: [
                { path: '/editor/workspace', title: 'Page Builder' },
                {
                    name: 'undo',
                    cmd: () => {
                        this.undo();
                    },
                    icon: 'fa fa-undo',
                    right: true
                },
                {
                    cmd: () => {
                        this.$store.dispatch('tree/save').then(() => {
                            this.$snackbar.open({ message: 'Saved' });
                        });
                    },
                    title: 'Save',
                    icon: 'fa fa-check',
                    right: true
                },
                {
                    cmd: () => {
                        this.$store.commit('tree/setSelected', null);
                        this.$modal.open({
                            parent: this,
                            component: ElementSelect,
                            hasModalCard: true,
                            canCancel: true
                        });
                    },
                    title: 'Save',
                    icon: 'fa fa-plus',
                    right: true
                },
                {
                    name: 'live',
                    cmd: () => {
                        this.toggleLive();
                    },
                    icon: 'fa fa-eye',
                    right: true
                },
                {
                    path: '/auth/login',
                    // title: 'Logout',
                    icon: 'fa fa-sign-out-alt',
                    right: true
                }
            ]
        };
    },

    computed: {
        menuActiveClass() {
            return this.menuActive ? 'is-active' : null;
        }
    },

    methods: {
        getItemClass(item) {
            if (item.name == 'undo') {
                if (this.history.length <= 1) {
                    return ['navbar-item-disabled'];
                }
            }
            return [];
        },

        clickMenuItem(item) {
            if (item.cmd) {
                item.cmd();
            }
        },

        toggleMenu(event) {
            this.menuActive = !this.menuActive;
        },

        toggleLive(event) {
            this.$store.commit('tree/setLive', !this.$store.state.tree.live);
        },

        back() {
            this.$router.go(-1);
        },

        undo() {
            if (!this.history.length) {
                return;
            }

            var state = this.history.pop();
            var currentState = this.$store.state.tree.root.toString();
            if (this.history.length && state.hash == currentState.hashCode()) {
                state = this.history.pop();
            }
            var treeState = this.$tree.createFromJSON(state.state);
            if (treeState) {
                this.$store.commit('tree/setRoot', treeState);
            }

            // make sure we keep copy of initial state
            if (this.history.length == 0) {
                this.history.push(state);
            }
        }
    },

    created() {
        this.$store.subscribe(mutation => {
            if (!this.$store.state.tree.history) {
                return;
            }
            switch (mutation.type) {
                case 'tree/setHistory':
                case 'tree/setDrag':
                case 'tree/setDrop':
                case 'tree/setSelected':
                case 'tree/setHovered':
                case 'tree/setFlash':
                    return;
            }
            var treeState = this.$store.state.tree.root.toString();
            var hash = treeState.hashCode();
            if (this.history.length) {
                // check last state
                var lastState = this.history[this.history.length - 1];
                if (lastState.hash == hash) {
                    return;
                }
            }
            this.history.push({state:treeState, hash:hash});

            // cap history length??
        });
    },

    mounted() {
        window.$history = this.history;
    }
};
</script>

<style>
.navbar-item.is-mega {
    position: static;
    .is-mega-menu-title {
        margin-bottom: 0;
        padding: 0.375rem 1rem;
    }
}
.navbar-item {
    font-size: 16pt;
}
.navbar-burger span {
    pointer-events: none;
}
.navbar-item-disabled {
    opacity: 0.25;
}
</style>
