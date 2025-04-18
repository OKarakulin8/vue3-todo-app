<template>
  <div
      class="todo-item"
      :class="{ completed: localCompleted }"
      @click="toggleCompleted"
      :title="localCompleted ? 'Возобновить задачу' : 'Завершить задачу'"
  >
    <UiCheckbox v-model="localCompleted" @click.stop/>

    <span v-if="!isEditing" class="title">{{ todo.title }}</span>
    <UiInput
        v-else
        flat
        v-model="editTitle"
        ref="inputRef"
        class="edit-input"
        @click.stop
        @keydown.enter.stop.prevent="saveEdit"
        @blur="saveEdit"
    />

    <div class="actions">
      <img
          v-if="!isEditing && !localCompleted"
          src="@/assets/icons/edit.svg"
          alt="Редактировать"
          class="icon edit"
          @click.stop="startEditing"
      />
      <img
          src="@/assets/icons/delete.svg"
          alt="Удалить"
          class="icon delete"
          @click.stop="remove"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch, nextTick} from 'vue'
import type {Todo} from '@/services/api'
import UiCheckbox from '@/components/Ui/UiCheckbox.vue'
import UiInput from '@/components/Ui/UiInput.vue'

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits<{
  (event: 'update', updatedTodo: Todo): void
  (event: 'remove', removedTodoId: number): void
}>()

const localCompleted = ref(props.todo.completed)
const isEditing = ref(false)
const editTitle = ref(props.todo.title)
const inputRef = ref<{ focus?: () => void } | null>(null)

watch(
    () => props.todo.completed,
    completed => {
      localCompleted.value = completed
    }
)

watch(
    localCompleted,
    completed => {
      emit('update', {...props.todo, completed})
    }
)

function toggleCompleted() {
  localCompleted.value = !localCompleted.value
}

function startEditing() {
  isEditing.value = true
  editTitle.value = props.todo.title
  nextTick(() => inputRef.value?.focus?.())
}

function saveEdit() {
  const trimmedTitle = editTitle.value.trim()
  if (trimmedTitle && trimmedTitle !== props.todo.title) {
    emit('update', {...props.todo, title: trimmedTitle})
  }

  isEditing.value = false
}

function remove() {
  emit('remove', props.todo.id)
}
</script>

<style lang="scss" scoped>
@use 'sass:color';

.todo-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: $spacing-unit $spacing-unit * 2;
  padding: $spacing-unit * 1.75 0;
  border-bottom: 1px solid $color-border;
  cursor: pointer;
  transition: background-color .2s, box-shadow .2s;

  &:hover {
    background: color.adjust($color-bg, $lightness: 5%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, .05);

    .ui-checkbox .checkmark {
      border-color: $color-primary-hover;
    }

    .ui-checkbox input:checked + .checkmark {
      background: $color-primary-hover;
    }
  }

  &.completed .title {
    text-decoration: line-through;
    color: $color-text-light;
  }

  :deep(.ui-checkbox) {
    align-self: start;
  }

  .title {
    min-width: 0;
    overflow-wrap: break-word;
    word-break: break-all;
  }

  .edit-input {
    height: fit-content;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .actions {
    display: flex;
    gap: $spacing-unit * 2;
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    transition: filter .2s;
  }

  .icon.edit:hover {
    filter: $color-primary-filter;
  }

  .icon.delete:hover {
    filter: $red-filter;
  }
}
</style>
