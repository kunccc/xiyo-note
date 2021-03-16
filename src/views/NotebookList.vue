<template>
  <div id="notebookList">
    <h1>{{ msg }}</h1>
    <ul>
      <li>
        <router-link to="/note/1">笔记本1</router-link>
      </li>
      <li>
        <router-link to="/note/2">笔记本2</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Auth from '@/apis/auth';

@Component
export default class NotebookList extends Vue {
  msg = '笔记本列表';

  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) this.$router.push('/login');
    });
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>