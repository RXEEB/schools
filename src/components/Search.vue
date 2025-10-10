<script setup>
import { ref } from 'vue'
import { useSchoolsStore } from '@/stores/schools'

const schoolsStore = useSchoolsStore()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    schoolsStore.fetchSchools(null, null, searchQuery.value.trim())
    searchQuery.value = ''
  } else {
    schoolsStore.fetchSchools()
  }
}

const handleClear = () => {
  searchQuery.value = ''
  schoolsStore.fetchSchools()
}
</script>

<template>
  <div class="search-block">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Поиск школ..."
      @keyup.enter="handleSearch"
      class="search"
    />
    <img class="img-search" src="/img/search.svg" alt="icon" @click="handleSearch" />
  </div>
</template>
<style scoped>
.search-block {
  position: relative;
}

.search {
  border: 1px solid rgba(211, 211, 222, 1);
  width: 300px;
  height: 56px;
  padding-left: 20px;
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
.img-search {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
