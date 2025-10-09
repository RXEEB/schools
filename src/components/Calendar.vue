<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  img: String,
})

const formatDate = (date = new Date()) => {
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const CURRENT_DATE = ref(formatDate())
</script>
<template>
  <div class="sort">
    <span>{{ CURRENT_DATE }}</span>
    <img class="img-search" src="/img/calendar.svg" alt="icon" />
  </div>
</template>

<style scoped>
.sort {
  display: flex;
  justify-content: space-between;
  position: relative;
  display: flex;
  width: 517px;
  height: 56px;
  align-items: center;
  padding: 0 20px;
  border-radius: 10px;
  opacity: 1;
  border: 1px solid rgba(211, 211, 222, 1);
  cursor: pointer;
}
</style>
