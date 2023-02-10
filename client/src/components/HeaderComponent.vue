<template>
    <div>
        <header class="z-20 flex justify-between items-center py-8 px-10 h-24 text-4xl text-white bg-app-primary fixed w-screen">
            <router-link to="/">
                <h1 class="font-Tajawal font-bold">Ettahdib Football  Championship 2023</h1>
            </router-link>
            <router-link  to="/login" v-if="!($route.name === 'Login') && !this.isAuthentified">
                <button class="flex items-center py-2 px-4 rounded-2xl border-2 text-xl border-white gap-3 hover:bg-app-secondary ease-in-out duration-300">
                    <span>login</span>
                    <i class="isax isax-login text-2xl"></i>
                </button>
            </router-link>
            <button @click="logout" v-if="this.isAuthentified" class="flex items-center py-2 px-4 rounded-2xl border-2 text-xl border-white gap-3 hover:bg-app-secondary ease-in-out duration-300">
                <i class="isax isax-logout text-2xl"></i>
                <span>logout</span>
            </button>           
        </header>
    </div>
</template>

<script>
import { isAuthentified, logout } from '@/middlewares/auth';

export default {
    name: 'HeaderComponent',
    methods: {
        logout() {
            logout();
            this.$router.push('/login');
        }
    },  
    computed: {
        isAuthentified() {
            return isAuthentified();
        }
    },
    
}

</script>