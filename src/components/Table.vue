<script setup>
import SchoolsList from './SchoolsList.vue'
import { useSchoolsStore } from '@/stores/schools'

const schoolsStore = useSchoolsStore()

const handlePageChange = page => {
  console.log('Переход на страницу:', page)
}
</script>
<template>
  <div class="container">
    <div class="head">
      <div class="title">
        <h4>Регион</h4>
      </div>
      <div class="title">
        <h4>Название</h4>
      </div>
      <div class="title">
        <h4>Адрес</h4>
      </div>
      <div class="title">
        <h4>Уровень образования</h4>
      </div>
    </div>
    <div class="table">
      <SchoolsList :schools="schoolsStore.schools" />
      <div class="pagination"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 20px;
}

.head {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.5fr;
  align-items: center;
  height: 56px;
  background-color: rgba(240, 240, 247, 1);
  opacity: 1;
}

.title {
  padding: 9px 20px;
  min-width: 0;
  text-align: left;
}

.title h4 {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.pagination {
  margin-top: 20px;
}
</style>
