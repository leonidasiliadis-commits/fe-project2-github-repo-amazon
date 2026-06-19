<script setup>
import { nextTick, ref } from 'vue'
import { useTaskStore } from '../store/task'

const props = defineProps({
  task: Object
})

const taskStore = useTaskStore()

const isEditing = ref(false)
const editedTitle = ref('')
const inputRef = ref(null)

const startEdit = async () => {
  editedTitle.value = props.task.title
  isEditing.value = true

  await nextTick()
  inputRef.value?.focus()
}

const cancelEdit = () => {
  editedTitle.value = props.task.title
  isEditing.value = false
}

const saveEdit = async () => {
  if (!editedTitle.value.trim()) {
    cancelEdit()
    return
  }

  if (editedTitle.value.trim() !== props.task.title) {
    await taskStore.updateTask(props.task.id, editedTitle.value)
  }

  isEditing.value = false
}
</script>

<template>
  <div class="task-card">
    <button
      class="task-check"
      :class="{ active: task.done }"
      @click="taskStore.toggleTask(task)"
    >
      ✓
    </button>

    <input
      v-if="isEditing"
      ref="inputRef"
      v-model="editedTitle"
      class="edit-input"
      @keyup.enter="saveEdit"
      @keyup.esc="cancelEdit"
    />

    <p v-else :class="{ done: task.done }">
      {{ task.title }}
    </p>

    <button
      v-if="isEditing"
      class="icon-btn"
      @click="saveEdit"
    >
      ✓
    </button>

    <button
      v-else
      class="icon-btn"
      @click="startEdit"
    >
      ✎
    </button>

    <button
      class="icon-btn"
      @click="taskStore.removeTask(task.id)"
    >
      🗑
    </button>
  </div>
</template>