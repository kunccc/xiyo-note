import Auth from '@/apis/auth';
import {ActionTree} from 'vuex';
import router from '@/router';

const state = {
  user: null
};
const getters = {
  username: (state: { user: { username: string } }) => state.user === null ? '未登录' : state.user.username,
  slug: (state: { user: { username: string } }) => state.user === null ? '未' : state.user.username.charAt(0)
};
const mutations = {
  setUser(state: { user: {} }, payload: { user: {} }) {
    state.user = payload.user;
  }
};
const actions: ActionTree<Function, {}> = {
  loginUser({commit}, {username, password}) {
    return Auth.login({username, password}).then((res: { data: {} }) => {
      commit('setUser', {user: res.data});
    });
  },
  registerUser({commit}, {username, password}) {
    return Auth.register({username, password}).then((res: { data: {} }) => {
      commit('setUser', {user: res.data});
    });
  },
  checkLogin({commit}, path) {
    return Auth.getInfo().then((res: { isLogin: boolean; data: { username: string } }) => {
      if (!res.isLogin) router.push(path);
      else commit('setUser', {user: res.data});
    });
  }
};
export default {state, getters, mutations, actions};