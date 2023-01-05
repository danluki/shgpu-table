<template>
  <div class="flex h-screen items-center justify-center text-center">
    <form>
      <div
        v-motion
        :initial="{
          opacity: 0,
          y: 500,
        }"
        :enter="{
          opacity: 1,
          y: 0,
        }"
        class="flex justify-start lg:w-96 flex-col rounded-[8px] border border-white p-3"
      >
        <h1 class="text-4xl lg:text-5xl font-semibold mb-5">Admin Login</h1>
        <input
          class="mb-5 tracking-widest text-gray-500 transition-all hover:border-[#F7AB0A]/40 hover:text-[#F7AB0A]/40"
          placeholder="Login"
        />
        <input
          type="password"
          class="tracking-widest text-gray-500 transition-all hover:border-[#F7AB0A]/40 hover:text-[#F7AB0A]/40"
          placeholder="Password"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>