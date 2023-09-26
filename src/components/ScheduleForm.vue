<script setup lang="ts">
import { ref,reactive,watch, onMounted } from 'vue';
const store=window.electron.store
const drawer=ref(false)

const colors={
  1:'rgb(64, 160, 43)',
  2:'rgb(4, 165, 229)',
  3:'rgb(114, 135, 253)',
  4:'rgb(254, 100, 11)',
  5:'rgb(210, 15, 57)'
}

const props=defineProps(
  {
    scheduleId:{
      type:Number,
      default:-1
    }
  }
)

const emit=defineEmits(['close','change'])

const onSubmit=()=>{
  if(new Date(scheduleForm.date).getTime()>new Date(scheduleForm.endDate).getTime()){
    console.log('start date is bigger than end date')
    return
  }
  const schedules=ref(store.get('user.schedules'))
  if(props.scheduleId===-1){
    schedules.value.push({
      id:schedules.value.length,
      title:scheduleForm.title,
      description:scheduleForm.description,
      date:scheduleForm.date,
      endDate:scheduleForm.endDate,
      importance:scheduleForm.importance
    })
  }else{
    schedules.value[props.scheduleId]={
      id:props.scheduleId,
      title:scheduleForm.title,
      description:scheduleForm.description,
      date:scheduleForm.date,
      endDate:scheduleForm.endDate,
      importance:scheduleForm.importance
    }
  }
  store.set('user.schedules',JSON.parse(JSON.stringify(schedules.value)))
  emit('change')
  closeDrawer()
}

const scheduleForm=reactive({
  title:"",
  description:"",
  date:"",
  endDate:"",
  importance:0
})


const shortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '明天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '后天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 2)
      return date
    },
  },
]

const handleBeforeClose = (done: () => void) => {
  done()
}

const closeDrawer=()=>{
  emit('close')
}

const handleOpen= ()=>{
  const schedules=ref(store.get('user.schedules'))
  if(props.scheduleId!==-1){
    scheduleForm.title=schedules.value[props.scheduleId].title
    scheduleForm.description=schedules.value[props.scheduleId].description
    scheduleForm.date=schedules.value[props.scheduleId].date
    scheduleForm.endDate=schedules.value[props.scheduleId].endDate
    scheduleForm.importance=schedules.value[props.scheduleId].importance
  }else{
    scheduleForm.title=""
    scheduleForm.description=""
    scheduleForm.date=""
    scheduleForm.endDate=""
    scheduleForm.importance=0
  }
}

</script>

<template>
  <el-drawer
    v-model="drawer"
    title="添加日程"
    :direction="'rtl'"
    :before-close="handleBeforeClose"
    @open="handleOpen"
  >
    <el-form :model="scheduleForm">
      <el-form-item label="标题" required>
        <el-input :size="'small'" v-model="scheduleForm.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述" required>
        <el-input :size="'small'" v-model="scheduleForm.description" autosize  type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="开始日期" required>
        <el-date-picker
          v-model="scheduleForm.date"
          :shortcuts="shortcuts"
          type="date"
          placeholder="选择日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期" required>
        <el-date-picker
          v-model="scheduleForm.endDate"
          :shortcuts="shortcuts"
          type="date"
          placeholder="选择日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="重要程度" required>
        <el-rate
         v-model="scheduleForm.importance"
         :colors="colors"
         ></el-rate>
      </el-form-item>
      <el-form-item>
        <el-row class="w-full">
          <el-button @click="onSubmit" color="rgb(114, 135, 253)" class="ml-5 mr-2.5">创建日程</el-button>
          <el-button @click="closeDrawer" color="rgb(114,135,253)" class="mx-2.5">取消</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>


.el-input {
  --el-input-border-color:rgb(204, 208, 218);  
  /*获取焦点后的边框颜色*/  
  --el-input-focus-border-color:rgb(114, 135, 253);
  /*鼠标悬停边框颜色*/  
  --el-input-hover-border-color:rgb(108, 111, 133)	;
}

:deep(.el-date-editor) {
  --el-input-border-color:rgb(204, 208, 218);  
  /*获取焦点后的边框颜色*/  
  --el-input-focus-border-color:rgb(114, 135, 253);
  --el-input-focus-border:rgb(114, 135, 253);
  /*鼠标悬停边框颜色*/  
  --el-input-hover-border-color:rgb(108, 111, 133)	;
}
</style>