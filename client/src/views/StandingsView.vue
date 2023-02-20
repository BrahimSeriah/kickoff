<template>
     <div class="m-8 p-8 bg-white rounded-2xl">
        <h1 class="font-semibold text-2xl mb-6">Standings</h1>
        <div class="p-4 m-4 rounded-2xl bg-slate-200"> 
            <div class="grid grid-cols-3 text-lg font-bold mb-4">
                <div>
                    Club
                </div>
                <div class="grid grid-cols-8 text-right col-span-2">
                    <div>MP</div>
                    <div>W</div>
                    <div>D</div>
                    <div>L</div>
                    <div>GF</div>
                    <div>GA</div>
                    <div>GD</div>
                    <div>Pts</div>
                </div>
            </div>
            <div v-for="club in this.clubs" :key="club._id" class="grid grid-cols-3 text-lg font-medium mb-4">
                <div>
                    {{ club.fullName }}
                </div>
                <div class="grid grid-cols-8 text-right col-span-2">
                    <td>{{ club.playedMatches }}</td>
                    <td>{{ club.wins }}</td>
                    <td>{{ club.draws }}</td>
                    <td>{{ club.losses }}</td>
                    <td>{{ club.goalsFor }}</td>
                    <td>{{ club.goalsAgainst }}</td>
                    <td>{{ club.goalsFor - club.goalsAgainst }}</td>
                    <td>{{ club.points }}</td>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'StandingsView',
    data() {
        return {
            clubs: []
        }
    },
    mounted() {
        axios.get('/api/club/standings')
        .then((response) => {
            this.clubs = response.data
        });
    }
}
</script>