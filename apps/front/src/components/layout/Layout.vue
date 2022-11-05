<template>
  <main>
    <div class="flex text-white bg-[#131313]">
      <div class="flex flex-col flex-grow main">
        <MainNavBarVue />
        <div class="flex flex-col flex-grow">
          <slot />
        </div>
        <Footer />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Footer from "./Footer.vue";
import MainNavBarVue from "./MainNavBar.vue";
</script>

<style lang="scss" scoped></style>
