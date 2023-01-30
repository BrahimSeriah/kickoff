<template>
  <div class=" bg-slate-200">
    <HeaderComponent/>
    <div class="flex" >
        <SidebarComponent v-if="!($route.name === 'Login')" />
        <router-view />
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import SidebarComponent from './components/SidebarComponent.vue'

export default {
name: 'App',
components: {HeaderComponent, SidebarComponent},
}
</script>