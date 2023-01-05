<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "./components/layout/Layout.vue";
</script>

<template>
  <Layout class="snap-y 
      snap-mandatory overflow-scroll z-0 scroll-smooth overflow-x-hidden 
      scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </Layout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
