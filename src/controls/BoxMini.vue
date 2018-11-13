<template>
  <div class="form-field">
    <div class="label form-label">{{property.title}}</div>

    <div class="b-p-b-15" v-for="(prop, idx) in properties" :key="idx">
    <div class="label form-label">{{prop.label}}</div>
    <div class="form-control">
      <input v-mask-box="prop.key" class="input" type="text" v-model="target[prop.key]" placeholder="-"/>
    </div>
    </div>

  </div>
</template>
<script>
import Box from './Box.js'
const box = Box()
box.props.properties = {
  type: Array,
  default: function() { return [ 
    { label: 'Margin Left', key: 'marginLeft' },
    { label: 'Margin Right', key: 'marginRight' },
    { label: 'Margin Top', key: 'marginTop' },
    { label: 'Margin Bottom', key: 'marginBottom' },
    { label: 'Padding Left', key: 'paddingLeft' },
    { label: 'Padding Right', key: 'paddingRight' },
    { label: 'Padding Top', key: 'paddingTop' },
    { label: 'Padding Bottom', key: 'paddingBottom' },
  ] }
}

box.name = 'form-control-box-min'
export default box
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
