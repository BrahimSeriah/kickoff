<template>
  <div class=" bg-slate-200">
    <HeaderComponent/>
    <div class="h-24"></div>
    <div class="flex" >
        <SidebarComponent v-if="!($route.name === 'Login')" class="hidden lg:flex fixed"/>
        <div v-if="!($route.name === 'Login')" class="w-0 lg:w-64 h-screen"></div>
        <router-view class="flex-grow p-8" />
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