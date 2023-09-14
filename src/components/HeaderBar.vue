<script setup lang="ts">
import {ref} from 'vue'
const searchText=ref('')
const isShrink=ref(false)

const handleSearch=()=>{
  isShrink.value=true
  setTimeout(()=>{
    isShrink.value=false
  },250)
  console.log(searchText.value)
}

</script>

<template>
  <div class="flex mt-2.5 mx-5 justify-between header-bar">
    <div class="w-full mr-2.5">
      <el-input v-model="searchText" placeholder="请输入搜索内容">
        <template #prefix>
          <el-icon><search/></el-icon>
        </template>
      </el-input>
    </div>
    <div class="search-button p-2.5 flex" @click="handleSearch">
      <el-icon :class="{'search-icon-shrink':isShrink,'search-icon':!isShrink}"><search /></el-icon>
    </div>
  </div>
</template>

<style scoped>
.header-bar{
  align-items: center;
}
.el-input {
  --el-input-border-color:rgb(204, 208, 218);  
  /*获取焦点后的边框颜色*/  
  --el-input-focus-border-color:rgb(114, 135, 253);
  /*鼠标悬停边框颜色*/  
  --el-input-hover-border-color:rgb(108, 111, 133)	;
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

.search-icon-shrink{
  transform: scale(0.8);
  transition: transform 0.1s ease-in-out;
}

.search-icon{
  transform: scale(1);
  transition: transform 0.15s ease-in-out;
}

</style>