import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

//import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachRegister from './pages/coaches/CoachRegistration.vue'
import CoachContact from './pages/requests/ContactCoach.vue';
import RequestRecieved from './pages/requests/RequestRecieved.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/AuthLogin.vue';

import store from './store/index.js';

//improve performance and lazy load
const CoachDetails = defineAsyncComponent(() => import('./pages/coaches/CoachDetails.vue'));


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachList },
        { path: '/coaches/:id', 
        component: CoachDetails, 
        props: true,
        children: [
            { path: 'contact', component: CoachContact }, //coaches/2/contact
        ]},
        { path: '/register', component: CoachRegister, meta: {requiresAuth: true} },
        { path: '/requests', component: RequestRecieved, meta: {requiresAuth: true} },
        { path: '/auth', component: UserAuth, meta: {requiresUnAuth: true} },
        { path: '/:notFound(.*)', component: NotFound },
    ]
});

//Navigation guard
router.beforeEach(function(to, _, next){
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth')
    }else if(to.meta.requiresUnAuth && store.getters.isAuthenticated){
        next('/coaches')
    }else{
        next();
    }
});


export default router;