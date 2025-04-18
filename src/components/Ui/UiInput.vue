<template>
  <input
      ref="inputEl"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="['ui-input', { flat }]"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
  flat?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputEl = ref<HTMLInputElement | null>(null)

defineExpose({
  focus: () => {
    inputEl.value?.focus()
  }
})
</script>

<style lang="scss" scoped>
.ui-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid $color-border;
  border-radius: $radius;
  background-color: $color-card;
  color: $color-text;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: $color-primary;
    box-shadow: 0 0 0 2px rgba($color-primary, 0.2);
  }

  &.flat {
    border: none;
    outline: none;
    background: transparent;
    padding: 0;

    &:focus {
      box-shadow: none;
    }
  }
}
</style>
