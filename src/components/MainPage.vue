<script setup lang="ts">
import DailyCard from './DailyCard.vue';
import HeaderBar from './HeaderBar.vue';
import {ref} from 'vue';
import {useRouter} from 'vue-router';
const store=window.electron.store
const router=useRouter()
const isLogin=ref(store.get('type')==='anonymous'?false:true)
</script>

<template>
  <div class="mx-5" style="height: 100vh;position: relative;">
    <div class="w-full main">
      <HeaderBar v-if="isLogin"/>
      <DailyCard v-if="isLogin" />
    </div>
    <div v-if="!isLogin" class="flex h-full justify-center w-full" style="position: absolute; top: 33%;">
      <div class="text-center">
        <p class="font-bold text-3xl welcome-text"  @click="()=>{router.push('/person')}">欢迎使用,请先创建自己的资料</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-text{
  animation: fade-in 0.7s ease-in-out forwards;
  opacity: 0;
  color: rgb(76, 79, 105);
  transition: color 0.3s ease-in-out;
  text-decoration: underline;
}

.main{
  animation: fade-in 0.7s ease-in-out forwards;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.welcome-text:hover{
  cursor: pointer;
  color: rgb(114, 135, 253);
}
</style>