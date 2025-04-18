<template>
  <div class="filter-controls">
    <button
        type="button"
        :class="{ active: filter === 'all' }"
        @click="$emit('update:modelValue', 'all')"
    >
      Все ({{ total }})
    </button>
    <button
        type="button"
        :class="{ active: filter === 'active' }"
        @click="$emit('update:modelValue', 'active')"
    >
      Активные ({{ activeCount }})
    </button>
    <button
        type="button"
        :class="{ active: filter === 'completed' }"
        @click="$emit('update:modelValue', 'completed')"
    >
      Выполненные ({{ completedCount }})
    </button>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

const props = defineProps<{
  modelValue: 'all' | 'active' | 'completed'
  total: number
  activeCount: number
  completedCount: number
}>()

defineEmits<{
  (e: 'update:modelValue', v: typeof props.modelValue): void
}>()

const filter = computed(() => props.modelValue)
</script>

<style lang="scss" scoped>
@use 'sass:color';

.filter-controls {
  display: flex;
  gap: $spacing-unit;
  margin-bottom: $spacing-unit * 2;

  button {
    padding: $spacing-unit $spacing-unit * 2;
    border: none;
    border-radius: $radius;
    background-color: $color-border;
    color: $color-text;
    cursor: pointer;
    transition: background-color 0.2s;

    &.active {
      background-color: $color-primary;
      color: #fff;
    }

    &:not(.active):hover {
      background-color: color.adjust($color-border, $lightness: -10%);
    }
  }
}

@media all and (max-width: $mobile-breakpoint) {
  .filter-controls {
    font-size: $font-size-mobile;
    flex-wrap: wrap;
  }
}
</style>
