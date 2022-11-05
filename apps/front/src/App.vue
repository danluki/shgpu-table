<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "./components/layout/Layout.vue";
</script>

<template>
  <Layout>
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
