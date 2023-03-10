<template>
  <div>
    <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-8">
      <div
        class="flex justify-between items-center gap-6 p-4 bg-white rounded-2xl"
      >
        <span class="text-lg">Total Signed Teams</span>
        <span class="text-xl font-bold">{{ this.clubs.length }}</span>
      </div>
      <div
        class="flex justify-between items-center gap-6 p-4 bg-white rounded-2xl"
      >
        <span class="text-lg">Total Signed Players</span>
        <span class="text-xl font-bold"> {{ this.players.length }}</span>
      </div>
    </div>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4 auto-rows-fr">
      <div
        v-for="club in this.clubs"
        :key="club._id"
        class="group p-4 bg-white rounded-2xl hover:bg-slate-100 ease-in-out duration-300"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <span class="block text-lg">{{ club.name }}</span>
            <span class="hidden lg:block text-md"
              >Signed Players : <span> {{(this.players.filter(player => player.club_id === club._id)).length }} </span></span
            >
            <span class="inline text-md">Password : {{ club.password }}</span>
          </div>
          <img
            class="w-1/4"
            :src=" imageBaseURL + club.logoPath"
            alt="club-logo"
          />
        </div>
        <div
          class="flex justify-end items-center gap-2 mt-4 lg:invisible group-hover:visible"
        >
          <button
            @click="showEditModal(true, club)"
            class="py-1 px-2 bg-yellow-400 hover:bg-yellow-600 text-white rounded-md text-sm transition-colors ease-in-out duration-300"
          >
            <span class="hidden lg:inline-block">edit</span>
            <i class="isax isax-edit"></i>
          </button>
          <button
            @click="deleteClub(club._id)"
            class="py-1 px-2 bg-red-600 hover:bg-red-800 text-white rounded-md text-sm transition-colors ease-in-out duration-300"
          >
            <span class="hidden lg:inline-block">delete</span>
            <i class="isax isax-trash"></i>
          </button>
        </div>
      </div>
      <div
        class="flex justify-center items-center p-4 bg-white rounded-2xl hover:bg-slate-100 cursor-pointer"
        @click="showModal(true)"
      >
        <i class="isax isax-add text-6xl"></i>
      </div>
    </div>
    <NewClubModalComponent v-if="this.isModal" />
    <EditClubModalComponent v-if="this.isEditModal" :club="this.editClub" />
  </div>
</template>

<script>
import NewClubModalComponent from "@/components/NewClubModalComponent.vue";
import EditClubModalComponent from "@/components/EditClubModalComponent.vue";

import axios from "axios";

export default {
  name: "AdminDashboardView",
  data() {
    return {
      clubs: [],
      players: [],
      editClub: null,
      isModal: false,
      isEditModal: false,
      imageBaseURL: 'https://kickoff-api.onrender.com/api/images/'
    };
  },
  methods: {
    showModal(state) {
      this.isModal = state;
    },
    showEditModal(state, club) {
      this.editClub = club;
      this.isEditModal = state;
    },
    addNewClub(input) {
      axios.post("/api/club", input).then((response) => {
        if (response.status === 200) {
          this.updateClubs();
          this.showModal(false);
        }
      });
    },
    deleteClub(id) {
      axios
        .delete("/api/club", {
          data: {
            id: id,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.updateClubs();
          }
        });
    },
    updateClubs() {
      axios.get("/api/club/admin").then((response) => {
        this.clubs = response.data;
      });
    },
    updatePlayers() {
        axios.get("/api/player")
        .then((response) => {
            this.players = response.data;
        });
    }
  },
  mounted() {
    this.updateClubs();
    this.updatePlayers();
  },
  components: { NewClubModalComponent, EditClubModalComponent },
};
</script>
