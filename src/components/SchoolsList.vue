<script setup>
import School from './School.vue'

defineProps({
  schools: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="schools-list">
    <School v-for="school in schools" :key="school.uuid" :school="school" />
  </div>
</template>
<style scoped></style>
