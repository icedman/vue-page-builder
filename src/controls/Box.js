import Vue from 'vue'
import { _ } from '../libs/lodash.js'

export default function() {
    return {
      name: 'form-control-box',

      props: {
        value: Object,
        property: Object
      },

      data () {
        return {
          target: (typeof this.value === 'object') ? this.value : {}
        }
      },

      watch: {
        target: {
          handler: function (newValue, oldValue) {
            this.$emit('input', newValue)
          },
          deep: true
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
          var model = node.data.directives.find(d => d.name === 'model').expression
          model = model.replace('target.', '')

          if (model.includes('[')) {
            model = node.data.directives.find(d => d.name === 'mask-box').value
          }

          var val = this.target[model]
          var suffix = 'px'
          var suffixes = ['%', 'px', 'pt', 'em', 'vw', 'vh', 'rem', 'ch', 'auto']
          suffixes.forEach(s => {
            if (val.indexOf(s) !== -1) {
              suffix = s
            }
          })
          val = val.replace(/[^\.0-9]/g, '')
          if (val != '') {
            val += suffix
          }
          if (suffix === 'auto') {
            val = suffix
          }
          this.target[model] = val
        }
      },

      mounted () {
        this.resizeBorders()
      },

      directives: {
        'mask-box': {
          bind: function (el, binding, vnode) {
            vnode._mask = _.debounce(function (event) {
              vnode.context.mask(vnode)
            }, 25)
            el.addEventListener('change', vnode._mask)
          },
          unbind: function (el, vnode) {
            el.removeEventListener('change', vnode._mask)
          }
        }
      }
    }
}