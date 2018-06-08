import Vue from 'vue';
import Tree from '../libs/tree.js';

function _emptyState () {
    return {
            root: Tree.createNode('root', { row: true }),
            selected: null, // clicked < show toolbar
            drag: null,
            drop: null,
            hover: null,
            live: false,
            history: true
        }; 
}

function _convertContainerToElement(p) {
    if (p && p.children.length == 1 && p.children[0].data.element) {
        p.data = Tree.cloneData(p.children[0].data);
        p.children[0].remove();
    }
}

let state = _emptyState ();

let saveToLocalStorage = function(name, data) {
    var _name = window.location.hostname + '-' + name;
    window.localStorage.setItem(_name, data);
};

let loadFromLocalStorage = function(name) {
    var _name = window.location.hostname + '-' + name;
    return window.localStorage.getItem(_name);
};

let actions = {
    save(context, data) {
        data = data || {};
        var name = data.name || 'tree-root';
        saveToLocalStorage(name, context.state.root.toString());
    },

    load(context, data) {
        data = data || {};
        var name = data.name || 'tree-root';
        var str = loadFromLocalStorage(name);
        var obj = Tree.createFromJSON(loadFromLocalStorage(name));
        if (obj) {
            context.commit('setRoot', obj);
        }
    },

    flash(context, component) {
        context.commit('setFlash', {
            target: component,
            value: true
        });
    },
};

let getters = {};

let mutations = {

    setLive(state, live) {
        state.live = live;
    },

    setDrag(state, component) {
        state.drag = component;
        state.selected = null;
    },

    setDrop(state, component) {
        state.drop = component;
        state.selected = null;
    },

    setSelected(state, component) {
        state.selected = component;
    },

    setHovered(state, component) {
        state.hover = component;
    },

    setRoot(state, root) {
        if (root == null) {
            root = Tree.createNode('root', { row: true });
        }
        var _empty = _emptyState();
        Object.keys(_empty).forEach(k=>{
            state[k] = _empty[k];
        })
        state.root = root;
    },

    setData(state, params) {
        var t = state.root.findChildById(params.target.id);
        if (!t) {
            return;
        }
        if (!t['data']) {
            Vue.set(t, 'data', {});
        }
        if (params.data) {
            t.data = params.data;
        }
        if (params.key) {
            if (!t.data['key']) {
                Vue.set(t.data, params.key, params.value);
            } else {
                t.data['key'] = params.value;
            }
        }
        state.selected = null;
    },

    setFlash(state, params) {
        var t = state.root.findChildById(params.target.id);
        if (!t['data']) {
            Vue.set(t, 'data', {});
        }
        if (!t.data['flash']) {
            Vue.set(t.data, 'flash', params.value);
        } else {
            t.data.flash = params.value;
        }
    },

    setHistory(state, params) {
        state.history = params;
    },

    appendChild(state, params) {
        var p = params.child.parent ? params.child.parent() : null;
        var t = state.root.findChildById(params.target.id);
        if (t) {

            // convert element to container
            if (!t.children.length && t.data && t.data.element) {
                var c = t.clone();
                t.data = { flex: 1};
                t.appendChild(c);
            }

            t.appendChild(params.child);
        }

        // convert child's parent to element (if necessary)
        _convertContainerToElement(p);

        state.selected = null;
    },

    appendChildAt(state, params) {
        var p = params.child.parent ? params.child.parent() : null;
        var t = state.root.findChildById(params.target.id);
        if (t) {
            t.appendChildAt(params.child, params.index);
        }

        // convert child's parent to element (if necessary)
        _convertContainerToElement(p);

        state.selected = null;
    },

    appendChildAfter(state, params) {
        var p = params.child.parent ? params.child.parent() : null;
        var t = state.root.findChildById(params.target.id);
        var s = state.root.findChildById(params.sibling.id);
        if (t && s) {
            t.appendChildAfter(params.child, s);
        }

        // convert child's parent to element (if necessary)
        _convertContainerToElement(p);

        state.selected = null;
    },

    removeChild(state, child) {
        var t = state.root.findChildById(child.id);
        if (t) {
            t.remove();
        }
        state.selected = null;
    }
};

mutations.restoreRoot = mutations.setRoot;

export default {
    name: 'tree',
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
