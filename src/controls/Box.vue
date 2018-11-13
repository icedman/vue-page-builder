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
              <input v-mask-box class="input" type="text" v-model="target.marginTop" placeholder="-" />
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
              <input v-mask-box class="input" type="text" v-model="target.borderTop" placeholder="-" />
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
              <input v-mask-box class="input" type="text" v-model="target.paddingTop" placeholder="-" />
            </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>

          </tr>

          <tr>

            <td>
              <input v-mask-box class="input" type="text" v-model="target.marginLeft" placeholder="-" />
            </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="target.borderLeft" placeholder="-" />
            </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="target.paddingLeft" placeholder="-" />
            </td>
            <td> <img src="/static/icons/custom.svg" /> </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="target.paddingRight" placeholder="-" />
            </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="target.borderRight" placeholder="-" />
            </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="target.marginRight" placeholder="-" />
            </td>

          </tr>

          <tr>

            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td class="spacer"> # </td>
            <td>
              <input v-mask-box class="input" type="text" v-model="target.paddingBottom" placeholder="-" />
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
              <input v-mask-box class="input" type="text" v-model="target.borderBottom" placeholder="-" />
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
              <input v-mask-box class="input" type="text" v-model="target.marginBottom" placeholder="-" />
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
import Box from './Box.js'
export default Box()
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
