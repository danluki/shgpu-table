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
          <typewriter
            :replace="data"
            :type-interval="100"
            :replace-interval="1000"
          > 
          </typewriter>
          Придумано студентами.
          <span style="color: #772ce8"> Сделано для студентов</span
          >.<br />Используется <span style="color: #772ce8">студентами</span>.
          Для студентов с любовью
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
import Typewriter from "typewriter-vue";
import Go from "../../assets/buttons/go.svg?component";
import { ref } from "vue";

const data = ref([{ from: "", to: "Придумано студентами." }]);

</script>

<style scoped>

</style>
