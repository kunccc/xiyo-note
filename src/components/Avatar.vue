<template>
  <span :title="username">{{ slug }}</span>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import auth from '@/apis/auth';
import EventBus from '@/helpers/eventBus';

@Component
export default class Avatar extends Vue {
  username = 'visitor';

  created() {
    EventBus.$on('isLogin', data => this.username = data);
    auth.getInfo().then((res: { isLogin: boolean; data: { username: string } }) => {
      if (res.isLogin) this.username = res.data.username;
    });
  }

  get slug() {
    return this.username.charAt(0);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: $color-highlight;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>