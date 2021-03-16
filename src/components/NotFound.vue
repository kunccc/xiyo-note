<template>
  <div>
    路径错误
    <button @click="redirect">点击返回</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {
  redirect() {
    this.$router.push('/login');
  }
}
</script>

<style lang="scss" scoped>

</style>