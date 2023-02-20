<template>
    <div class="fixed z-10 left-0 top-0 w-screen h-screen bg-slate-600 bg-opacity-30 flex justify-center items-center">
        <div class="bg-white rounded-2xl p-8 flex flex-col gap-8" v-click-outside="closeModal">
            <h1 class="text-lg font-medium text-center">Set Score</h1>
            <div class="grid grid-cols-3 gap-4 m-4">
                <div class="flex items-center justify-start gap-4">
                    <img :src=" imageBaseURL + this.club1.logoPath" alt="logo-img">
                    <div>
                        <span class="block font-medium mb-1"> {{ this.club1.name }}</span>
                        <span class="block font-light text-slate-600" > {{ this.club1.fullName }}</span>
                    </div>
                </div>
                <div class="flex items-center justify-between rounded-2xl bg-slate-100  p-8">
                    <span class="text-2xl font-bold">{{ this.club1Goals.length }}</span>
                    <span class="text-2xl font-semibold">-</span>
                    <span class="text-2xl font-bold">{{ this.club2Goals.length }}</span>
                    
                </div>
                <div class="flex items-center justify-end gap-4">
                    <div>
                        <span class="block font-medium mb-1 text-right"> {{ this.club2.name }}</span>
                        <span class="block font-light text-slate-600 text-right" > {{ this.club2.fullName }}</span>
                    </div>
                    <img :src=" imageBaseURL + this.club2.logoPath" alt="logo-img">
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <button @click="showPickPlayerModal(true, 'goal')" class="flex items-center justify-center gap-4 py-2 px-6 rounded-2xl border-2 border-black hover:bg-slate-200" >
                    <i class="isax isax-add"/>
                    Goal
                </button>
                <button @click="showPickPlayerModal(true, 'yellowCard')" class="flex items-center justify-center gap-4 py-2 px-6 rounded-2xl bg-yellow-400 hover:bg-yellow-600" >
                    <i class="isax isax-add"/>
                    Yellow Card
                </button>
                <button @click="showPickPlayerModal(true, 'redCard')" class="flex items-center justify-center gap-4 py-2 px-6 rounded-2xl bg-red-600 hover:bg-red-800" >
                    <i class="isax isax-add"/> 
                    Red Card
                </button>
            </div>
            <div>
                <h2 class="font-semibold text-lg">Goals :</h2>
                <div class="grid grid-cols-3" >
                    <div>
                        <div v-for="(goal, index) in this.club1Goals" :key="index" class="flex gap-2 my-2 items-center">
                            <img class="h-4" src="../assets/images/Soccerball.svg">
                            <div class="flex items-center justify-between w-full">
                                <span> {{ goal.firstName + ' ' + goal.lastName }}</span>
                                <span> {{ goal.number }}</span>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <div v-for="(goal, index) in this.club2Goals" :key="index" class="flex gap-2 my-2 items-center">
                            <img class="h-4" src="../assets/images/Soccerball.svg">
                            <div class="flex items-center justify-between w-full">
                                <span> {{ goal.firstName + ' ' + goal.lastName }}</span>
                                <span> {{ goal.number }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            <div>
                <h2 class="font-semibold text-lg">Cards :</h2>
                <div class="grid grid-cols-3" >
                    <div>
                        <div v-for="(card, index) in this.club1YellowCards" :key="index" class="flex gap-2 my-2 items-center">
                            <img class="h-4" src="../assets/images/Yellow_card_icon.svg">
                            <div class="flex items-center justify-between w-full">
                                <span> {{  card.firstName + ' ' + card.lastName }}</span>
                                <span> {{ card.number }}</span>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <div v-for="(card, index) in this.club2YellowCards" :key="index" class="flex gap-2 my-2 items-center">
                            <img class="h-4" src="../assets/images/Yellow_card_icon.svg">
                            <div class="flex items-center justify-between w-full">
                                <span> {{  card.firstName + ' ' + card.lastName }}</span>
                                <span> {{ card.number }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div v-for="(card, index) in this.club1RedCards" :key="index" class="flex gap-2 my-2 items-center">
                            <img class="h-4" src="../assets/images/Red_card_icon.svg">
                            <div class="flex items-center justify-between w-full">
                                <span> {{  card.firstName + ' ' + card.lastName }}</span>
                                <span> {{ card.number }}</span>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <div v-for="(card, index) in this.club2RedCards" :key="index" class="flex gap-2 my-2 items-center">
                            <img class="h-4" src="../assets/images/Red_card_icon.svg">
                            <div class="flex items-center justify-between w-full">
                                <span> {{  card.firstName + ' ' + card.lastName }}</span>
                                <span> {{ card.number }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            <div class="flex justify-center items-center" >
                <button @click="validateScore" class="py-2 px-6 rounded-2xl border-2 bg-green-700 hover:bg-green-900 text-white">Validate</button>
            </div>
            <PickPlayerModalComponent v-if="this.isPickPlayer" :action="this.action" :club1="this.club1" :club2="this.club2"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PickPlayerModalComponent from './PickPlayerModalComponent.vue';

export default {
    name: "NewPlayerModalComponent",
    data() {
        return {
            match: {},
            club1: {},
            club2: {},
            goals: [],
            yellowCards: [],
            redCards: [],
            isPickPlayer: false,
            action: '',
            imageBaseURL: "https://kickoff-api.onrender.com/api/images/",
        };
    },
    async mounted() {
        if (this.matchId !== null) {
            await axios.get("/api/match/" + this.matchId)
                .then((response) => {
                this.match = response.data;
            });
            await axios.get("/api/club/" + this.match.club1_id)
                .then((response) => {
                this.club1 = { ...response.data };
            });
            await axios.get("/api/club/" + this.match.club2_id)
                .then((response) => {
                this.club2 = { ...response.data };
            });
            await axios.get("/api/club/" + this.match.club1_id + "/players")
                .then((response) => {
                this.club1.players = response.data;
            });
            await axios.get("/api/club/" + this.match.club2_id + "/players")
                .then((response) => {
                this.club2.players = response.data;
            });
        }
    },
    methods: {
        closeModal() {
            this.$parent.showSetScoreModal(false);
        },
        showPickPlayerModal(state, action) {
            this.isPickPlayer = state;
            this.action = action;
        },
        addGoal(id) {
            this.goals.push({
                match_id : this.matchId,
                player_id : id
            });
        },
        addYellowCard(id) {
            this.yellowCards.push({
                match_id : this.matchId,
                player_id : id
            });
        },
        addRedCard(id) {
            this.redCards.push({
                match_id : this.matchId,
                player_id : id
            });
        },
        validateScore() {
            let data = {
                club1_score: this.club1Goals.length,
                club2_score: this.club2Goals.length,
                goals: this.goals,
                yellowCards: this.yellowCards,
                redCards: this.redCards
            }
            axios.put('/api/match/' + this.matchId, data)
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    this.$parent.showSetScoreModal(false);
                }
            });
        }
    },
    props: {
        matchId: String
    },
    computed: {
        club1Goals() {
            const club1Goals = this.goals.filter(goal => {
                const goalPlayer = this.club1.players.find(player => player._id === goal.player_id);
                return goalPlayer && goalPlayer.club_id === this.club1._id;
            });
            return club1Goals.map(goal => {
                const goalPlayer = this.club1.players.find(player => player._id === goal.player_id);
                return { ...goal, firstName: goalPlayer.firstName, lastName: goalPlayer.lastName, number: goalPlayer.number };
            });
        },
        club2Goals() {
            const club2Goals = this.goals.filter(goal => {
                const goalPlayer = this.club2.players.find(player => player._id === goal.player_id);
                return goalPlayer && goalPlayer.club_id === this.club2._id;
            });
            return club2Goals.map(goal => {
                const goalPlayer = this.club2.players.find(player => player._id === goal.player_id);
                return { ...goal, firstName: goalPlayer.firstName, lastName: goalPlayer.lastName, number: goalPlayer.number };
            });
        },
        club1YellowCards() {
            const club1YellowCards = this.yellowCards.filter(goal => {
                const goalPlayer = this.club1.players.find(player => player._id === goal.player_id);
                return goalPlayer && goalPlayer.club_id === this.club1._id;
            });
            return club1YellowCards.map(goal => {
                const goalPlayer = this.club1.players.find(player => player._id === goal.player_id);
                return { ...goal, firstName: goalPlayer.firstName, lastName: goalPlayer.lastName, number: goalPlayer.number };
            });
        },
        club2YellowCards() {
            const club2YellowCards = this.yellowCards.filter(goal => {
                const goalPlayer = this.club2.players.find(player => player._id === goal.player_id);
                return goalPlayer && goalPlayer.club_id === this.club2._id;
            });
            return club2YellowCards.map(goal => {
                const goalPlayer = this.club2.players.find(player => player._id === goal.player_id);
                return { ...goal, firstName: goalPlayer.firstName, lastName: goalPlayer.lastName, number: goalPlayer.number };
            });
        },
        club1RedCards() {
            const club1RedCards = this.redCards.filter(goal => {
                const goalPlayer = this.club1.players.find(player => player._id === goal.player_id);
                return goalPlayer && goalPlayer.club_id === this.club1._id;
            });
            return club1RedCards.map(goal => {
                const goalPlayer = this.club1.players.find(player => player._id === goal.player_id);
                return { ...goal, firstName: goalPlayer.firstName, lastName: goalPlayer.lastName, number: goalPlayer.number };
            });
        },
        club2RedCards() {
            const club2RedCards = this.redCards.filter(goal => {
                const goalPlayer = this.club2.players.find(player => player._id === goal.player_id);
                return goalPlayer && goalPlayer.club_id === this.club2._id;
            });
            return club2RedCards.map(goal => {
                const goalPlayer = this.club2.players.find(player => player._id === goal.player_id);
                return { ...goal, firstName: goalPlayer.firstName, lastName: goalPlayer.lastName, number: goalPlayer.number };
            });
        },
    },
    components: { PickPlayerModalComponent }
}


</script>