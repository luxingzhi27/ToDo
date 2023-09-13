<script setup lang="ts">
import {useRouter} from 'vue-router';
const router=useRouter()

const returnToMainPage=()=>{
    router.push('/')
}
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <el-button @click="returnToMainPage" type="primary" class="mx-auto my-auto">return</el-button>
    </div>
</template>