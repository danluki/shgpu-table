<template>
  <footer class="my-2 text-white w-full">
    <div class="contacts flex justify-end mt-1 mx-6 space-x-1">
      <a href="/">@shgpu-table</a>
      <a href="https://github.com/danilluk1">danluki</a>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.contacts a {
  @apply inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow hover:bg-[#202122] focus:outline-none focus:ring-0 transition duration-150 ease-in-out;
}
</style>
