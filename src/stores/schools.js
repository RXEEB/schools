import { defineStore } from 'pinia'
import { ref } from 'vue'
import { schoolsApi } from '@/api/schoolsApi'

export const useSchoolsStore = defineStore('schools', () => {
  const schools = ref([])
  const loading = ref(false)

  const fetchSchools = async () => {
    loading.value = true
    try {
      const response = await schoolsApi.getSchools()
      schools.value = response.data.list.map((school) => ({
        ...school,
        isAdded: false,
      }))
    } catch (error) {
      console.error(' Ошибка загрузки школ:', error)
    } finally {
      loading.value = false
    }
  }

  //   const selectAll = () => {
  //     schools.value = schools.value.map((school) => ({
  //       ...school,
  //       isAdded: true,
  //     }))
  //   }

  //   const deselectAll = () => {
  //     schools.value = schools.value.map((school) => ({
  //       ...school,
  //       isAdded: false,
  //     }))
  //   }

  const toggleSchool = (schoolId) => {
    const school = schools.value.find((s) => s.uuid === schoolId)
    if (school) {
      school.isAdded = !school.isAdded
    }
  }

  return {
    schools,
    loading,
    fetchSchools,
    toggleSchool,
    // selectAll,
    // deselectAll,
  }
})
