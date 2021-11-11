import Vue from 'vue';
import Router from 'vue-router';
import SignIn from './pages/SignIn';
import Home from './pages/Home'
import SingleGallery from './pages/SingleGallery';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            component: Home,
            name: 'Home'
        },
        {
            path: '/signin',
            component: SignIn,
            name: 'Sign In'
        },
        {
            path: '/gallery/:id',
            component: SingleGallery,
            props: true,
            name: 'Single Gallery'
        },
    ],
    mode: "history"
});

export default router;