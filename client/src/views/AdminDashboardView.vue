<template>
    <div>
        <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-8">
            <div class="flex justify-between items-center gap-6 p-4 bg-white rounded-2xl">
                <span class="text-lg">Total Signed Teams</span>
                <span class="text-xl font-bold">{{ this.clubs.length }}</span>
            </div>
            <div class="flex justify-between items-center gap-6 p-4 bg-white rounded-2xl">
                <span class="text-lg">Total Signed Players</span>
                <span class="text-xl font-bold">75</span>
            </div>
        </div>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4 auto-rows-fr">
            <div v-for="club in this.clubs" :key="club._id" class="group p-4 bg-white rounded-2xl hover:bg-slate-100  ease-in-out duration-300">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <span class="block text-lg">{{ club.name }}</span>
                        <span class="hidden lg:block text-md ">Signed Players : <span> {{ club.players }} </span></span>
                        <span class="inline text-md">Password : {{ club.password }}</span>
                    </div>
                    <img class="w-1/4" :src="getImageURL(club.logoPath)" alt="club-logo">
                </div>
                <div class="flex justify-end items-center gap-2 mt-4 lg:invisible group-hover:visible">
                    <button class="py-1 px-2 bg-yellow-400 hover:bg-yellow-600 text-white rounded-md text-sm  transition-colors ease-in-out duration-300"><span class="hidden lg:inline-block">edit</span> <i class="isax isax-edit"></i></button>
                    <button @click="deleteClub(club._id)" class="py-1 px-2 bg-red-600 hover:bg-red-800 text-white rounded-md text-sm transition-colors ease-in-out duration-300"><span class="hidden lg:inline-block">delete</span> <i class="isax isax-trash"></i></button>
                </div>
            </div>
            <div class="flex justify-center items-center p-4 bg-white rounded-2xl hover:bg-slate-100 cursor-pointer" @click="showModal(true)">
                <i class="isax isax-add text-6xl"></i>
            </div>
        </div>
        <NewClubModalComponent v-if="this.modal"/>

    </div>
</template>

<script>
import NewClubModalComponent from '@/components/NewClubModalComponent.vue';
import axios from 'axios';

export default {
    name: "AdminDashboardView",
    data() {
        return {
            clubs:[],
            modal: false
        };
    },
    methods: {
        showModal(state) {
            this.modal = state;
        },
        addNewClub(input) {
            axios.post('/api/club', input).then((response) => {
                if (response.status === 200) {
                    this.updateClubs()
                    this.showModal(false);
                }
            });
        },
        deleteClub(id) {
            axios.delete(
                '/api/club',
                {data: 
                    {
                        id: id
                    }
                })
            .then((response) => {
                if (response.status === 200) {
                    this.updateClubs()
                }
            });
        }, 
        updateClubs(){
            axios.get('/api/club/admin').then((response) => {
                this.clubs = response.data;
            })
        },
        getImageURL(image) {
            axios.get("/api/images/" + image).then((response) => {
            return response.config.url;
        });
        }
    },
    mounted() {
        this.updateClubs()
    },
    components: { NewClubModalComponent }
}
</script>