import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import MatchesView from './views/MatchesView.vue'
import StandingsView from './views/StandingsView.vue'
import ClubsView from './views/ClubsView.vue'
import LoginView from './views/LoginView.vue'

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
        component: LoginView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'bg-slate-300 text-app-primary rounded-2xl'
  })
  
export default router