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
          <span @click="onDeleteNote">
            <Icon name="trash"/>
          </span>
          <span @click="isShowPreview = !isShowPreview">
            <Icon name="magnify"/>
          </span>
        </div>
        <div class="noteTitle">
          <input type="text" v-model="curNote.title" @input="onUpdateNote" @keydown="status = '正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @input="onUpdateNote"
                    @keydown="status = '正在输入...'"
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
import NoteSidebar from '@/components/NoteSidebar.vue';
import {Route} from 'vue-router';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import {mapActions, mapGetters, mapMutations} from 'vuex';

const md = new MarkdownIt();

@Component({
  components: {NoteSidebar},
  computed: {
    ...mapGetters([
      'notebook',
      'curNote'
    ])
  },
  methods: {
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),
    ...mapMutations([
      'setCurNote'
    ])
  }
})
export default class NoteDetail extends Vue {
  curNote!: { id: number; title: string; content: string };
  notebook!: [];
  status = '已保存';
  isShowPreview = false;
  onUpdateNote!: Function;
  updateNote!: Function;
  deleteNote!: Function;
  setCurNote!: Function;
  checkLogin!: Function;

  @Watch('$route', {immediate: true})
  onRouteChanged(route: Route) {
    this.setCurNote({curNoteId: route.query.noteId});
  }

  created() {
    this.checkLogin('/login');
    this.onUpdateNote = _.debounce(() => {
      this.updateNote({noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content})
        .then(() => {this.status = '已保存';})
        .catch(() => {this.status = '保存出错';});
    }, 500);
  }

  onDeleteNote() {
    this.$confirm('您确定要删除当前笔记吗？').then(() => {
      this.deleteNote({noteId: this.curNote.id})
        .then(() => {
          this.$router.replace('/note');
        });
    });
  }

  get previewContent() {
    return md.render(this.curNote.content || '');
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
      .markdown {
        padding: 20px 22px;
      }
    }
  }
}
</style>