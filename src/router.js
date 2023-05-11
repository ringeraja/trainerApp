import { defineAsyncComponent } from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

//import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
//import CoachRegistration from './pages/coaches/CoachRegistration.vue';
//import ContactCoach from './pages/requests/ContactCoach.vue';
//import RequestsRecieved from './pages/requests/RequestsRecieved.vue';
//import UserAuth from './pages/auth/UserAuth.vue';

import store from './store/index.js';

import NotFound from './pages/NotFound.vue';
import TheMenu from './components/layout/TheMenu.vue';


const CoachDetail = defineAsyncComponent(() => import('./pages/coaches/CoachDetail.vue'));
const CoachRegistration = defineAsyncComponent(() => import('./pages/coaches/CoachRegistration.vue'));
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach.vue'));
const RequestsRecieved = defineAsyncComponent(() => import('./pages/requests/RequestsRecieved.vue'));
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'));

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches',component: CoachesList},
        {path: '/compositionAPI',component: TheMenu},
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props:true, // the vue router will pass the value id holds as value as a prop
            children: [
                { path: 'contact',component: ContactCoach}  // /coaches/c1/contact  child cmp needs router-view in parent cmp  
            ]
        },
        {path: '/register', component: CoachRegistration, meta: { requiresAuth:true}},
        {path: '/requests', component: RequestsRecieved, meta: { requiresAuth:true}},
        {path: '/auth', component: UserAuth, meta: { requiresUnauth:true} },
        {path: '/:catchAll(.*)',component: NotFound} //no matter what was entered we handle it with this route
    ],
});

router.beforeEach(function(to,_,next){
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth');//
    }else if (to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/coaches');
    }else{
        next();
    }
});

export default router;