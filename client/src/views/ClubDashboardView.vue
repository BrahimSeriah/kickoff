<template>
  <div class="m-8 p-8 bg-white rounded-2xl">
    <div class="flex items-end justify-between mb-16">
      <h1 class="font-semibold text-2xl">Club Dashboard</h1>
      <div class="flex gap-4">
        <button
          class="text-black bg-slate-300 hover:bg-slate-500 px-4 py-2 flex gap-2 rounded-2xl"
          v-if="editable"
          @click="cancel"
        >
          Cancel
        </button>
        <button
          @click="handleClick"
          class="text-white px-4 py-2 flex gap-2 rounded-2xl"
          :class="
            !this.editable
              ? 'bg-yellow-400 hover:bg-yellow-600'
              : 'bg-green-700 hover:bg-green-900'
          "
        >
          {{ editable ? "Save" : "Edit" }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-2 mb-16">
      <div class="flex flex-col gap-8 mb-8">
        <div class="flex flex-col gap-2">
          <label class="ml-2 text-base font-medium" for="name">Name</label>
          <input
            class="p-2 text-lg border-b-2 text-black"
            :class="this.editable ? 'bg-slate-100' : 'bg-white'"
            v-model="this.inputData.name"
            :disabled="!editable"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="ml-2 text-base font-medium" for="fullName"
            >Full Name</label
          >
          <input
            class="p-2 text-lg border-b-2 text-black"
            :class="this.editable ? 'bg-slate-100' : 'bg-white'"
            v-model="this.inputData.fullName"
            :disabled="!editable"
            placeholder="enter full name"
          />
        </div>
      </div>
      <div class="flex justify-center items-center">
        <img class="h-48 w-48 cursor-pointer" :src="this.logoSrc" alt="club-logo" @click="changeLogo"/>
        <input
          class="hidden"
          type="file"
          ref="fileInput"
          id="clubLogo"
          name="clubLogo"
          @change="uploadLogo"
        />
      </div>
      <div></div>
    </div>
    <div class="flex items-center justify-between mb-8">
      <label class="ml-2 text-base font-medium" for="fullName"
        >Players :
        <span class="font-semibold"> {{ this.clubPlayers.length }}</span></label
      >
      <button
        @click="showModal(true)"
        class="py-2 px-4 bg-green-700 hover:bg-green-900 text-white rounded-md text-sm transition-colors ease-in-out duration-300"
      >
        <span class="hidden lg:inline-block">add player</span>
        <i class="isax isax-add"></i>
      </button>
    </div>
    <table class="w-full border-spacing-4">
      <thead>
        <tr class="text-left p-8">
          <th>First Name</th>
          <th>Last Name</th>
          <th class="hidden lg:block">Date of Birth</th>
          <th>Position</th>
          <th>Number</th>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="player in this.clubPlayers"
          :key="player._id"
          class="text-left m-2 p-2 hover:bg-slate-100 group"
        >
          <td>{{ player.firstName }}</td>
          <td>{{ player.lastName }}</td>
          <td class="hidden lg:block">
            {{ new Date(player.dateOfBirth).toLocaleDateString("fr-FR") }}
          </td>
          <td>{{ player.position }}</td>
          <td>{{ player.number }}</td>
          <td
            class="flex justify-end items-center gap-2 lg:invisible group-hover:visible"
          >
            <button
              @click="ToggleEditPlayerModal(player)"
              class="py-1 px-2 bg-yellow-400 hover:bg-yellow-600 text-white rounded-md text-base transition-colors ease-in-out duration-300"
            >
              <i class="isax isax-edit"></i>
            </button>
            <button
              @click="deletePlayer(player._id)"
              class="py-1 px-2 bg-red-600 hover:bg-red-800 text-white rounded-md text-base transition-colors ease-in-out duration-300"
            >
              <i class="isax isax-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <NewPlayerModalComponent v-if="isModal" />
    <EditPlayerModalComponent v-if="isEditModal" :player="this.editPlayer" />
  </div>
</template>

<script>
import NewPlayerModalComponent from "@/components/NewPlayerModalComponent.vue";
import EditPlayerModalComponent from "@/components/EditPlayerModalComponent.vue";

import axios from "axios";

export default {
  name: "ClubDashboardView",
  data() {
    return {
      clubData: {},
      inputData: {},
      clubPlayers: [],
      editPlayer: null,
      editable: false,
      isModal: false,
      isEditModal: false,
      logoSrc: "",
    };
  },
  components: { NewPlayerModalComponent, EditPlayerModalComponent },
  async created() {
    await axios
      .get("/api/club/" + JSON.parse(localStorage.getItem("jwt")).clubId)
      .then((response) => {
        this.clubData = response.data;
        this.inputData = {... this.clubData};
      });
    this.updatePlayers();
    this.updateLogo();
  },
  methods: {
    toggleEditable() {
      this.editable = !this.editable;
    },
    handleClick() {
      if (this.editable)
        this.saveChanges();
      else
        this.toggleEditable();
    },
    saveChanges() {
      let data = {
        name: this.inputData.name,
        fullName: this.inputData.fullName
      }
      axios.put('/api/club/' + JSON.parse(localStorage.getItem("jwt")).clubId, data).
      then((response) => {
        this.clubData = response.data;
        this.inputData = {... this.clubData};
      });
      this.editable = false;
    },
    cancel() {
      this.editable = false;
      this.inputData = {... this.clubData};
    },
    showModal(state) {
      this.isModal = state;
    },
    showEditModal(state) {
      this.isEditModal = state
    },  
    addNewPlayer(input) {
      axios
        .post("/api/player", {
          firstName: input.firstName,
          lastName: input.lastName,
          dateOfBirth: input.dateOfBirth,
          position: input.position,
          number: input.number,
        })
        .then((response) => {
          if (response.status === 200) {
            this.updatePlayers();
            this.showModal(false);
          }
        });
    },
    ToggleEditPlayerModal(player) {
      this.showEditModal(true)
      this.editPlayer = player;
    },
    updatePlayers() {
      axios
        .get("/api/club/" + this.clubData._id + "/players")
        .then((response) => {
          this.clubPlayers = response.data;
        });
    },
    deletePlayer(id) {
      axios.delete("/api/player/" + id).then((response) => {
        if (response.status === 200) {
          this.updatePlayers();
        }
      });
    },
    changeLogo() {
      this.$refs.fileInput.click();
    },
    uploadLogo() {
      const input = this.$refs.fileInput;
      const file = input.files[0];

      const formData = new FormData();
      formData.append("logo", file);

      axios
        .post("/api/club/" + this.clubData._id + "/upload", formData)
        .then((response) => {
          if(response.status == 200) {
            this.updateLogo();
          }
        });
    },
    updateLogo() {
      axios.get("/api/images/" + this.clubData.logoPath).then((response) => {
        this.logoSrc = response.config.baseURL + response.config.url;
      });
    },
  },
};
</script>
