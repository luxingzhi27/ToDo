<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const isCollapse = ref(true);
const router = useRouter();

const handleOpen=(key:string,keyPath:string[])=>{
    console.log(key, keyPath);
}

const handleClose=(key:string,keyPath:string[])=>{
    console.log(key, keyPath);
}

const handleSelect=(key:string)=>{
    switch (key) {
        case "1-1":
            isCollapse.value = false;
            break;
        case "1-2":
            isCollapse.value = true;
            break;
        case "2":
            router.push({path: "/"});
            break;
    }
}
</script>

<template>
    <el-menu
        defalut-active="2"
        :collapse="isCollapse"
        class="h-full menu"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
    >
        <el-menu-item v-if="isCollapse" index="1-1">
            <el-icon><Expand /></el-icon>
            <template #title>Expand</template>
        </el-menu-item>
        <el-menu-item v-if="!isCollapse" index="1-2">
            <el-icon><Fold /></el-icon>
            <template #title>Fold</template>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon><House /></el-icon>
            <template #title>Home</template>
        </el-menu-item>
    </el-menu>
</template>

<style scoped>
.menu:not(.el-menu--collapse) {
  width: 120px;
}
</style>