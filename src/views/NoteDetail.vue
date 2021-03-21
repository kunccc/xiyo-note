<template>
  <div id="note">
    <NoteSidebar/>
    <div class="noteDetail">
      <div class="noteBar">
        <span>创建时间：一天前 丨</span>
        <span>更新时间：刚刚 丨</span>
        <span>正在输入...</span>
        <Icon name="trash"/>
        <Icon name="magnify"/>
      </div>
      <div class="noteTitle">
        <input type="text" placeholder="输入标题">
      </div>
      <div class="editor">
        <textarea placeholder="输入内容，支持 markdown 语法">
        </textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Auth from '@/apis/auth';
import NoteSidebar from '@/components/NoteSidebar.vue';

@Component({
  components: {NoteSidebar}
})
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
#note {
  width: 100%;
  display: flex;
  background: #fff;
  overflow: hidden;
  .noteDetail {
    width: 100%;
    .noteBar {
      width: 100%;
      padding: 6px 22px;
      color: #999;
      box-shadow: 0 1.5px 1.5px rgba(0, 0, 0, 0.15);
      .icon {
        width: 20px;
        height: 20px;
        fill: #999;
        float: right;
        margin-left: 10px;
        cursor: pointer;
      }
      span {
        margin-right: 4px;
      }
    }
    .noteTitle {
      input {
        border: none;
        outline: none;
        font-size: 20px;
        margin: 20px 22px;
      }
    }
    .editor {
      height: 100%;
      textarea {
        border: none;
        outline: none;
        resize: none;
        width: 100%;
        height: 100%;
        font-size: 16px;
        padding: 20px 22px;
      }
    }
  }
}
</style>