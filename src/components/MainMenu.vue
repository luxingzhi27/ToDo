<script setup lang="ts">
import {onMounted, ref} from "vue";
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

onMounted(()=>{
})

</script>

<template>
    <el-menu
        defalut-active="2"
        :collapse="isCollapse"
        class="menu h-full relative"
        background-color="#eff1f5"
        text-color="#4c4f69"
        active-text-color="#7287fd"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        style="border-right-width: 1px;"
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
        <div class="absolute bottom-0 left-0 right-0">
          <el-menu-item>
            <el-icon><User/></el-icon>
            <template #title>Account</template>
          </el-menu-item>
        </div>

    </el-menu>
</template>

<style scoped>
.menu:not(.el-menu--collapse){
  width: 200px;
}
</style>