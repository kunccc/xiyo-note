<template>
  <div id="note-detail">
    <h1>notebookId : {{ $route.query.notebookId }}</h1>
    <h1>noteId : {{ $route.query.noteId }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Auth from '@/apis/auth';

@Component
export default class NoteDetail extends Vue {
  msg = '笔记详情页';

  created() {
    Auth.getInfo().then((res: { isLogin: boolean }) => {
      if (!res.isLogin) this.$router.push('/login');
    });
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: blue;
}
</style>