<script setup lang="ts">
import ScheduleCard from './ScheduleCard.vue';
import Schedule from '@/models/Schedule'


defineProps({
  schedules:{
    type:Array as () => Schedule[],
    required:true
  }
})


const emit=defineEmits(['delete','change'])

const handleDelete=(id:number)=>{
  emit('delete',id)
}

const handleChange=(id:number)=>{
  emit('change',id)
}

</script>

<template>
  <el-scrollbar class="scrollbar">
    <div class="flex-col justify-center mx-5" v-if="schedules.length>0">
      <ScheduleCard v-for="(schedule,index) in schedules" :schedule="schedule" :key="index" class="my-4" @delete="handleDelete" @change="handleChange"/>
    </div>
  </el-scrollbar>
</template>

<style scoped>
</style>