<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../store/task'

const taskStore = useTaskStore()
const newTask = ref('')

const add = async () => {
  await taskStore.addTask(newTask.value)
  newTask.value = ''
}
</script>

<template>
  <div class="new-task">
    <input
      v-model="newTask"
      placeholder="write your next task"
      @keyup.enter="add"
    />

    <button @click="add">
      +
    </button>
  </div>
</template>