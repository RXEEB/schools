<script setup>
defineProps({
  variant: String,
  slot: Number,
})
</script>

<template>
  <div class="container">
    <img class="img-btn" src="/img/ul-icon.svg" alt="icon" />
    <button @click="$emit('click')" class="button" :class="variant">
      <slot>Скачать</slot>
    </button>
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

.button {
  width: 147px;
  height: 56px;
  opacity: 1;
  padding: 9px 11px;
  border-radius: 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0px;
  text-align: center;
  background: rgba(51, 211, 94, 1);
  border: none;
  cursor: pointer;
}

.img-btn {
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
}
.button:hover {
  background: rgba(36, 193, 78, 1);
}
</style>
