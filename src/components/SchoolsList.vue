<script setup>
import School from './School.vue'
import { useSchoolsStore } from '@/stores/schools'

defineProps({
  schools: {
    type: Array,
    required: true,
  },
})

const schoolsStore = useSchoolsStore()
</script>

<template>
  <div class="schools-list">
    <!-- спинер -->
    <div v-if="schoolsStore.loading" class="loader-container">
      <img src="/img/spiner.gif" alt="Загрузка..." />
    </div>
    <School v-for="school in schools" :key="school.uuid" :school="school" />
  </div>
</template>
<style scoped>
.schools-list {
  position: relative;
}
.loader-container {
  position: absolute;
  top: 200px;
  left: 50%;
}
</style>
