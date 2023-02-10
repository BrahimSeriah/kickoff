import { createRouter, createWebHistory } from 'vue-router'
import { verifyToken } from './middlewares/auth'

import HomeView from './views/HomeView.vue'
import MatchesView from './views/MatchesView.vue'
import StandingsView from './views/StandingsView.vue'
import ClubsView from './views/ClubsView.vue'
import LoginView from './views/LoginView.vue'
import DashboardView from './views/DashboardView.vue'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/matches',
        name: 'Matches',
        component: MatchesView
    },
    {
        path: '/standings',
        name: 'Standings',
        component: StandingsView
    },
    {
        path: '/clubs',
        name: 'Clubs',
        component: ClubsView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('jwt') && verifyToken)
                next('/home')
            else
                next()
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView,
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('jwt') && verifyToken)
                next();
            else
                next('/login');
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'bg-slate-300 text-app-primary rounded-2xl'
  })
  
export default router