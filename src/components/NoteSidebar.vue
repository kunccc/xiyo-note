<template>
  <div class="note-sidebar">
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ curBook.title }}
        <i class="el-icon-arrow-down"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id" :key="notebooks.indexOf(notebook)">
          {{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <div class="menu">
      <div class="time">更新时间</div>
      <div class="title">标题</div>
    </div>
    <ul class="notebook">
      <li v-for="note in notebook" :key="notebook.indexOf(note)">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.friendlyUpdatedAt }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {mapGetters, mapActions, mapMutations} from 'vuex';

@Component({
  methods: {
    ...mapActions([
      'getNotebooks',
      'getNotebook',
      'addNote'
    ]),
    ...mapMutations([
      'setCurBook',
      'setCurNote'
    ])
  },
  computed: {
    ...mapGetters([
      'notebooks',
      'notebook',
      'curBook',
      'curNote'
    ])
  }
})
export default class NoteSidebar extends Vue {
  notebooks!: [];
  notebook!: {};
  curBook!: { id: number; title: string };
  curNote!: { id: number };
  getNotebooks!: Function;
  getNotebook!: Function;
  addNote!: Function;
  setCurBook!: Function;
  setCurNote!: Function;

  created() {
    this.getNotebooks().then(() => {
      this.setCurBook({curBookId: parseInt(this.$route.query.notebookId as string)});
      return this.getNotebook({notebookId: this.curBook.id});
    }).then(() => {
      this.setCurNote({curNoteId: parseInt(this.$route.query.noteId as string)});
      if (!this.$route.query.noteId) {
        this.$router.replace({
          path: '/note',
          query: {
            noteId: (this.curNote.id).toString(),
            notebookId: (this.curBook.id).toString()
          }
        });
      }
    });
  }

  handleCommand(notebookId: number | string) {
    if (notebookId === 'trash') {
      return this.$router.push('trash');
    }
    this.setCurBook({curBookId: notebookId});
    this.getNotebook({notebookId}).then(() => {
      this.setCurNote({});
      this.$router.replace({
        path: '/note',
        query: {
          noteId: (this.curNote.id).toString(),
          notebookId: (this.curBook.id).toString()
        }
      });
    });
  }

  onAddNote() {
    this.addNote({notebookId: this.curBook.id});
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.note-sidebar {
  width: 400px;
  background: #eee;
  position: relative;
  border-right: 1px solid #ccc;
  > .notebook-title {
    width: 100%;
    text-align: center;
    padding: 10px 0;
    color: #333;
    background-color: #f7f7f7;
    > .el-dropdown-link {
      cursor: pointer;
      font-size: 20px;
    }
  }
  > .add-note {
    position: absolute;
    top: 12px;
    right: 8px;
    box-shadow: 0 0 2px 0 #ccc;
    border: none;
    z-index: 1;
  }
  > .menu {
    display: flex;
    font-size: 13px;
    font-weight: bold;
    color: #333;
    > div {
      width: 50%;
      padding: 4px 10px;
      &.time {
        border: 1px solid #aaa;
        border-left: none;
      }
      &.title {
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
      }
    }
  }
  > .notebook {
    > li {
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
</style>