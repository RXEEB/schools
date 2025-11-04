<script setup>
import { onMounted } from 'vue'
import { useSchoolsStore } from '../stores/schools'
import { useFiltersStore } from '../stores/filters'
import Pagination from '../components/Pagination.vue'

import TopContent from '../components/TopContent.vue'
import Filter from '../components/Filter.vue'
import Calendar from '../components/Calendar.vue'
import Table from '../components/TableComponent/Table.vue'

const schoolsStore = useSchoolsStore()
const filtersStore = useFiltersStore()

const handlePageChange = page => {
  schoolsStore.changePage(page)
}

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
      <Calendar />
      <Filter
        title="Сортировка по регионам"
        :regions="filtersStore.regions"
        :loading="filtersStore.loadingRegions"
        :search="true"
      />
      <Filter
        title="Сортировка по федеральным округам"
        :districts="filtersStore.districts"
        :loading="filtersStore.loadingDistricts"
      />
    </div>
    <Table />
    <div class="pagination">
      <Pagination
        :current-page="schoolsStore.currentPage"
        :total-items="schoolsStore.totalItems"
        :items-per-page="schoolsStore.itemsPerPage"
        :on-page-change="handlePageChange"
        v-if="schoolsStore.totalItems > schoolsStore.itemsPerPage"
      />
    </div>
  </div>
</template>
<style scoped>
.container {
  align-items: center;
  width: 1632px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}
.filters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
@media screen and (max-width: 600px) {
  .container {
    padding: 0px;
    width: auto;
  }
  .filters {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 601px) and (max-width: 768px) {
  .container {
    width: auto;
  }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    width: auto;
  }
}
@media (min-width: 1025px) and (max-width: 1370px) {
  .container {
    width: auto;
  }
}
</style>
