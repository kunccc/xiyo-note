<template>
  <div id="app">
    <Sidebar/>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Sidebar from '@/components/Sidebar'
@Component({
  components: {Sidebar}
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "~@/assets/styles/reset.scss";
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #eee;
}

.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  box-shadow: 0 0 2px 0 #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
}

#app {
  display: flex;
  align-items: stretch;
}
</style>