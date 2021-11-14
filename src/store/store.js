import Vue from 'vue';
import Vuex from 'vuex';
import router from '../routes';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLoggedIn: false
    },
    getters: {
        loginState: (state) => {
            return state.isLoggedIn;
        }
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true;
            if (router.currentRoute.name === 'SignIn') {
                router.push('/');
            }
        },
        logout(state) {
            state.isLoggedIn = false;
            Vue.$cookies.remove('access_token');
            localStorage.removeItem('expiresIn');

            router.push('/signin');
        }
    },
    actions: {
        login({commit}, expires_in) {
            setTimeout(() => {
                commit("logout");
            }, expires_in);
            commit("login");
        },
        logout({commit}) {
            commit("logout");
        }
    }
});