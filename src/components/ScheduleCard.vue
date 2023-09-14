<script setup lang="ts">
import Schedule from '@/models/Schedule'
import { defineProps } from 'vue';

defineProps({
  schedule: {
    type: Object as () => Schedule,
    required: true
  }
})


</script>

<template>
  <el-card class="card">
    <div class="card-header mb-2">
      <span class="text-2xl font-bold card-item-text">{{ schedule.name }}</span>
      <div class="card-close-button p-2.5 flex">
        <el-icon><Close/></el-icon>
      </div>
    </div>
    <div class="flex-col justify-center">
      <div class="card-item">
        <el-icon><Memo /></el-icon>
        <p class="mx-2.5 card-item-text">{{ schedule.description }}</p>
      </div>
      <div class="card-item">
        <el-icon><Calendar /></el-icon>
        <p class="mx-2.5 card-item-text">{{ new Date().toLocaleString() }}--{{ new Date().toLocaleString() }}</p>
      </div>
    </div>
  </el-card>
</template>

<style scoped>

.card:hover{
  cursor: pointer;
  transform: scale(1.02);
}

.card{
  background-color:rgb(204, 208, 218,0.6);
}

.card-close-button {
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  border-radius: 20%;
  justify-content: center;
  align-items: center;
}

.card-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-close-button:hover {
  background-color:rgb(114, 135, 253, 0.2);
  border-radius: 20%;
  justify-content: center;
  align-items: center;
}

.card-item{
  display: flex;
  align-items: center;
}

.card-item-text{
  color: rgb(76, 79, 105);
}
</style>