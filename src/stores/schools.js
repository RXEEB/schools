import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { schoolsApi } from '@/api/schoolsApi'

export const useSchoolsStore = defineStore('schools', () => {
  const schools = ref([])
  const loading = ref(false)

  const fetchSchools = async (
    federal_district_id = null,
    region_id = null,
    search = null,
    page = 1,
  ) => {
    loading.value = true
    try {
      const response = await schoolsApi.getSchools(federal_district_id, region_id, search, page)
      schools.value = response.list.map(school => ({
        ...school,
        // isAdded: false,
      }))
    } catch (error) {
    } finally {
      loading.value = false
    }
  }

  const toggleSchool = schoolId => {
    const school = schools.value.find(s => s.uuid === schoolId)
    if (school) {
      school.isAdded = !school.isAdded
    }
  }

  return {
    schools,
    loading,
    fetchSchools,
    toggleSchool,
  }
})
