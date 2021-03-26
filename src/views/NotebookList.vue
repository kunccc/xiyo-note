<template>
  <div id="notebookList">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate">
        <Icon name="add"/>
        新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="bookList">
          <router-link v-for="notebook in notebooks" :to="`/note?notebookId=${notebook.id}`" class="notebook"
                       :key="notebooks.indexOf(notebook)">
            <div>
              <Icon name="notebook"/>
              {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Auth from '@/apis/auth';
import {mapActions} from 'vuex';

@Component({
  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook'
    ])
  }
})
export default class NotebookList extends Vue {
  get notebooks() {
    return this.$store.getters.notebooks;
  }

  created() {
    Auth.getInfo().then((res: { isLogin: boolean }) => {
      if (!res.isLogin) this.$router.push('/login');
    });
    this.$store.dispatch('getNotebooks');
  }

  onCreate() {
    this.$prompt('请输入笔记本标题', '创建笔记本', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^.{1,30}$/,
      inputErrorMessage: '标题不能为空，且不超过30个字符'
    }).then(({value}) => {
      this.addNotebook({title: value});
    });
  }

  onEdit(notebook: { title: string; id: string }) {
    this.$prompt('请输入笔记本标题', '修改笔记本', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^.{1,30}$/,
      inputValue: notebook.title,
      inputErrorMessage: '标题不能为空，且不超过30个字符'
    }).then(({value}) => {
      this.updateNotebook({notebookId: notebook.id, title: value});
    });
  }

  onDelete(notebook: { id: string }) {
    this.$confirm('您确定要删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.deleteNotebook({notebookId: notebook.id});
    });
  }
}
</script>

<style lang="scss" scoped>
#notebookList {
  flex: 1;
  .icon {
    width: 18px;
    height: 18px;
    fill: #5e6266;
    margin-right: 4px;
  }
  .btn {
    display: flex;
    align-items: center;
    width: 96px;
    color: #666;
    cursor: pointer;
    margin-left: 10px;
  }
  input {
    width: 300px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px 5px;
    outline: none;
  }
  header {
    padding: 12px;
    border-bottom: 1px solid #ccc;
  }
  .layout {
    max-width: 966px;
    margin: 0 auto
  }
  main {
    padding: 30px 40px;
    h3 {
      font-size: 12px;
      color: #000;
    }
    .bookList {
      margin-top: 10px;
      font-size: 14px;
      color: #666;
      background: #fff;
      border-radius: 4px;
      font-weight: bold;
      span {
        font-size: 12px;
        color: #b3c0c8;
      }
    }
    .date, .action {
      float: right;
      margin-right: 10px;
    }
    .notebook {
      display: block;
      cursor: pointer;
      div {
        line-height: 3em;
        border-bottom: 1px solid #ebebeb;
      }
      .icon {
        margin: 4.8px 0 -4.8px 10px;
        transform: scale(.7);
      }
    }
    a.notebook:hover {
      background: #f7fafd;
    }
    .errorMsg {
      font-size: 12px;
      color: red;
    }
  }
}
</style>