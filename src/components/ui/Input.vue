<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="input"
    :placeholder="placeholder"
  />
</template>

<style scoped>
.input {
  border: 1px solid gray;
  width: 300px;
  height: 56px;
  border-radius: 10px;
}
</style>
