<script setup lang="ts">
import DailyCard from './DailyCard.vue';
import HeaderBar from './HeaderBar.vue';
import ScheduleForm from './ScheduleForm.vue';
import Schedule from '@/models/Schedule'
import {ref} from 'vue';
import {useRouter} from 'vue-router';
const store=window.electron.store
const router=useRouter()
const isLogin=ref(store.get('type')==='anonymous'?false:true)
const drawer=ref(false)
const scheduleId=ref(-1)
const user=ref(store.get('user'))
const schedules=ref(user.value.schedules)
const deleteSchedule=(id:number)=>{
  schedules.value=schedules.value.filter((schedule:Schedule)=>schedule.id!==id)
  store.set('user.schedules',JSON.parse(JSON.stringify(schedules.value)))
}
const changeSchedule=(id:number)=>{
  drawer.value=true
  scheduleId.value=id
}
</script>

<template>
  <div class="mx-5" style="height: 100vh;position: relative;">
    <div class="w-full main" v-if="isLogin">
      <HeaderBar v-if="isLogin"/>
      <DailyCard :schedules="schedules" v-if="isLogin" @change="changeSchedule" @delete="deleteSchedule"/>
    </div>
    <div v-if="!isLogin" class="flex h-full justify-center w-full" style="position: absolute; top: 33%;">
      <div class="text-center">
        <p class="font-bold text-3xl welcome-text"  @click="()=>{router.push('/person')}">欢迎使用,请先创建自己的资料</p>
      </div>
    </div>
    <div class="fixed bottom-1.5 right-10 p-4 add">
      <el-button color="rgb(114, 135, 253)" icon="Plus" circle size="large" @click="()=>{
        drawer=true
        scheduleId=-1
      }"></el-button>
    </div>
    <ScheduleForm v-model="drawer" :schedule-id="scheduleId" @close="drawer=false" @change="schedules=store.get('user.schedules')"/>
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
  animation: fade-in 0.6s ease-in-out forwards;
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

.fixed{
  position: fixed;
}

.add:hover{
  cursor: pointer;
  transform: scale(1.2);
}

.add{
  transition: transform 0.3s ease-in-out;
}
</style>