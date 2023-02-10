<template>
    <div class="fixed z-10 left-0 top-0 w-screen h-screen bg-slate-600 bg-opacity-30 flex justify-center items-center">
        <div class="bg-white rounded-2xl p-8 flex flex-col gap-8" v-click-outside="closeModal">
            <h1 class="text-xl font-medium">Add New Player</h1>
            <form @submit.prevent="this.$parent.addNewPlayer(this.input)">
                <div class="flex flex-col gap-4 text-base font-medium">
                    <div>
                        <label for="firsName" class="block">First Name</label>
                        <input  type="text" id="firstName" name="firstName" v-model="this.input.firstName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                    </div>
                    <div>
                        <label for="lastName" class="block">Last Name</label>
                        <input  type="text" id="lastName" name="lastName" v-model="this.input.lastName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                    </div>
                    <div>
                        <label for="dateOfBirth" class="block">Date of birth</label>
                        <input  type="date" id="dateOfBirth" name="dateOfBirth" v-model="this.input.dateOfBirth"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="postion" class="block">Position</label>
                            <select name="position" id="position" v-model="this.input.position" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5">
                                <option value="ATK">Attack</option>
                                <option value="MID">Midfield</option>
                                <option value="DEF">Defence</option>
                                <option value="GK">Goal Keeper</option>
                            </select>
                        </div>
                        <div>
                            <label for="number" class="block">Number</label>
                            <input  type="text" id="number" name="number" v-model="this.input.number"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
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
    name: 'NewPlayerModalComponent',
    data() {
        return {
            input: {
                firstName: '',
                lastName: '',
                position: '',
                number: '',
                dateOfBirth: '',

            }
        }
    },
    methods: {
        closeModal() {
            this.$parent.showModal(false);
        },
    }
}


</script>