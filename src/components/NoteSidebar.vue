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
    <span class="btn add-note" @click="addNote">添加笔记</span>
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
import Notebooks from '@/apis/notebooks';
import Notes from '@/apis/notes';
import EventBus from '@/helpers/eventBus';

@Component
export default class NoteSidebar extends Vue {
  notebooks = [{id: 0}];
  notebook = [{}];
  curBook = {id: 0};

  created() {
    Notebooks.getAll().then((res: BookList) => {
      this.notebooks = res.data;
      this.curBook = res.data.find(notebook => notebook.id.toString() === this.$route.query.notebookId) || res.data[0] || {};
      return Notes.getAll(this.curBook.id);
    }).then(res => {
      this.notebook = res.data;
      this.$emit('update:notebook', this.notebook);
      EventBus.$emit('update:notebook', this.notebook);
    });
  }

  handleCommand(notebookId: number | string) {
    if (notebookId === 'trash') {
      return this.$router.push('trash');
    }
    const book = this.notebooks.find(notebook => notebook.id === notebookId);
    if (book !== undefined) this.curBook = book;
    if (typeof (notebookId) === 'number') {
      Notes.getAll(notebookId).then(res => {
        this.notebook = res.data;
        this.$emit('update:notebook', this.notebook);
      });
    }
  }

  addNote() {
    Notes.addNote(this.curBook.id).then(res => {
      this.$message.success(res.msg);
      this.notebook.unshift(res.data);
    });
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