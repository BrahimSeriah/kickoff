<template>
    <div class="fixed inset-0 z-10 overflow-y-auto bg-slate-600 bg-opacity-30 flex flex-col items-center">
        <div class="h-48 block"></div>
        <div class="flex flex-col gap-6 rounded-2xl p-12 bg-white lg:w-1/3" v-click-outside="closeModal">
            <div>
                <div class="grid grid-cols-2 gap-2">
                    <input type="radio" name="choosedClub" id="club1" value="1" class="hidden peer"
                        v-model="this.choosedClub" checked />
                    <label
                        class="text-center py-1 px-4 border-2 rounded-xl border-app-primary text-app-primary font-medium"
                        for="club1"> {{ club1.name }}
                    </label>
                    <input type="radio" name="choosedClub" id="club2" value="2" class="hidden peer"
                        v-model="this.choosedClub" />
                    <label
                        class="text-center py-1 px-4 border-2 rounded-xl border-app-primary text-app-primary font-medium"
                        for="club2"> {{ club2.name }}
                    </label>
                </div>
            </div>
            <div v-if="this.choosedClub === '1'">
                <div @click="this.selectPlayer(player._id)" v-for="player in club1.players" :key="player._id" class="p-2 hover:bg-slate-200 border-b flex justify-between items-center cursor-pointer">
                    <div>{{ player.firstName }} {{ player.lastName }}</div>
                    <div> {{ player.number }}</div>
                </div>
            </div>
            <div v-if="this.choosedClub === '2'">
                <div @click="this.selectPlayer(player._id)" v-for="player in club2.players" :key="player._id" class="p-2 hover:bg-slate-200 border-b flex justify-between items-center cursor-pointer">
                    <div>{{ player.firstName }} {{ player.lastName }}</div>
                    <div> {{ player.number }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PickPlayerModalComponent',
    data() {
        return {
            choosedClub: '1'
        }
    },
    methods: {
        closeModal() {
            this.$parent.showPickPlayerModal(false)
        },
        selectPlayer(id) {
            switch (this.action) {
                case 'goal': {
                    this.$parent.addGoal(id);
                    break;
                }
                case 'yellowCard': {
                    this.$parent.addYellowCard(id);
                    break;
                }
                case 'redCard': {
                    this.$parent.addRedCard(id);
                    break;
                }
                default:
                    break;
            }
            this.closeModal();
        }
    },  
    props: {
        club1 : Object,
        club2 : Object,
        action: String
    }
}

</script>

<style>
input:checked+label {
    color: white;
    background-color: #8a1538;
}
</style>