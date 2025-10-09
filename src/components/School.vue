<script setup>
import { ref } from 'vue'
defineProps({
  content: String,
  onClickAdd: Function,
})

const isAdded = ref(false)
</script>
<template>
  <div class="tables">
    <div class="content">
      <div @click="onClickAdd" class="add">
        <img :src="!isAdded ? '/img/empty.svg' : '/img/added.svg'" />
        <span>Название</span>
      </div>
    </div>
    <div class="content">
      <span>Название</span>
    </div>
    <div class="content">
      <span>Адрес</span>
    </div>
    <div class="content">
      <span>Уровень образования</span>
    </div>
  </div>
</template>

<style scoped>
.tables {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.5fr;
  align-items: center;
  height: 56px;
  border-bottom: 1px solid rgba(211, 211, 222, 1);
  opacity: 1;
}

.content {
  padding: 9px 20px;
  min-width: 0;
  text-align: left;
}

.content span {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.add {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
