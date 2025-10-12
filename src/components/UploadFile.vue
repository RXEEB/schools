<script setup>
import { useSelectedSchoolsStore } from '@/stores/selectedSchools'

const selectedSchoolsStore = useSelectedSchoolsStore()

defineProps({
  variant: String,
  slot: Number,
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (selectedSchoolsStore.selectedCount === 0) {
    alert('Нет выбранных школ для экспорта')
    return
  }

  exportToCSV()
  emit('click')
}

const exportToCSV = () => {
  const headers = ['Название школы', 'Регион', 'Адрес', 'Телефон', 'UUID']

  const csvData = selectedSchoolsStore.selectedSchools.map(school => [
    `"${(school.edu_org.short_name || school.edu_org.full_name).replace(/"/g, '""')}"`,
    `"${school.edu_org.region.name.replace(/"/g, '""')}"`,
    `"${school.edu_org.contact_info.post_address.replace(/"/g, '""')}"`,
    `"${(school.edu_org.contact_info?.phone || '').replace(/"/g, '""')}"`,
    school.uuid,
  ])

  const csvContent = ['\uFEFF', headers.join(','), ...csvData.map(row => row.join(','))].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `школы_${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
</script>

<template>
  <div class="container">
    <img class="img-btn" src="/img/ul-icon.svg" alt="icon" />
    <button @click="handleClick" class="button" :class="variant">
      <slot>Скачать ({{ selectedSchoolsStore.selectedCount }})</slot>
    </button>
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

.button {
  width: 160px;
  height: 56px;
  opacity: 1;
  border-radius: 10px;
  font-weight: 400;
  font-size: 15px;
  line-height: 130%;
  letter-spacing: 0px;
  text-align: center;
  background: rgba(51, 211, 94, 1);
  border: none;
  cursor: pointer;
}

.img-btn {
  position: absolute;
  left: 0.5rem;
  top: 0.75rem;
}
.button:hover {
  background: rgba(36, 193, 78, 1);
}
</style>
