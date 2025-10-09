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
  <School v-for="school in schools" :key="school.uuid" :school="school" />
</template>
