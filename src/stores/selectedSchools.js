import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSelectedSchoolsStore = defineStore('selectedSchools', () => {
  const selectedSchools = ref([])

  const addSchool = school => {
    if (!selectedSchools.value.find(s => s.uuid === school.uuid)) {
      selectedSchools.value.push({
        ...school,
        addedAt: new Date().toISOString(),
      })
    }
  }

  const removeSchool = schoolId => {
    const index = selectedSchools.value.findIndex(s => s.uuid === schoolId)
    if (index !== -1) {
      selectedSchools.value.splice(index, 1)
    }
  }

  const toggleSchool = school => {
    const isSelected = selectedSchools.value.find(s => s.uuid === school.uuid)
    if (isSelected) {
      removeSchool(school.uuid)
    } else {
      addSchool(school)
    }
    return !isSelected
  }

  const isSchoolSelected = schoolId => {
    return selectedSchools.value.some(s => s.uuid === schoolId)
  }

  const clearSelectedSchools = () => {
    selectedSchools.value = []
  }

  const selectedCount = computed(() => selectedSchools.value.length)

  const hasSelectedSchools = computed(() => selectedSchools.value.length > 0)

  const exportData = computed(() => {
    return selectedSchools.value.map(school => ({
      uuid: school.uuid,
      name: school.edu_org.short_name || school.edu_org.full_name,
      region: school.edu_org.region.name,
      address: school.edu_org.contact_info.post_address,
      addedAt: school.addedAt,
    }))
  })

  return {
    selectedSchools,
    selectedCount,
    hasSelectedSchools,
    exportData,
    addSchool,
    removeSchool,
    toggleSchool,
    isSchoolSelected,
    clearSelectedSchools,
  }
})
