<script setup lang="ts">
import {ref,onMounted} from 'vue'
import { v4 as uuid } from 'uuid'
import ColorThief from 'color-thief-ts'
import tinygradient from 'tinygradient'
const store=window.electron.store
const user=ref(store.get('user'))
if(user.value.description===null||user.value.description.length===0){
  user.value.description='点击此处输入今日心情'
}
console.log(user.value.avatar)
const cardBackground = ref('rgb(76,79.105)')
const cardFontColor = ref('rgb(76,79,105)')
const isEditingName = ref(false)
const isEditingEmail = ref(false)
const isEditingPhoneNumber = ref(false)
const isEditingLocation = ref(false)
const isEditingDescription = ref(false)
const isMale=ref(user.sex==='male'?true:false)

function getImageBrightness(imgElement: HTMLImageElement, callback: (brightness: number) => void) {
  const canvas = document.createElement('canvas')
  canvas.width = imgElement.width
  canvas.height = imgElement.height

  const ctx = canvas.getContext('2d')!
  ctx.drawImage(imgElement, 0, 0)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  let r, g, b, avg

  let colorSum = 0
  for (let x = 0, len = data.length; x < len; x += 4) {
    r = data[x]
    g = data[x + 1]
    b = data[x + 2]

    avg = Math.floor((r + g + b) / 3)
    colorSum += avg
  }

  const brightness = Math.floor(colorSum / (imgElement.width * imgElement.height))
  callback(brightness)
}

const avatarLoaded = () => {
  let domImg = document.querySelector('#avatar') as HTMLImageElement
  let colorThief = new ColorThief()
  let colors = colorThief.getPalette(domImg, 2)
  colors = [colors[0], colors[1]]
  let gradients = tinygradient(colors.map((v) => v.toString()))
  cardBackground.value = gradients.css()
  getImageBrightness(domImg, (brightness) => {
    if (brightness < 300) {
      cardFontColor.value = 'rgb(239, 241, 245)'
    }
  })
}

const editName = () => {
  isEditingName.value = true
  isEditingEmail.value = false
  isEditingPhoneNumber.value = false
  isEditingLocation.value = false
}

const editDescription = () => {
  isEditingDescription.value = true
  isEditingEmail.value = false
  isEditingPhoneNumber.value = false
  isEditingLocation.value = false
  isEditingName.value = false
}

const commitDescription = () => {
  if(user.value.description.length===0){
    return
  }
  isEditingDescription.value = false
  store.set('user.description', user.value.description)
  store.set('type', 'user')
}

const commitName = () => {
  if(user.value.name.length===0){
    return
  }
  isEditingName.value = false
  store.set('user.name', user.value.name)
  store.set('type', 'user')
}

const editEmail = () => {
  isEditingEmail.value = true
  isEditingLocation.value = false
  isEditingPhoneNumber.value = false
  isEditingName.value = false
}

const commitEmail = () => {
  if(user.value.email.length===0){
    return
  }
  isEditingEmail.value = false
  store.set('user.email', user.value.email)
  store.set('type', 'user')
}

const editPhoneNumber = () => {
  isEditingPhoneNumber.value = true
  isEditingEmail.value = false
  isEditingLocation.value = false
  isEditingName.value = false
}

const commitPhoneNumber = () => {
  if(user.value.phoneNumber.length===0){
    return
  }
  isEditingPhoneNumber.value = false
  store.set('user.phoneNumber', user.value.phoneNumber)
  store.set('type', 'user')
}

const editLocation = () => {
  isEditingLocation.value = true
  isEditingEmail.value = false
  isEditingPhoneNumber.value = false
  isEditingName.value = false
}

const commitLocation = () => {
  if(user.value.location.length===0){
    return
  }
  isEditingLocation.value = false
  store.set('user.location', user.value.location)
  store.set('type', 'user')
}

const commitSex=()=>{
  if(user.sex==='male'){
    user.sex='female'
    store.set('user.sex','female')
    store.set('type','user')
    isMale.value=false
  }else{
    user.sex='male'
    store.set('user.sex','male')
    store.set('type','user')
    isMale.value=true
  }
}


const uid = ref(uuid())
const changeAvatar=()=>{
  document.getElementById(`uploader-${uid.value}`).click()
}

const handleAvatarChange = (e) => {
  window.electron.changeAvatar(e)
  window.location.reload()
};

onMounted(async () => {
  let domImg = document.querySelector('#avatar') as HTMLImageElement
  domImg.crossOrigin = ''
})
</script>

<template>
  <div style="height: 100vh; position: relative;" class="person-page mx-5">
    <p class="font-bold text-3xl" style="color: rgb(108, 111, 133);">个人主页</p>
    <el-card class="mt-5 card"  :style="`background:${cardBackground};`">
      <div class="flex align-middle">
        <img id="avatar" :src="user.avatar" @click="changeAvatar" class="mr-2.5" @load="avatarLoaded" alt=""/>
        <div class="flex flex-col ml-2.5" :style="{'--card-font-color':cardFontColor}">
          <div class="flex" style="align-items: center;">
            <el-icon :style="`color:${cardFontColor};`" class="mr-2.5"><UserFilled /></el-icon>
            <div class="flex p-1 person-data">
              <p class="text-xl font-semibold mr-2.5" :style="`color:${cardFontColor};`" @dblclick="editName" v-if="!isEditingName">{{ user.name }}</p>
              <el-input v-if="isEditingName" placeholder="请输入新的姓名" v-model="user.name" size="small" class="mr-2.5" @keyup.enter="commitName" @blur="commitName"></el-input>
            </div>
            <div class="sex-icon flex p-1">
              <el-icon v-if="isMale" style="color:skyblue" @click="commitSex"><Male/></el-icon>
              <el-icon v-if="!isMale" style="color: pink;" @click="commitSex"><Female/></el-icon>
            </div>
          </div>
          <div class="flex" style="align-items: center;">
            <el-icon :style="`color:${cardFontColor};`" class="mr-2.5"><Message /></el-icon>
            <div class="person-data p-1 flex">
              <p class="font-semibold" :style="`color:${cardFontColor};`" @dblclick="editEmail" v-if="!isEditingEmail">{{ user.email }}</p>
              <el-input v-if="isEditingEmail" placeholder="请输入新的邮箱地址" v-model="user.email" size="small" class="mr-2.5" @blur="commitEmail" @keyup.enter="commitEmail" ></el-input>
            </div>
          </div>
          <div class="flex" style="align-items: center;">
            <el-icon :style="`color:${cardFontColor};`" class="mr-2.5"><Phone /></el-icon>
            <div class="flex p-1 person-data">
              <p class="font-semibold" :style="`color:${cardFontColor};`" @dblclick="editPhoneNumber" v-if="!isEditingPhoneNumber">{{ user.phoneNumber }}</p>
              <el-input v-if="isEditingPhoneNumber" placeholder="请输入新的电话号码" v-model="user.phoneNumber" size="small" class="mr-2.5" @keyup.enter="commitPhoneNumber" @blur="commitPhoneNumber"></el-input>
            </div>
          </div>
          <div class="flex" style="align-items: center;">
            <el-icon :style="`color:${cardFontColor};`" class="mr-2.5"><Location /></el-icon>
            <div class="flex p-1 person-data">
              <p class="font-semibold" :style="`color:${cardFontColor};`" @dblclick="editLocation" v-if="!isEditingLocation">{{ user.location }}</p>
              <el-input v-if="isEditingLocation" placeholder="请输入新的地址" v-model="user.location" size="small" class="mr-2.5" @keyup.enter="commitLocation" @blur="commitLocation"></el-input>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="mt-2.5 card" :style="`background:${cardBackground};--card-font-color:${cardFontColor}`">
        <p class="text-2xl font-semibold mb-2" :style="`color:${cardFontColor}`">今日心情</p>
        <p class="description" :style="`color:${cardFontColor}`" @dblclick="editDescription" v-if="!isEditingDescription">{{ user.description.length }}</p>
        <el-input v-if="isEditingDescription" placeholder="请录入今日的感想吧" v-model="user.description" autosize @keyup.enter="commitDescription" @blur="commitDescription" type="textarea"></el-input>
    </el-card>
    <input
      type="file"
      style="display: none"
      accept="image/*"
      :id="`uploader-${uid}`"
      :on-change="handleAvatarChange"
    />
  </div>
</template>

<style scoped>

.description{
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: break-all;
}

.description::first-letter{
  float: left;
  font-size: 2.5em;
  text-transform: uppercase;
  margin-right: 0.1em;
  line-height: 1.2em;
}

.description:hover{
  cursor: pointer;
}

.card{
  max-width: 100%;
}

.card:hover{
  transform: scale(1.02);
}
.person-page{
  animation: fade-in 0.6s ease-in-out forwards;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.person-data{
  transition: background-color 0.3s ease-in-out;
  border-radius: 7%;
  justify-content: center;
  align-items: center;
}

.person-data:hover{
  cursor: pointer;
}

.sex-icon{
  transition: background-color 0.3s ease-in-out;
  border-radius: 20%;
  justify-content: center;
  align-items: center;
}

.sex-icon:hover{
  cursor: pointer;
  background-color: rgb(114, 135, 253,0.2);
}

.el-input {
  --el-input-text-color:var(--card-font-color);
  --el-input-bg-color:(0, 0, 0, 0);
  --el-input-border-color:rgb(204, 208, 218);  
  /*获取焦点后的边框颜色*/  
  --el-input-focus-border-color:rgb(114, 135, 253);
  /*鼠标悬停边框颜色*/  
  --el-input-hover-border-color:rgb(108, 111, 133)	;
}

.el-textarea {
  --el-input-text-color:var(--card-font-color);
  --el-input-bg-color:(0, 0, 0, 0);
  --el-input-border-color:rgb(204, 208, 218);  
  /*获取焦点后的边框颜色*/  
  --el-input-focus-border-color:rgb(114, 135, 253);
  /*鼠标悬停边框颜色*/  
  --el-input-hover-border-color:rgb(108, 111, 133)	;
  font-size: 1rem;
}

#avatar{
  width: 125px;
  height: 125px;
  object-fit: cover;
  border-radius: 50%;
}

#avatar:hover{
  cursor: pointer;
}

@keyframes fade-in{
  0%{
    transform: scale(0.9);
    opacity: 0;
  }
  100%{
    transform: scale(1);
    opacity: 1;
  }
}
</style>