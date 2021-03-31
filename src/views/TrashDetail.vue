<template>
  <div id="trash">
    <div class="trashSidebar">
      <h3 class="notebookTitle">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="trashNotes">
        <li v-for="note in trashNotes" :key="trashNotes.indexOf(note)">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="data">{{ note.friendlyUpdatedAt }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="noteDetail" v-if="curTrashNote.id">
      <div class="noteBar" v-if="true">
        <span>创建时间：{{ curTrashNote.friendlyCreatedAt }} 丨</span>
        <span>更新时间：{{ curTrashNote.friendlyUpdatedAt }} 丨</span>
        <span>所属笔记本：{{ belongTo }}</span>
        <a class="action" @click="onRevert">恢复</a>
        <a class="action" @click="onDelete">彻底删除</a>
      </div>
      <div class="noteTitle">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown" v-html="compiledMarkdown"></div>
      </div>
    </div>
    <div class="empty" v-if="!curTrashNote.id">回收站暂无笔记</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import MarkdownIt from 'markdown-it';
import {mapActions, mapGetters, mapMutations} from 'vuex';
import {Route} from 'vue-router';

const md = new MarkdownIt();

@Component({
  methods: {
    ...mapActions([
      'checkLogin',
      'deleteTrashNote',
      'revertTrashNote',
      'getTrashNotes',
      'getNotebooks'
    ]),
    ...mapMutations([
      'setCurTrashNote'
    ])
  },
  computed: {
    ...mapGetters([
      'curTrashNote',
      'trashNotes',
      'belongTo'
    ])
  }
})
export default class TrashDetail extends Vue {
  curTrashNote!: { id: number; content: string; friendlyCreatedAt: string; friendlyUpdatedAt: string; title: string };
  checkLogin!: Function;
  deleteTrashNote!: Function;
  revertTrashNote!: Function;
  getTrashNotes!: Function;
  setCurTrashNote!: Function;
  getNotebooks!: Function;

  @Watch('$route')
  onRouteChanged(route: Route) {
    this.setCurTrashNote({noteId: route.query.noteId});
  }

  created() {
    this.checkLogin();
    this.getNotebooks();
    this.getTrashNotes().then(() => {
      this.setCurTrashNote({noteId: this.$route.query.noteId});
      if (!this.$route.query.noteId) {
        this.$router.replace({
          path: 'trash',
          query: {noteId: (this.curTrashNote.id).toString()}
        });
      }
    });
  }

  onRevert() {
    this.revertTrashNote({noteId: this.curTrashNote.id}).then(() => {
      this.setCurTrashNote();
      this.$router.replace({
        path: '/trash',
        query: {noteId: (this.curTrashNote.id).toString()}
      });
    });
  }

  onDelete() {
    this.$confirm('删除后将无法恢复，确定删除吗？').then(() => {
      this.deleteTrashNote({noteId: this.curTrashNote.id}).then(() => {
        this.setCurTrashNote();
        this.$router.replace({
          path: '/trash',
          query: {noteId: (this.curTrashNote.id).toString()}
        });
      });
    });
  }

  get compiledMarkdown() {
    return md.render(this.curTrashNote.content || '');
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
#trash {
  display: flex;
  flex: 1;
  overflow: hidden;
  .trashSidebar {
    width: 400px;
    border-right: 1px solid #ccc;
    .notebookTitle {
      font-size: 20px;
      font-weight: normal;
      text-align: center;
      padding: 10px 0;
      color: #333;
      background-color: #f7f7f7;
    }
    .menu {
      display: flex;
      font-size: 13px;
      font-weight: bold;
      color: #333;
      div {
        width: 50%;
        padding: 4px 10px;
        &:nth-child(1) {
          border: 1px solid #aaa;
          border-left: none;
        }
        &:nth-child(2) {
          border-top: 1px solid #aaa;
          border-bottom: 1px solid #aaa;
        }
      }
    }
    .trashNotes {
      li {
        &:nth-child(odd) {
          background: #f2f2f2;
        }
        a {
          display: flex;
          font-size: 14px;
          border: 2px solid transparent;
        }
        .router-link-exact-active {
          border: 2px solid $color-highlight;
          border-radius: 3px;
        }
        span {
          flex: 1;
          padding: 5px 10px;
        }
      }
    }
  }
  .noteDetail {
    width: 100%;
    background: #fff;
    .noteBar {
      padding: 6px 22px;
      color: #999;
      box-shadow: 0 1.5px 1.5px rgba(0, 0, 0, 0.15);
    }
    span {
      margin-right: 4px;
    }
    .action {
      color: #666;
      font-size: 12px;
      padding: 2px 6px;
      background-color: #fff;
      box-shadow: 0 0 2px 0 #ccc;
      border: none;
      cursor: pointer;
      display: inline-block;
      float: right;
      margin-left: 12px;
    }
    .noteTitle {
      font-size: 20px;
      margin: 20px 22px;
    }
    .editor {
      height: 100%;
      font-size: 16px;
      padding: 20px 22px;
      font-family: 'Monaco', courier, monospace;
    }
  }
  .empty {
    width: 100%;
    font-size: 50px;
    color: #ccc;
    text-align: center;
    margin-top: 100px;
  }
}
</style>