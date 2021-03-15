<template>
  <div id="sidebar">
    <Avatar/>
    <div class="link">
      <router-link to="/note/1" title="笔记">
        <Icon name="detail"/>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <Icon name="notebook"/>
      </router-link>
      <router-link to="/trash/2" title="回收站">
        <Icon name="delete"/>
      </router-link>
    </div>
    <div class="logout" @click="logout">
      <Icon name="backto"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Avatar from '@/components/Avatar.vue';

import auth from '@/apis/auth';

@Component({
  components: {Avatar}
})
export default class Sidebar extends Vue {
  logout() {
    auth.logout().then((info: string) => {console.log(info);});
  }
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