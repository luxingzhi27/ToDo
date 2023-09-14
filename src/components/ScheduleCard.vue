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
  <el-card>
    <template #header>
      <div class="card-header mb-0.5">
        <span class="text-2xl font-bold">{{ schedule.name }}</span>
        <el-icon class="card-close-button"><Close/></el-icon>
      </div>
      <div class="flex-col justify-center">
        <div class="card-item">
          <el-icon><Memo /></el-icon>
          <p class="mx-2.5">{{ schedule.description }}</p>
        </div>
        <div class="card-item">
          <el-icon><Calendar /></el-icon>
          <p class="mx-2.5">{{ schedule.date }}--{{ schedule.endDate }}</p>
        </div>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.card-close-button {
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.card-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-close-button:hover {
  background-color:rgb(114, 135, 253, 0.2);
  border-radius: 20%;
}

.card-item{
  display: flex;
  align-items: center;
}
</style>