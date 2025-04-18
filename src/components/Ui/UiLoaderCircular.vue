<template>
  <div class="loader-overlay">
    <svg class="circular-loader" viewBox="25 25 50 50">
      <circle
          class="loader-path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
      />
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.loader-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.circular-loader {
  width: 3rem;
  height: 3rem;
  color: $color-primary;
  animation: rotate 2s linear infinite;
}

.loader-path {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite,
  colorShift 6s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

@keyframes colorShift {
  0%, 40% {
    stroke: $color-primary;
  }
  80%, 90% {
    stroke: $color-primary-hover;
  }
}
</style>
