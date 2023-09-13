<script setup lang="ts">
import {useRouter} from "vue-router";
const router=useRouter()
const goToDetailPage=()=>{
    router.push('/detail')
}
</script>

<template>
    <div class="flex items-center h-screen justify-center">
      <el-button type="primary" @click="goToDetailPage" class="mx-auto my-auto">go deatil</el-button>
    </div>
</template>

<style scoped>
</style>