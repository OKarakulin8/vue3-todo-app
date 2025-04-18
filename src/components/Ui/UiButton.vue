<template>
  <button
      :type="type"
      class="ui-button"
      @click="$emit('click', $event)"
  >
    <slot/>
  </button>
</template>

<script lang="ts" setup>
defineProps<{ type?: 'button' | 'submit' | 'reset' }>()
defineEmits<{
  (eventName: 'click', mouseEvent: MouseEvent): void
}>()
</script>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: $color-primary;
  color: #fff;
  border: none;
  border-radius: $radius;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: $color-primary-hover;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
}
</style>
