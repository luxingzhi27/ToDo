<script setup lang="ts">
import ScheduleCard from './ScheduleCard.vue';
import Schedule from '@/models/Schedule';
import {ref} from 'vue'

const schedules = ref<Schedule[]>([])

</script>

<template>
  <el-scrollbar class="scrollbar">
    <div class="flex-col justify-center mx-5">
      <ScheduleCard v-for="(schedule,index) in schedules" :schedule="schedule" :key="index" class="my-4"/>
    </div>
  </el-scrollbar>
</template>