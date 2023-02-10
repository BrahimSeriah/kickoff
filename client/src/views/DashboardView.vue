<template>
    
        <AdminDashboardView v-if="this.isUserAdmin"/>
   
        <ClubDashboardView v-else/>
</template>

<script>
import axios from 'axios';
import AdminDashboardView from './AdminDashboardView.vue';
import ClubDashboardView from './ClubDashboardView.vue';

export default {
    name: 'DashboardView',
    data(){
        return {
            isUserAdmin: false
        }
    },
    created() {
        axios.post(
            '/api/auth/isUserAdmin',
            { jwt: JSON.parse(localStorage.getItem('jwt')).token }
        )
        .then((response) => {
            if (response.data)
                this.isUserAdmin = true;
        });
    },
    components: { AdminDashboardView, ClubDashboardView }
}


</script>