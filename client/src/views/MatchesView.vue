<template>
    <div class="m-8 p-8 bg-white rounded-2xl">
        <h1 class="font-semibold text-2xl mb-6">Matches</h1>
        <div class="flex flex-col gap-4">
            <div v-for="(group, i) in this.groupMatches" class="flex flex-col bg-slate-200 rounded-2xl p-4" :key="i">
                <h2 class="font-medium text-lg text-center">Round of {{ i + 1 }}</h2>
                <div v-for="matche in group" class="grid grid-cols-3 m-4" :key="matche._id">
                    <div class="flex items-center justify-start gap-4">
                        <img :src=" imageBaseURL + (this.clubs.filter(club => club._id === matche.club1_id))[0].logoPath" alt="logo-img">
                        <div>
                            <span class="block font-medium mb-1"> {{ (this.clubs.filter(club => club._id === matche.club1_id))[0].name }}</span>
                            <span class="block font-light text-slate-600" > {{ (this.clubs.filter(club => club._id === matche.club1_id))[0].fullName }}</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-center">
                        <div v-if="matche.isPlayed" class="flex items-center gap-4 py-2 px-4 rounded-2xl border-black font-bold bg-white ">
                            <span class="text-lg"> {{ matche.club1_score }} </span>
                            <span>-</span>
                            <span class="text-lg"> {{ matche.club2_score }} </span>
                        </div>
                        <div v-else class="group">
                            <span class="font-bold text-lg" :class="this.isUserAdmin ? 'group-hover:hidden' : ''">-</span>
                            <button v-if="this.isUserAdmin"
                                @click="showSetScoreModal(true, matche._id)"
                                class="hidden group-hover:flex px-4 py-2 bg-white border hover:bg-slate-100 border-black rounded-2xl  items-center gap-4 font-bold">
                                <i class="isax isax-tick-circle font-bold"/>
                                Set Score
                            </button>
                        </div>
                    </div>
                    <div class="flex gap-4 items-center justify-end">
                        <div>
                            <span class="block font-medium mb-1 text-right"> {{ (this.clubs.filter(club => club._id === matche.club2_id))[0].name }}</span>
                            <span class="block font-light text-slate-600 text-right" > {{ (this.clubs.filter(club => club._id === matche.club2_id))[0].fullName }}</span>
                        </div>
                        <img :src=" imageBaseURL + (this.clubs.filter(club => club._id === matche.club2_id))[0].logoPath" alt="logo-img">
                    </div>
                </div>
            </div>
        </div>
        <SetScoreModalComponent v-if="this.isShowSetScoreModal" :matchId="this.setScoreMatch"/>
    </div>
</template>

<script>
import SetScoreModalComponent from '@/components/SetScoreModalComponent.vue';
import axios from 'axios';

export default {
    name: "MatchesView",
    data() {
        return {
            clubs: [],
            matches: [],
            groupMatches: [],
            setScoreMatch: null,
            isShowSetScoreModal: false,
            imageBaseURL: "https://kickoff-api.onrender.com/api/images/",
            isUserAdmin: false
        };
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        showSetScoreModal(state, matchId) {
            this.isShowSetScoreModal = state;
            this.setScoreMatch = matchId;
        },
        async fetchData() {
            await axios.get("/api/club")
            .then((response) => {
                this.clubs = response.data;
            });
            await axios.get("/api/match")
            .then((response) => {
                this.matches = response.data;
            });
            for (let i = 0; i < this.matches.length; i += 4) {
                this.groupMatches.push(this.matches.slice(i, i + 4));
            }
            axios.post("/api/auth/isUserAdmin", { jwt: JSON.parse(localStorage.getItem("jwt")).token })
            .then((response) => {
                if (response.data)
                    this.isUserAdmin = true;
            });
        }
    },
    components: { SetScoreModalComponent }
}
</script>