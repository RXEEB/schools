<script setup>
import { onMounted } from 'vue'
import { useSchoolsStore } from '@/stores/schools'
import { useFiltersStore } from '@/stores/filters'

import TopContent from '../TopContent.vue'
import Filter from '../Filter.vue'
import Calendar from '../Calendar.vue'
import Table from '../Table.vue'

const schoolsStore = useSchoolsStore()
const filtersStore = useFiltersStore()

onMounted(() => {
  schoolsStore.fetchSchools()
  filtersStore.fetchRegions()
  filtersStore.fetchDistricts()
})
</script>

<template>
  <div class="container">
    <TopContent title="Таблица учреждений" />
    <div class="filters">
      <Calendar title="09 января 2024 - 15 января 2024" />
      <Filter
        title="Сортировка по регионам"
        :regions="filtersStore.regions"
        :loading="filtersStore.loadingRegions"
      />
      <Filter
        title="Сортировка по федеральным округам"
        :districts="filtersStore.districts"
        :loading="filtersStore.loadingDistricts"
      />
    </div>
    <Table />
  </div>
</template>
<style scoped>
.filters {
  display: flex;
  justify-content: space-between;
  padding: 0 auto;
  gap: 2rem;
}
</style>
