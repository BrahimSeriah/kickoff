<template>
    <div class="bg-slate-300 w-screen h-screen flex justify-center items-center">
        <div class="bg-white rounded-2xl p-8 w-1/3">
            <h2 class="text-app-primary text-xl font-medium mb-6">Login</h2>
            <div>
                <form @submit.prevent="login">
                    <div class="flex flex-col gap-4 text-base font-medium">
                        <div class="grid grid-cols-2 gap-4 sw">
                            <input type="radio" name="accountType" id="club" value="club" class="hidden peer"
                                v-model="this.input.accountType" checked />
                            <label
                                class="text-center py-1 px-4 border-2 rounded-xl border-app-primary text-app-primary font-medium"
                                for="club">Club</label>
                            <input type="radio" name="accountType" id="admin" value="admin" class="hidden peer"
                                v-model="this.input.accountType" />
                            <label
                                class="text-center py-1 px-4 border-2 rounded-xl border-app-primary text-app-primary font-medium"
                                for="admin">Admin</label>
                        </div>
                        <div class="h-full">
                            <div class="flex flex-col gap-4" v-if="this.input.accountType === 'club'">
                                <label for="clubId" class="block">Club</label>
                                <select required v-model="this.input.clubId" id="clubId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Choose a club</option>
                                    <option  v-for="club in this.clubs" :key="club._id" :value="club._id">{{ club.name }}</option>
                                </select>
                                <label for="password" class="block">Password</label>
                                <input v-model="this.input.password" type="password" id="password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="" required>
                            </div>
                            <div class="flex flex-col gap-4 justify-self-center" v-if="this.input.accountType === 'admin'">
                                <label for="password" class="block">Admin Password</label>
                                <input v-model="this.input.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                        </div>
                        <button class="flex items-center gap-2 self-end py-2 px-6 rounded-2xl bg-app-primary text-white hover:bg-app-secondary ease-in-out duration-300" type="submit">Login <i class="isax isax-login text-base font-medium"/> </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: "LoginView",
    data() {
        return {
            input: {
                accountType: "club",
                clubId: "",
                password: ""
            },
            clubs: []
        };
    },
    methods: {
        login() {
            axios.post('/api/auth/' + this.input.accountType, this.input)
            .then((response) => {
                if (response.status === 200){
                    localStorage.setItem('jwt', JSON.stringify(response.data));
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token} ${response.data.clubId}`
                    this.$router.push('/dashboard');
                }
            })
        }
    },
    mounted() {
        axios.get('/api/club')
        .then((response) => {
            this.clubs = response.data;
        })
    }
};
</script>

<style>
input:checked+label {
    color: white;
    background-color: #8a1538;
}
</style>
