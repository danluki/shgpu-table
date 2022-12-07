<template>
  <div class="flex h-screen text-center overflow-hidden">
    <div class="m-auto space-y-16 text-white">
      <div>
        <h1
          class="break-words font-bold mb-5 md:text-7xl outline-none text-5xl"
        >
          Расписание ШГПУ
        </h1>
        <p class="py-6 text-xl">
          <Typewriter
            :words="data"
            :loop="0"
            :delay-speed="1500"
            :delete-speed="60"
            :type-speed="40"
            :cursor="true"
            :cursor-blinking="true"
            :cursor-style="'|'"
            :cursor-color="'#FFFFFF'"
            class="color-white text-xl py-6"
          />
          <!-- Придумано студентами.
          <span style="color: #772ce8"> Сделано для студентов</span
          >.<br />Используется <span style="color: #772ce8">студентами</span>.
          Для студентов с любовью -->
        </p>
        <div class="flex justify-center">
          <a href="#begin">
            <div
              class="animate-bounce bg-[#191919] flex h-10 hover:bg-[#202020] items-center justify-center p-2 ring-1 ring-slate-200-20 rounded-full w-10"
            >
              <Go />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Go from "../../assets/buttons/go.svg?component";
import { ref } from "vue";
import "vue-simple-typewriter/dist/style.css";
import { Typewriter } from "vue-simple-typewriter";

const data = ref<string[]>([
  "Придумано студентами",
  "Сделано для студентов",
  "Используется студентами",
  "Для студентов с любовью",
]);
</script>

<style scoped>
.text {
  font-size: 48px;
  color: red;
}
</style>
