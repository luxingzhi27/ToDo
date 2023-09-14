<script setup lang="ts">
import {ref,onMounted} from 'vue'
import ColorThief from 'color-thief-ts'
import tinygradient from 'tinygradient'
const store=window.electron.store
const user=ref(store.get('user'))
const cardBackground = ref('rgb(76,79.105)')
const cardFontColor = ref('rgb(76,79,105)')
const isEditingName = ref(false)
const isEditingEmail = ref(false)
const isEditingPhoneNumber = ref(false)
const isEditingLocation = ref(false)

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
    if (brightness < 155) {
      cardFontColor.value = 'rgb(239, 241, 245)'
    }
  })
}

const editName = () => {
  isEditingName.value = true
}

const commitName = () => {
  isEditingName.value = false
  store.set('user.name', user.value.name)
  store.set('type', 'user')
}

const editEmail = () => {
  isEditingEmail.value = true
}

const commitEmail = () => {
  isEditingEmail.value = false
  store.set('user.email', user.value.email)
  store.set('type', 'user')
}

const editPhoneNumber = () => {
  isEditingPhoneNumber.value = true
}

const commitPhoneNumber = () => {
  isEditingPhoneNumber.value = false
  store.set('user.phoneNumber', user.value.phoneNumber)
  store.set('type', 'user')
}

const editLocation = () => {
  isEditingLocation.value = true
}

const commitLocation = () => {
  isEditingLocation.value = false
  store.set('user.location', user.value.location)
  store.set('type', 'user')
}

const commitSex=()=>{
  if(user.sex==='male'){
    user.sex='female'
    store.set('user.sex','female')
    store.set('type','user')
  }else{
    user.sex='male'
    store.set('user.sex','male')
    store.set('type','user')
  }
}

onMounted(async () => {
  let domImg = document.querySelector('#avatar') as HTMLImageElement
  domImg.crossOrigin = ''
})
</script>

<template>
  <div style="height: 100vh;" class="person-page">
    <p class="font-bold text-3xl text-color">个人主页</p>
    <el-card class="mt-5" id="card" :style="`background:${cardBackground};`">
      <div class="flex align-middle">
        <img id="avatar" :src="user.avatar" class="mr-2.5" @load="avatarLoaded" alt=""/>
        <div class="flex flex-col ml-2.5">
          <div class="flex" style="align-items: center;">
            <el-icon :style="`color:${cardFontColor};`" class="mr-2.5"><UserFilled /></el-icon>
            <p class="text-xl font-semibold mr-2.5" :style="`color:${cardFontColor};`" @dblclick="editName" v-if="!isEditingName">{{ user.name }}</p>
            <el-input v-if="isEditingName" placeholder="请输入新的姓名" v-model="user.name" size="small" class="mr-2.5" @change="commitName"></el-input>
            <el-icon v-if="user.sex==='male'" style="color:skyblue" @click="commitSex"><Male/></el-icon>
            <el-icon v-if="user.sex==='female'" style="color: pink;" @click="commitSex"><Female/></el-icon>
          </div>
          <div class="flex" style="align-items: center;">
            <el-icon :style="`color:${cardFontColor};`" class="mr-2.5"><Message /></el-icon>
            <p class="font-semibold" :style="`color:${cardFontColor};`" @dblclick="editEmail" v-if="!isEditingEmail">{{ user.email }}</p>
            <el-input v-if="isEditingEmail" placeholder="请输入新的邮箱地址" v-model="user.email" size="small" class="mr-2.5" @change="commitEmail"></el-input>
          </div>
          <div class="flex" style="align-items: center;">
            <el-icon :style="`color:${cardFontColor};`" class="mr-2.5"><Phone /></el-icon>
            <p class="font-semibold" :style="`color:${cardFontColor};`" @dblclick="editPhoneNumber" v-if="!isEditingPhoneNumber">{{ user.phoneNumber }}</p>
            <el-input v-if="isEditingPhoneNumber" placeholder="请输入新的电话号码" v-model="user.phoneNumber" size="small" class="mr-2.5" @change="commitPhoneNumber"></el-input>
          </div>
          <div class="flex" style="align-items: center;">
            <el-icon :style="`color:${cardFontColor};`" class="mr-2.5" @dblclick="editLocation" v-if="!isEditingLocation"><Location /></el-icon>
            <p class="font-semibold" :style="`color:${cardFontColor};`">{{ user.location }}</p>
            <el-input v-if="isEditingLocation" placeholder="请输入新的地址" v-model="user.location" size="small" class="mr-2.5" @change="commitLocation"></el-input>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>

#card:hover{
  transform: scale(1.02);
}
.person-page{
  animation: fade-in 0.6s ease-in-out forwards;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

#avatar{
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
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