<template>
    <div class="fixed z-10 left-0 top-0 w-screen h-screen bg-slate-600 bg-opacity-30 flex justify-center items-center">
        <div class="bg-white rounded-2xl p-8 flex flex-col gap-8" v-click-outside="closeModal">
            <h1 class="text-xl font-medium">Create New Club</h1>
            <form @submit.prevent="this.$parent.addNewClub(this.input)">
                <div class="flex flex-col gap-4 text-base font-medium">
                    <div>
                        <label for="name" class="block">Name</label>
                        <input  type="text" id="name" name="name" v-model="this.input.name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                    </div>
                    <div>
                        <label for="fullName" class="block">Full Name</label>
                        <input  type="text" id="fullName" name="fullName" v-model="this.input.fullName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                    </div>
                    <div>
                        <label for="password" class="block">Password</label>
                        <div class="flex">
                            <input  type="text" id="password" v-model="this.input.password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg border-r-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required placeholder="generate" disabled>
                            <span @click="generatePassword" class="inline-flex justify-center items-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-0 p-2.5 cursor-pointer" ><i class="isax isax-refresh text-lg"/></span>
                        </div>
                    </div>
                    <button class="flex items-center gap-2 self-end py-2 px-6 rounded-2xl bg-slate-200 text-black hover:bg-slate-400 ease-in-out duration-300" type="submit">Add<i class="isax isax-add"/></button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewClubModalComponent',
    data() {
        return {
            input: {
                name: '',
                fullName: '',
                password: ''
            }
        }
    },
    methods: {
        closeModal() {
            this.$parent.showModal(false);
        },
        generatePassword() {
            const min = Math.pow(10, (6-1));
            const max = Math.pow(10, (6));
            this.input.password = Math.floor(Math.random() * (max - min) + min);
        }
    }
}


</script>