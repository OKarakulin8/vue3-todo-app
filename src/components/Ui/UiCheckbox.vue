<template>
  <label class="ui-checkbox">
    <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span class="checkmark"></span>
    <slot/>
  </label>
</template>

<script lang="ts" setup>
defineProps<{ modelValue: boolean }>()
defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()
</script>

<style lang="scss" scoped>
.ui-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  cursor: pointer;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 1.25rem;
    height: 1.25rem;
    margin: 0;
  }

  .checkmark {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid $color-primary;
    border-radius: 4px;
    position: relative;
    transition: background-color 0.2s;
  }

  input:checked + .checkmark {
    background-color: $color-primary;
  }

  .checkmark::after {
    content: '';
    position: absolute;
    display: none;
    width: 6px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -60%) rotate(45deg);
    left: 50%;
    top: 50%;
  }

  input:checked + .checkmark::after {
    display: block;
  }
}
</style>
