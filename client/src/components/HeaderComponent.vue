<template>
    <div>
        <header class="flex justify-between items-center py-8 px-10 text-4xl text-white bg-app-primary fixed w-screen">
            <router-link to="/">
                <h1 class="font-Tajawal font-bold">Ettahdib Football  Championship 2023</h1>
            </router-link>
            <router-link to="login" v-if="!($route.name === 'Login')">
                <button class="flex items-center py-2 px-4 rounded-2xl border-2 text-xl border-white gap-3 hover:bg-app-secondary ease-in-out duration-300">
                    <span>login</span>
                    <i class="isax isax-login text-2xl"></i>
                </button>
            </router-link>
        </header>
    </div>
</template>

<script>
export default {
    name: 'HeaderComponent'
}

</script>