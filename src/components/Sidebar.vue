<template>
  <div id="sidebar">
    <div class="link">
      <router-link to="/note/1" title="笔记">笔记</router-link>
      <router-link to="/notebooks" title="笔记本">笔记本</router-link>
      <router-link to="/trash/2" title="回收站">回收站</router-link>
    </div>
    <div class="logout">
      返回
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Sidebar extends Vue {

}
</script>

<style lang="scss" scoped>
#sidebar {
  position: relative;
  width: 56px;
  height: 100vh;
  text-align: center;
  background: #2c333c;
  > .link {
    margin-top: 15px;
    > a {
      padding: 6px 0;
      display: block;
    }
    & .router-link-active {
      background: #5e6266;
    }
  }
  > .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    cursor: pointer;
  }
}
</style>