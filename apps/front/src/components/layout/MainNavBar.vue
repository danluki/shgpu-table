<template>
  <nav
    ref="navRef"
    class="bg-[#131313] drop-shadow-lg flex fixed items-center justify-between p-1 pt-1.5 select-none w-full text-white z-10"
  >
    <div class="flex items-center ml-2">
      <a class="block" href="/">
        <img class="w-14 h-10" src="./../../assets/logo.png" alt="Logo" />
      </a>
      <a class="font-bold ml-2 text-xl"> Расписание ШГПУ </a>
    </div>
    <div class="md:space-x-5 space-x-2 flex">
      <div class="md:space-x-5 space-x-2 md:flex hidden">
        <div>Расписание</div>
        <div>О нас</div>
        <div>Разработчикам</div>
        <div>Донат</div>
      </div>

      <div class="flex justify-center md:hidden">
        <div>
          <div class="dropdown relative">
            <button
              id="dropdownMenuButtonId"
              class="dropdown-toggle duration-500 ease-in-out flex focus:outline-none focus:ring-0 font-medium hover:bg-[#9146FF] items-center leading-tight px-2 py-2 rounded shadow text-white text-xs transition uppercase whitespace-nowrap"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="onBurgerClick"
            >
              <img
                class="w-8 h-8"
                src="../../assets/buttons/hamburger.png"
                alt="Burger"
              />
            </button>
            <ul
              v-if="isBurgerShown"
              class="fixed left-0 p-5 w-screen duration-500 ease-linear list-none z-50 bg-[#141414] rounded text-2xl"
            >
              <hr
                class="border border-gray-700 border-solid border-t-0 h-0 opacity-50"
              />
              <li class="hover:bg-[#9146FF]">Расписание</li>
              <li class="hover:bg-[#9146FF]">О нас</li>
              <li class="hover:bg-[#9146FF]">Разработчикам</li>
              <li class="hover:bg-[#9146FF]">Донат</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const isBurgerShown = ref<boolean>();
const navRef = ref();

const onBurgerClick = () => {
  isBurgerShown.value = !isBurgerShown.value;
};
onMounted(() => {
  onclick = (event: MouseEvent) => {
    if (
      event.target !== navRef.value &&
      event.composedPath().includes(navRef.value)
    ) {
      return;
    } else {
      isBurgerShown.value = false;
    }
  };
});
</script>

<style scoped></style>
