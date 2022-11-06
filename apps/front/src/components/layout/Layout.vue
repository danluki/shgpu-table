<template>
  <div class="text-white w-full min-w-full">
    <MainNavBarVue />
    <div class="flex flex-col flex-grow main">
      <div class="flex flex-col flex-grow">
        <slot />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from "./Footer.vue";
import MainNavBarVue from "./MainNavBar.vue";
</script>

<style lang="scss" scoped></style>
