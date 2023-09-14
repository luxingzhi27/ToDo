<script setup lang="ts">
import MainMenu from './components/MainMenu.vue';
import HeaderBar from './components/HeaderBar.vue';
</script>

<template>
  <el-container style="height: 100vh">
    <MainMenu/>
    <el-container style="background-color: #eff1f5">
      <el-header style="height: fit-content;">
        <HeaderBar/>
      </el-header>
      <el-main>
        <RouterView/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
</style>
