<template>
  <div id="login">
    <div class="mask">
      <div class="wrapper">
        <div class="container">
          <div class="main"></div>
          <div class="form">
            <h3>创建账户</h3>
            <div v-show="true" class="register">
              <input type="text" placeholder="用户名">
              <input type="password" placeholder="密码">
              <div class="button">创建账号</div>
            </div>
            <h3>登录</h3>
            <div v-show="false" class="login">
              <input type="text" placeholder="输入用户名">
              <input type="password" placeholder="密码">
              <div class="button">登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Login extends Vue {
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
  > .wrapper {
    display: table-cell;
    vertical-align: middle;
    > .container {
      width: 800px;
      height: 500px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      display: flex;
      > .main {
        flex: 1;
        background: $color-highlight url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat;
        background-size: contain;
      }
      > .form {
        width: 270px;
        border-left: 1px solid #ccc;
        > h3 {
          padding: 10px 20px;
          font-weight: normal;
          font-size: 16px;
          border-top: 1px solid #eee;
          cursor: pointer;
        }
        > .login, .register {
          padding: 10px 20px;
          border-top: 1px solid #eee;
          > input {
            display: block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding: 0 6px;
            border-radius: 4px;
            border: 1px solid #ccc;
            outline: none;
            font-size: 14px;
            margin-top: 10px;
            &:focus {
              border: 3px solid #9dcaf8;
            }
          }
          &:nth-of-type(2) {
            border-bottom: 1px solid #eee;
          }
          > .button {
            background: $color-highlight;
            height: 36px;
            line-height: 36px;
            text-align: center;
            font-weight: bold;
            color: #fff;
            border-radius: 4px;
            margin-top: 18px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>