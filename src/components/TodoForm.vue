<template>
  <form class="todo-form" @submit.prevent="onSubmit">
    <UiInput
        v-model="taskTitle"
        placeholder="Добавить новую задачу"
        class="task-input"
    />
    <UiButton type="submit">Добавить задачу</UiButton>
  </form>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import UiInput from '@/components/Ui/UiInput.vue'
import UiButton from '@/components/Ui/UiButton.vue'

const emit = defineEmits<{ (event: 'add', payload: { title: string }): void }>()

const taskTitle = ref('')

function onSubmit(): void {
  const title = taskTitle.value.trim()

  if (!title) return
  emit('add', { title })
  taskTitle.value = ''
}
</script>

<style lang="scss" scoped>
.todo-form {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: $spacing-unit * 2;
  width: 100%;

  .task-input {
    width: 100%;
  }

  button {
    align-self: start;
    height: 100%;
  }
}

@media all and (max-width: $mobile-breakpoint) {
  .todo-form {
    grid-template-columns: 1fr;
  }
}
</style>
