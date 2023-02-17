<template>
    <div class="fixed z-10 left-0 top-0 w-screen h-screen bg-slate-600 bg-opacity-30 flex justify-center items-center">
        <div class="bg-white rounded-2xl p-8 flex flex-col gap-8" v-click-outside="closeModal">
            <h1 class="text-xl font-medium">Edit Club</h1>
            <form @submit.prevent="this.updateClubEdit()">
                <div class="flex flex-col gap-4 text-base font-medium">
                    <div>
                        <label for="name" class="block">Name</label>
                        <input type="text" id="name" name="name" v-model="this.input.name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                    <div>
                        <label for="fullName" class="block">Full Name</label>
                        <input type="text" id="fullName" name="fullName" v-model="this.input.fullName"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label for="password" class="block">Password</label>
                        <div class="flex">
                            <input type="text" id="password" v-model="this.input.password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                disabled />
                        </div>
                    </div>
                    <div class="flex gap-4 justify-end items-center">
                        <button @click="closeModal"
                            class="flex items-center gap-2 self-end py-2 px-6 rounded-2xl bg-slate-200 text-black hover:bg-slate-400 ease-in-out duration-300"
                            type="submit">
                            Cancel
                        </button>
                        <button
                            class="flex items-center gap-2 self-end py-2 px-6 rounded-2xl bg-green-700 text-white hover:bg-green-900 ease-in-out duration-300"
                            type="submit">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "NewClubModalComponent",
    data() {
        return {
            input: { ...this.club },
        };
    },
    props: {
        club: Object
    },
    methods: {
        closeModal() {
            this.$parent.showEditModal(false);
        },
        updateClubEdit() {
            let data = {
                name: this.input.name,
                fullName: this.input.fullName
            }
            axios.put('/api/club/' + this.club._id, data)
            .then((response) => {
                if (response.status === 200){
                    this.closeModal();
                    this.$parent.updateClubs();
                }
            });
        },
    },
};
</script>
