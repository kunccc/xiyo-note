const request = require('@/helpers/request.js').default;

const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: 'auth'
};
type data = {
  username: string;
  password: string;
}
export default {
  register({username, password}: data) {
    return request(URL.REGISTER, 'POST', {username, password});
  },
  login({username, password}: data) {
    return request(URL.LOGIN, 'POST', {username, password});
  },
  logout() {
    return request(URL.LOGOUT);
  },
  getInfo() {
    return request(URL.GET_INFO);
  }
};