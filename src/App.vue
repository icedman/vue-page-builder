<template>
  <div id="app">
    <nav-bar></nav-bar>
    <editor></editor>
  </div>
</template>

<script>
import Editor from './Editor'
import Navbar from './Navbar'

export default {
  name: 'app',

  data () {
    return {}
  },

  computed: {},

  methods: {},

  mounted () {},

  components: {
    editor: Editor,
    'nav-bar': Navbar
  }
}
</script>

<style lang="scss">
$sizes: (0,5,10,15,20,25,30,35,40);
$positions: ('top': 't','left': 'l','bottom': 'b','right': 'r');

@each $size in $sizes {
  .b-m-#{$size} {
    margin: $size + px;
  }
  .b-p-#{$size} {
    padding: $size + px;
  }
  @each $position in $positions {
    .b-m-#{nth($position, 2)}-#{$size} {
      margin-#{nth($position, 1)}: $size + px;
    }
    .b-p-#{nth($position, 2)}-#{$size} {
      padding-#{nth($position, 1)}: $size + px;
    }
  }
}

</style>
