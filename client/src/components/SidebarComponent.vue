<template>
    <aside class="bg-white h-screen flex flex-col justify-center items-start gap-10 px-8">
        <router-link to="/home" class="self-stretch grow-0 flex-none">
            <button class="flex items-center gap-3 py-2 px-4 rounded-2xl text-2xl w-full hover:bg-slate-400 hover:text-app-primary ease-in-out duration-300">
                <i class="isax isax-home-2"/>
                <span>Home</span>
            </button>
        </router-link>
        <router-link to="/matches" class="self-stretch grow-0 flex-none">
            <button class="flex items-center gap-3 py-2 px-4 rounded-2xl text-2xl w-full hover:bg-slate-400 hover:text-app-primary ease-in-out duration-300">
                <i class="isax isax-calendar"/>
                <span>Matches</span>
            </button>
        </router-link>
        <router-link to="/standings" class="self-stretch grow-0 flex-none">
            <button class="flex items-center gap-3 py-2 px-4 rounded-2xl  text-2xl w-full hover:bg-slate-400 hover:text-app-primary ease-in-out duration-300">
                <i class="isax isax-cup"/>
                <span>Standings</span>
            </button>
        </router-link>
        <router-link to="/clubs" class="self-stretch grow-0 flex-none">
            <button class="flex items-center gap-3 py-2 px-4 rounded-2xl  text-2xl w-full hover:bg-slate-400 hover:text-app-primary ease-in-out duration-300">
                <i class="isax isax-profile-2user"/>
                <span>Clubs</span>
            </button>
        </router-link>
        <router-link v-if="this.isAuthentified" to="/dashboard" class="self-stretch grow-0 flex-none">
            <button class="flex items-center gap-3 py-2 px-4 rounded-2xl  text-2xl w-full hover:bg-slate-400 hover:text-app-primary ease-in-out duration-300">
                <i class="isax isax-category"/>
                <span>Dashboard</span>
            </button>
        </router-link>
    </aside>
</template>

<script>
import { isAuthentified } from '../middlewares/auth'

export default {
    name: 'SidebarComponent',
    computed: {
        isAuthentified() {
            return isAuthentified();
        }
    }
}
</script>