<template>
  <section class="text-white m-auto" id="begin">
    <h2 class="text-white font-bold mb-5 text-4xl text-center">
      Готовы начать?🚀
    </h2>
    <div class="p7">
      <div class="gap-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        <div class="duration-700 hover:-translate-y-2">
          <div class="bg-[#181818] block drop-shadow-xl rounded">
            <div class="p-6 items-center justify-center flex">
              <TelegramLogo class="w-64 h-64" />
            </div>
          </div>
        </div>
        <div class="duration-700 hover:-translate-y-2">
          <div class="bg-[#181818] block drop-shadow-xl rounded">
            <div class="p-6 items-center justify-center flex">
              <WebLogo class="w-64 h-64" />
            </div>
          </div>
        </div>
        <div class="duration-700 hover:-translate-y-2">
          <div class="bg-[#181818] block drop-shadow-xl rounded">
            <div class="p-6 items-center justify-center flex">
              <PhoneLogo class="w-64 h-64" />
            </div>
          </div>
        </div>
        <div class="duration-700 hover:-translate-y-2">
          <div class="bg-[#181818] block drop-shadow-xl rounded">
            <div class="p-6 items-center justify-center flex">
              <img
                class="w-64 h-64"
                src="../../assets/buttons/vk.png"
                alt="VK"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TelegramLogo from "./../../assets/buttons/telegram.svg?component";
import WebLogo from "./../../assets/buttons/web.svg?component";
import VkLogo from "./../../assets/buttons/vk.svg?component";
import PhoneLogo from "./../../assets/buttons/phone.svg?component";
</script>

<style scoped></style>
