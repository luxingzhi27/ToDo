<script setup lang="ts">
import ScheduleCard from './ScheduleCard.vue';
import Schedule from '@/models/Schedule';
import {ref} from 'vue'

const schedules = ref<Schedule[]>([]);

schedules.value.push(new Schedule({
  name: "日程1",
  description: "这是一个描述",
  date:Date.now().toLocaleString(),
  endDate:Date.now().toLocaleString(),
}))

schedules.value.push(new Schedule({
  name: "日程2",
  description: "这是一个描述",
  date:Date.now().toLocaleString(),
  endDate:Date.now().toLocaleString(),
}))
schedules.value.push(new Schedule({
  name: "日程2",
  description: "这是一个描述",
  date:Date.now().toLocaleString(),
  endDate:Date.now().toLocaleString(),
}))
schedules.value.push(new Schedule({
  name: "日程2",
  description: "这是一个描述",
  date:Date.now().toLocaleString(),
  endDate:Date.now().toLocaleString(),
}))
schedules.value.push(new Schedule({
  name: "日程2",
  description: "这是一个描述",
  date:Date.now().toLocaleString(),
  endDate:Date.now().toLocaleString(),
}))
</script>

<template>
  <el-scrollbar class="scrollbar">
    <div class="flex-col justify-center mx-5">
      <ScheduleCard v-for="(schedule,index) in schedules" :schedule="schedule" :key="index" class="my-4"/>
    </div>
  </el-scrollbar>
</template>