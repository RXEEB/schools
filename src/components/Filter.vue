<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useFiltersStore } from '@/stores/filters'
import { useSchoolsStore } from '@/stores/schools'

const filtersStore = useFiltersStore()
const schoolsStore = useSchoolsStore()

const isPopupVisible = ref(false)
const sortRef = ref(null)
const searchQuery = ref('')

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
  search: {
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

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value
}

// const closePopup = () => {
//   isPopupVisible.value = false
// }

const handleItemClick = item => {
  if (props.title.includes('округ')) {
    filtersStore.selectDistrict(item)
    schoolsStore.fetchSchools(item.id, null)
    filtersStore.selectRegion(null)
  }
  if (props.title.includes('регион')) {
    filtersStore.selectRegion(item)
    schoolsStore.fetchSchools(null, item.id)
    filtersStore.selectDistrict(null)
  }
  isPopupVisible.value = false
  searchQuery.value = ''
}

const filteredItems = computed(() => {
  return items.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// const handleReset = () => {
//   if (props.title.includes('округ')) {
//     filtersStore.clearDistrict()
//     schoolsStore.fetchSchools()
//   }
//
// }

const displayTitle = computed(() => {
  if (props.title.includes('регион') && filtersStore.selectedRegion) {
    return filtersStore.selectedRegion.name
  } else if (props.title.includes('округ') && filtersStore.selectedDistrict) {
    return filtersStore.selectedDistrict.name
  }
  return props.title
})

const handleClickOutside = event => {
  if (sortRef.value && !sortRef.value.contains(event.target)) {
    isPopupVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="sort" @click="togglePopup" ref="sortRef">
    <span>{{ displayTitle }}</span>
    <img :src="!isPopupVisible ? '/img/arrow-down.svg' : '/img/arrow-up.svg'" />

    <div v-if="isPopupVisible" class="popup">
      <input
        v-if="search"
        v-model="searchQuery"
        type="text"
        placeholder="Поиск..."
        class="search-input"
        @click.stop=""
      />

      <div class="popup-content">
        <div class="popup-items">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="popup-item"
            @click="handleItemClick(item)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="status-message">
          {{ loading ? 'Загрузка...' : items.length === 0 ? 'Нет данных' : '' }}
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

  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid rgba(211, 211, 222, 1);
  border-radius: 16px;
  margin-top: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.popup-content {
  padding: 15px;
}

.popup-items {
  min-width: min-content;
  overflow-y: auto;
  padding: 15px;
  max-height: 482px;
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

.popup-item.reset {
  color: #ff4444;
  font-weight: bold;
}

.status-message {
  padding: 10px;
  text-align: center;
  color: #666;
}
.search-input {
  border: 1px solid rgba(211, 211, 222, 1);
  width: 470px;
  height: 36px;
  margin: 10px 0 0 10px;
  padding: 5px;
  border-radius: 10px;
  font-family: Inter;
  font-weight: 400;
  font-style: Regular;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0px;
  vertical-align: middle;
  outline: none;
}
</style>
