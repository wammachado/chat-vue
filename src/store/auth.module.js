import AuthService from '@/services/auth.service';
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {

      return AuthService.login(user).then(
        user => {
          if (!user.error) {
            commit('loginSuccess', user);

            return Promise.resolve(user);
          } else {
            commit('loginFailure');
            return Promise.reject(user);
          }
          return Promise.reject(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      return AuthService.logout().then(
        response => {
          commit('logoutSuccess');
          return Promise.resolve(response);
        },
        error => {
          commit('logoutFailure');
          return Promise.reject(error);
        }
      );
    },

    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logoutSuccess(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logoutFailure(state) {
      state.status.loggedIn = true;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};