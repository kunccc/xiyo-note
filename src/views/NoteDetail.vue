<template>
  <div id="note">
    <NoteSidebar @update:notebook="val => notebook = val"/>
    <div class="noteDetail">
      <div class="empty" v-show="!curNote.id">请选择笔记</div>
      <div v-show="curNote.id" class="wrapper">
        <div class="noteBar">
          <span>创建时间：{{ curNote.friendlyCreatedAt }} 丨</span>
          <span>更新时间：{{ curNote.friendlyUpdatedAt }} 丨</span>
          <span>{{ status }}</span>
          <span @click="deleteNote">
            <Icon name="trash"/>
          </span>
          <span @click="isShowPreview = !isShowPreview">
            <Icon name="magnify"/>
          </span>
        </div>
        <div class="noteTitle">
          <input type="text" v-model="curNote.title" @input="updateNote" @keydown="status = '正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @input="updateNote" @keydown="status = '正在输入...'"
                    placeholder="输入内容，支持 markdown 语法"/>
          <div class="markdown" v-show="isShowPreview" v-html="previewContent"/>
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
import Notes from '@/apis/notes';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

@Component({
  components: {NoteSidebar}
})
export default class NoteDetail extends Vue {
  curNote = {id: 0, title: '', content: ''};
  notebook = [{id: 0, title: '', content: ''}];
  status = '已保存';
  isShowPreview = false;
  updateNote = () => console.log('hi');

  @Watch('$route', {immediate: true})
  onRouteChanged(route: Route) {
    const id = parseInt(route.query.noteId as string);
    this.curNote = this.notebook.find((note: { id: number }) => note.id === id) || {id: 0, title: '', content: ''};
  }

  created() {
    Auth.getInfo().then((res: { isLogin: boolean }) => {
      if (!res.isLogin) this.$router.push('/login');
    });
    EventBus.$once('update:notebook', (val: []) => {
      const id = parseInt(this.$route.query.noteId as string);
      this.curNote = val.find((note: { id: number }) => note.id === id) || {id: 0, title: '', content: ''};
    });
    this.updateNote = _.debounce(() => {
      Notes.updateNote(this.curNote.id, this.curNote.title, this.curNote.content)
          .then(() => {this.status = '已保存';});
    }, 1000);
  }

  deleteNote() {
    this.$confirm('您确定要删除当前笔记吗？').then(() => {
      Notes.deleteNote(this.curNote.id)
          .then((res: { msg: string }) => {
            this.$message.success(res.msg);
            this.notebook.splice(this.notebook.indexOf(this.curNote), 1);
            this.$router.replace('/note');
          });
    });
  }

  get previewContent() {
    return md.render(this.curNote.content);
  }
}
</script>

<style lang="scss" scoped>
#note {
  display: flex;
  flex: 1;
  background: #fff;
  overflow: hidden;
  .noteDetail {
    width: 100%;
    .wrapper {
      height: 100%;
    }
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