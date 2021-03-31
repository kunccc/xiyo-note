<template>
  <div id="sidebar" v-if="isLogin">
    <Avatar/>
    <div class="link">
      <router-link to="/note" title="笔记">
        <Icon name="detail"/>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <Icon name="notebook" class="notebook"/>
      </router-link>
      <router-link to="/trash" title="回收站">
        <Icon name="delete" class="delete"/>
      </router-link>
    </div>
    <div class="logout" title="退出登录" @click="onLogout">
      <Icon name="backto" class="backto"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import Avatar from '@/components/Avatar.vue';
import {mapActions} from 'vuex';

@Component({
  components: {Avatar},
  methods: {...mapActions(['logout']),},
})
export default class Sidebar extends Vue {
  isLogin = this.$route.path !== '/login';
  logout!: Function;

  @Watch('$route')
  onRouterChanged() {
    this.isLogin = this.$route.path !== '/login';
  }

  onLogout() {
    this.$confirm('您确定要退出登录吗').then(() => {
      this.logout().then(() => {
        this.$router.replace('/login');
      });
    });
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
  .icon {
    width: 28px;
    height: 32px;
    fill: #fff;
    &.notebook {
      transform: scale(.72);
    }
    &.delete {
      transform: scale(.92);
    }
    &.backto {
      transform: scale(.76);
    }
  }
}
</style>