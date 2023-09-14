<script setup lang="ts">
import ScheduleCard from './ScheduleCard.vue';
import Schedule from '@/models/Schedule';
import {ref} from 'vue'
const store=window.electron.store
const user=ref(store.get('user'))
const schedules=ref(user.value.schedules)
const addSchedule=()=>{
  let schedule=new Schedule({
    name:'写代码',
    description:'要把ToDo再花一天时间写完',
    date:new Date().toLocaleDateString(),
    endDate:new Date().toLocaleDateString(),
    id:114514
  })
  schedules.value.push(schedule)
  store.set('user.schedules', JSON.parse(JSON.stringify(schedules.value)))
}


if(schedules.value.length===0){
  addSchedule()
  addSchedule()
  addSchedule()
}
</script>

<template>
  <el-scrollbar class="scrollbar">
    <div class="flex-col justify-center mx-5">
      <ScheduleCard v-for="(schedule,index) in schedules" :schedule="schedule" :key="index" class="my-4"/>
    </div>
  </el-scrollbar>
</template>