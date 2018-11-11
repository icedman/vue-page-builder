<template>
  <div class="form-field">
    <div class="label form-label">{{property.title}}</div>
    <div class="form-control">

      <div class="boxOut">
        <div id="box1"></div>
        <div id="box2"></div>
        <div id="box3"></div>
        <table class="box-sizing">
          <tr>

            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td> <span class="box-title">margin</span> </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="value.marginTop" placeholder="-" />
            </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>

          </tr>

          <tr>

            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td> <span class="box-title">border</span> </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="value.borderTop" placeholder="-" />
            </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>

          </tr>

          <tr>

            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td> <span class="box-title">padding</span> </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="value.paddingTop" placeholder="-" />
            </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>

          </tr>

          <tr>

            <td>
              <input v-mask-box class="input" type="text" v-model="value.marginLeft" placeholder="-" />
            </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="value.borderLeft" placeholder="-" />
            </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="value.paddingLeft" placeholder="-" />
            </td>
            <td> <img src="/static/icons/custom.svg" /> </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="value.paddingRight" placeholder="-" />
            </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="value.borderRight" placeholder="-" />
            </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="value.marginRight" placeholder="-" />
            </td>

          </tr>

          <tr>

            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="value.paddingBottom" placeholder="-" />
            </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>

          </tr>

          <tr>

            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="value.borderBottom" placeholder="-" />
            </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>

          </tr>

          <tr>

            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="value.marginBottom" placeholder="-" />
            </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>

          </tr>

        </table>
      </div>

    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { _ } from '../libs/lodash.js'

export default {
  name: 'form-control-box',

  props: {
    node: Object,
    property: Object
  },

  data () {
    return {
      value: {}
    }
  },

  methods: {
    resizeBorders () {
      // resize boxes
      var boxOut = document.querySelector('.boxOut')
      var box = document.querySelector('#box1')
      if (!boxOut || !box) {
        return
      }
      var ww = boxOut.offsetWidth / 7 / 2
      var hh = boxOut.offsetHeight / 7 / 2

      if (!ww || !hh) {
        setTimeout(() => {
          this.resizeBorders()
        }, 500)
        return
      }

      for (var i = 1; i < 4; i++) {
        var box = document.querySelector(`#box${i}`)
        var w = boxOut.offsetWidth
        var h = boxOut.offsetHeight
        var offsetX = ww + ww * ((i - 1) * 2)
        var offsetY = hh + hh * ((i - 1) * 2)
        w -= offsetX * 2
        h -= offsetY * 2
        box.style.left = offsetX + 'px'
        box.style.top = offsetY + 'px'
        box.style.width = w + 'px'
        box.style.height = h + 'px'
        box.style.opacity = '1'
      }
    },

    mask (node) {
      var model = node.data.directives.find(d => d.name == 'model').expression
      model = model.replace('value.', '')

      var val = this.value[model]
      var suffix = 'px'
      var suffixes = ['%', 'px', 'pt', 'em', 'vw', 'vh', 'rem', 'ch', 'auto']
      suffixes.forEach(s => {
        if (val.indexOf(s) != -1) {
          suffix = s
        }
      })
      val = val.replace(/[^\.0-9]/g, '')
      if (val != '') {
        val += suffix
      }
      if (suffix == 'auto') {
        val = suffix
      }
      this.value[model] = val
    }
  },

  mounted () {
    this.value = this.node.data[this.property.name]
    if (typeof this.value !== 'object') {
      this.value = {}
    }
    this.resizeBorders()
  },

  directives: {
    'mask-box': {
      bind: function (el, binding, vnode) {
        vnode._mask = _.debounce(function (event) {
          vnode.context.mask(vnode)
        }, 250)
        el.addEventListener('change', vnode._mask)
      },
      unbind: function (el, vnode) {
        el.removeEventListener('change', vnode._mask)
      }
    }
  }
}
</script>

<style>
table.box-sizing td {
  padding: 6px;
  padding-left: 8px;
  padding-right: 8px;
  max-width: 68px;
  text-align: center;
  vertical-align: middle;
}

table.box-sizing td img {
  opacity: 0.05;
}

table.box-sizing td span.box-title {
  position: relative;
  background-color: white;
  padding: 2px;
  display: inline-flex;
  /*display: none;*/
}

table.box-sizing td.spacer {
  visibility: hidden;
}

table.box-sizing input {
  font-size: 10pt;
}

.boxOut {
  /*border: 2px solid red;*/
  display: inline-block;
  padding: 0px;
  margin: 0px;
  position: relative;
}

#box1,
#box2,
#box3 {
  display: inline-block;
  border: 1px dashed rgba(50, 50, 50, 0.25);
  position: absolute;
  top: 0px;
  left: 0px;
  min-height: 40px;
  min-width: 40px;
  opacity: 0;
  /*z-index: 0;*/
}
</style>
