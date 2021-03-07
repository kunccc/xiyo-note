<template>
  <div id="trash-detail">
    <h1>{{ msg }} : {{ $route.params.noteId }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class TrashDetail extends Vue {
  msg = '回收站笔记详情页';
}
</script>

<style lang="scss" scoped>
h1 {
  color: blue;
}
</style>