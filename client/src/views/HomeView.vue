<template>
    <div class="flex justify-center items-center">
        <div class="bg-white rounded-2xl p-8">
            <h2 class="text-app-primary text-xl font-medium mb-6">New Match</h2>
            <div class="flex gap-4 mb-6">
                <select required v-model="this.club1" id="clubId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Choose a club</option>
                                    <option  v-for="club in this.clubs" :key="club._id" :value="club._id">{{ club.fullName }}</option>
                                </select>
                <select required v-model="this.club2" id="clubId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Choose a club</option>
                    <option  v-for="club in this.clubs" :key="club._id" :value="club._id">{{ club.fullName }}</option>
                </select>
            </div>
            <button class="py-2 px-6 rounded-2xl bg-app-primary text-white hover:bg-app-secondary ease-in-out duration-300" @click="addMatch">Add Match</button>
        </div>   
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'HomeView',
    data() {
        return {
            club1: "",
            club2: "",
            clubs: []
        }
    },
    mounted() {
        axios.get('/api/club/').then((response) => {
            this.clubs = response.data
        });
    },
    methods: {
        addMatch() {
            let data = {
               club1_id : this.club1,
               club2_id : this.club2
            }
            axios.post('/api/match', data)
            .then((response) => {
                if (response.status === 200){
                    this.club1 = "";
                    this.club2 = "";
                }
            });
        }
    }
}
</script>