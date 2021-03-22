<template>
  <div id="note">
    <NoteSidebar @update:notebook="val => notebook = val"/>
    <div class="noteDetail">
      <div class="empty" v-show="!curNote.id">请选择笔记</div>
      <div v-show="curNote.id">
        <div class="noteBar">
          <span>创建时间：{{ curNote.friendlyCreatedAt }} 丨</span>
          <span>更新时间：{{ curNote.friendlyUpdatedAt }} 丨</span>
          <span>{{ curNote.statusText }}</span>
          <Icon name="trash"/>
          <Icon name="magnify"/>
        </div>
        <div class="noteTitle">
          <input type="text" v-model="curNote.title" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="true" v-model="curNote.content" placeholder="输入内容，支持 markdown 语法"/>
          <div class="markdown" v-show="false"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import Auth from '@/apis/auth';
import NoteSidebar from '@/components/NoteSidebar.vue';
import {Route} from 'vue-router';
import EventBus from '@/helpers/eventBus';

@Component({
  components: {NoteSidebar}
})
export default class NoteDetail extends Vue {
  curNote = {};
  notebook = [];

  created() {
    Auth.getInfo().then((res: { isLogin: boolean }) => {
      if (!res.isLogin) this.$router.push('/login');
    });
    EventBus.$once('update:notebook', (val: []) => {
      const id = parseInt(this.$route.query.noteId as string);
      this.curNote = val.find((note: { id: number }) => note.id === id) || {};
    });
  }

  @Watch('$route', {immediate: true})
  onRouteChanged(route: Route) {
    const id = parseInt(route.query.noteId as string);
    this.curNote = this.notebook.find((note: { id: number }) => note.id === id) || {};
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
    .empty {
      font-size: 50px;
      color: #ccc;
      text-align: center;
      margin-top: 100px;
    }
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
        font-family: 'Monaco', courier, monospace;
      }
    }
  }
}
</style>