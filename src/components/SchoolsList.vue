<script setup>
import School from './School.vue'

const onClickAdd = () => {
  isAdded.value = !isAdded.value
}
</script>

<template>
  <School :onClickAdd="onClickAdd" />
</template>
