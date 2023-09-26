<script setup lang="ts">
import MainMenu from './components/MainMenu.vue';

</script>

<template>
  <el-container style="height: 100vh">
    <div class="h-full">
      <MainMenu/>
    </div>
    <el-container style="background-color: #eff1f5">
      <el-main>
        <RouterView/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
</style>
