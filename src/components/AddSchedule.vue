<script setup lang="ts">
import { ref } from 'vue';
const drawer=ref(false)

const handleClose = (done: () => void) => {
  done()
}
</script>

<template>
  <el-drawer
    v-model="drawer"
    title="添加日程"
    :direction="'rtl'"
    :before-close="handleClose"
  >
  </el-drawer>
  <div class="fixed bottom-1.5 right-8 p-4 add">
    <el-button color="rgb(114, 135, 253)" icon="Plus" circle size="large" @click="drawer=true"></el-button>
  </div>
</template>

<style scoped>
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