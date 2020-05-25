import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('./components/Home.vue')
        },
        {
            path: '/gallery',
            component: () => import('./components/Gallery.vue')
        },
        {
            path: '/education',
            component: () => import('./components/Education.vue')
        },
        {
            path: '/admission',
            component: () => import('./components/Admission.vue')
        },
        {
            path: '/timetable',
            component: () => import('./components/Timetable.vue')
        },
    ]
})