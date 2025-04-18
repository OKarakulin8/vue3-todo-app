<template>
  <div class="todo-app">
    <div class="controls-panel">
      <TodoForm @add="handleAddTodo" />
    </div>

    <div class="task-panel">
      <FilterControls
          v-model="currentFilter"
          :total="totalCount"
          :active-count="activeCount"
          :completed-count="completedCount"
      />

      <div class="tasks-wrapper">
        <UiLoaderCircular v-if="isLoading" />

        <div v-else-if="loadError" class="error-message">
          Произошла ошибка, пожалуйста, обновите страницу.
        </div>

        <transition-group
            v-else
            name="task"
            tag="div"
            class="tasks"
        >
          <TodoItem
              v-for="task in orderedFilteredTasks"
              :key="task.id"
              :todo="task"
              @update="handleUpdateTodo"
              @remove="handleDeleteTodo"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Todo } from '@/services/api'
import { fetchTodos } from '@/services/api'
import TodoForm from '@/components/TodoForm.vue'
import TodoItem from '@/components/TodoItem.vue'
import FilterControls from '@/components/FilterControls.vue'
import UiLoaderCircular from '@/components/Ui/UiLoaderCircular.vue'

type FilterType = 'all' | 'active' | 'completed'

const todos = ref<Todo[]>([])
const currentFilter = ref<FilterType>('all')
const isLoading = ref(true)
const loadError = ref<string | null>(null)

const totalCount = computed(() => todos.value.length)
const activeCount = computed(() =>
    todos.value.filter(todo => !todo.completed).length
)
const completedCount = computed(() =>
    todos.value.filter(todo => todo.completed).length
)

const filteredTasks = computed<Todo[]>(() => {
  if (currentFilter.value === 'active') {
    return todos.value.filter(todo => !todo.completed)
  }
  if (currentFilter.value === 'completed') {
    return todos.value.filter(todo => todo.completed)
  }
  return todos.value
})

const orderedFilteredTasks = computed<Todo[]>(() => {
  return filteredTasks.value.slice().sort(
      (firstTodo, secondTodo) =>
          Number(firstTodo.completed) - Number(secondTodo.completed)
  )
})

function loadTodos(): void {
  const savedJson = localStorage.getItem('todos')

  if (savedJson) {
    todos.value = JSON.parse(savedJson) as Todo[]
    isLoading.value = false
  } else {
    fetchTodos()
        .then(fetchedList => {
          todos.value = fetchedList.slice(0, 10)
          updateLocalStorageTodos()
        })
        .catch(error => {
          console.error(error)
          loadError.value = error instanceof Error ? error.message : String(error)
        })
        .finally(() => {
          isLoading.value = false
        })
  }
}

function updateLocalStorageTodos(): void {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

function handleAddTodo(payload: { title: string }): void {
  const newTask: Todo = {
    id: Date.now(),
    title: payload.title,
    completed: false,
    userId: 0
  }

  todos.value.unshift(newTask)
  updateLocalStorageTodos()
}

function handleUpdateTodo(updatedTask: Todo): void {
  const existingIndex = todos.value.findIndex(
      task => task.id === updatedTask.id
  )
  if (existingIndex !== -1) {
    todos.value.splice(existingIndex, 1)
  }

  if (updatedTask.completed) {
    todos.value.push(updatedTask)
  } else {
    const firstCompletedIndex = todos.value.findIndex(
        task => task.completed
    )
    if (firstCompletedIndex === -1) {
      todos.value.push(updatedTask)
    } else {
      todos.value.splice(firstCompletedIndex, 0, updatedTask)
    }
  }

  updateLocalStorageTodos()
}

function handleDeleteTodo(taskId: number): void {
  todos.value = todos.value.filter(task => task.id !== taskId)
  updateLocalStorageTodos()
}

onMounted(loadTodos)
</script>

<style lang="scss" scoped>
$horizontal-padding: $spacing-unit * 2;
$vertical-padding: $spacing-unit * 2;

.todo-app {
  max-width: 1536px;
  margin: 0 auto;
  padding: $vertical-padding;
}

.controls-panel,
.task-panel {
  background: $color-card;
  border: 1px solid $color-border;
  border-radius: $radius;
  padding: $vertical-padding $horizontal-padding;
}

.controls-panel {
  margin-bottom: $spacing-unit * 2;
}

.tasks-wrapper {
  position: relative;
  min-height: 3.5rem;
}

.error-message {
  @include flex-align-center;

  padding: $spacing-unit;
  color: $color-error;
  text-align: center;
  width: 100%;
  height: 100%;
}

.tasks {
  display: flex;
  flex-direction: column;
}

.tasks :deep(.todo-item:last-child) {
  border-bottom: none;
}

.task-enter-from,
.task-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.task-enter-active,
.task-leave-active {
  transition: all 0.3s ease;
}
</style>
