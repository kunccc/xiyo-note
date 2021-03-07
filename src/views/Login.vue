<template>
  <div id="login">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  msg = 'This is login page';
}
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>