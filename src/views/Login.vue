<template>
  <div id="login">
    <div class="mask">
      <div class="wrapper">
        <div class="container">
          <div class="main"></div>
          <div class="form">
            <h3 @click="showRegister">创建账户</h3>
            <div :class="{show: isShowRegister}" class="register">
              <input type="text" v-model="register.username" placeholder="用户名">
              <input type="password" v-model="register.password" @keyup.enter="onRegister" placeholder="密码">
              <p :class="{error: register.isError}">{{ register.notice }}</p>
              <div class="button" @click="onRegister">创建账号</div>
            </div>
            <h3 @click="showLogin">登录</h3>
            <div :class="{show: isShowLogin}" class="login">
              <input type="text" v-model="login.username" placeholder="输入用户名">
              <input type="password" v-model="login.password" @keyup.enter="onLogin" placeholder="密码">
              <p :class="{error: login.isError}">{{ login.notice }}</p>
              <div class="button" @click="onLogin">登录</div>
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

const request = require('@/helpers/request.js').default;
request('/auth/login', 'post', {
  username: 'hunger', password: '12345dsa'
}).then((data: {}) => {console.log(data);});

@Component
export default class Login extends Vue {
  isShowLogin = true;
  isShowRegister = false;
  login = {
    username: '',
    password: '',
    notice: '输入用户名和密码',
    isError: false
  };
  register = {
    username: '',
    password: '',
    notice: '创建账号后，请记住用户名和密码',
    isError: false
  };

  showLogin() {
    this.isShowLogin = true;
    this.isShowRegister = false;
  }

  showRegister() {
    this.isShowLogin = false;
    this.isShowRegister = true;
  }

  onRegister() {
    if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)) {
      this.register.isError = true;
      this.register.notice = '用户名 3~15 个字符，仅限于字母数字下划线中文';
      return;
    }
    if (!/^.{6,16}$/.test(this.register.password)) {
      this.register.isError = true;
      this.register.notice = '密码长度为 6~16 个字符';
      return;
    }
    this.register.isError = false;
    this.register.notice = '';
    console.log(`start register..., username: ${this.register.username} , password: ${this.register.password}`);
  }

  onLogin() {
    if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)) {
      this.login.isError = true;
      this.login.notice = '用户名 3~15 个字符，仅限于字母数字下划线中文';
      return;
    }
    if (!/^.{6,16}$/.test(this.login.password)) {
      this.login.isError = true;
      this.login.notice = '密码长度为 6~16 个字符';
      return;
    }
    this.login.isError = false;
    this.login.notice = '';
    console.log(`start login..., username: ${this.login.username} , password: ${this.login.password}`);
  }
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
        overflow: hidden;
        > h3 {
          padding: 10px 20px;
          margin-top: -1;
          font-weight: normal;
          font-size: 16px;
          cursor: pointer;
        }
        > .login, .register {
          padding: 0 20px;
          border-top: 1px solid #eee;
          height: 0;
          overflow: hidden;
          transition: height .4s;
          &.show {
            height: 193px;
          }
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
          > p {
            font-size: 12px;
            margin-top: 10px;
            color: #444;
            &.error {
              color: red;
            }
          }
        }
      }
    }
  }
}
</style>