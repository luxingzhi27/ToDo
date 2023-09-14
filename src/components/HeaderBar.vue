<script setup lang="ts">
import {ref} from 'vue'
const searchText=ref('')

const handleSearch=()=>{
  console.log(searchText.value)
}

</script>

<template>
  <div class="flex mt-5 mx-5 justify-between header-bar">
    <el-input v-model="searchText" placeholder="搜索日程" class="mr-5">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
    </el-input>
    <div class="search-button p-2.5 flex" @click="handleSearch">
      <el-icon><search /></el-icon>
    </div>
  </div>
</template>

<style scoped>
.header-bar{
  align-items: center;
}

.search-button{
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  border-radius: 20%;
  justify-content: center;
  align-items: center;
}

.search-button:hover{
  background-color:rgb(114, 135, 253, 0.2);
  border-radius: 20%;
  justify-content: center;
  align-items: center;
}

</style>