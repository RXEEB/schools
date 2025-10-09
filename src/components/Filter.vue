<script setup>
import { ref, defineProps, computed } from 'vue'

const props = defineProps({
  title: String,
  regions: {
    type: Array,
    default: () => [],
  },
  districts: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const items = computed(() => {
  if (props.title.includes('регион') && props.regions) {
    return props.regions
  } else if (props.title.includes('округ') && props.districts) {
    return props.districts
  }
  return []
})

const isPopupVisible = ref(false)

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value
}
</script>

<template>
  <div class="sort" @click="togglePopup">
    <span>{{ title }}</span>
    <img :src="!isPopupVisible ? '/img/arrow-down.svg' : '/img/arrow-up.svg'" />

    <div v-if="isPopupVisible" class="popup">
      <div class="popup-content">
        <div class="status-message">
          {{ loading ? 'Загрузка...' : items.length === 0 ? 'Нет данных' : '' }}
        </div>
        <div @click="togglePopup" v-for="item in items" :key="item.id" class="popup-item">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 517px;
  height: 56px;
  padding: 0 20px;
  border-radius: 10px;
  opacity: 1;
  border: 1px solid rgba(211, 211, 222, 1);
  cursor: pointer;
  position: relative;
}

.popup {
  position: absolute;
  max-height: 482px;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid rgba(211, 211, 222, 1);
  border-radius: 16px;
  margin-top: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;
}

.popup-content {
  padding: 15px;
}

.popup-item {
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.popup-item:hover {
  background: #f5f5f5;
}

.popup-item:last-child {
  border-bottom: none;
}
</style>
