import { defineStore } from 'pinia'
import { ref } from 'vue'
import { regionsApi } from '@/api/regionsApi'
import { districtsApi } from '@/api/districtsApi'

export const useFiltersStore = defineStore('filters', () => {
  const regions = ref([])
  const districts = ref([])
  const loadingRegions = ref(false)
  const loadingDistricts = ref(false)

  const fetchRegions = async () => {
    loadingRegions.value = true
    try {
      regions.value = await regionsApi.getRegions()
    } catch (error) {
      console.error('Ошибка загрузки регионов:', error)
    } finally {
      loadingRegions.value = false
    }
  }

  const fetchDistricts = async () => {
    loadingDistricts.value = true
    try {
      districts.value = await districtsApi.getDistricts()
    } catch (error) {
      console.error('Ошибка загрузки округов:', error)
    } finally {
      loadingDistricts.value = false
    }
  }

  return {
    regions,
    districts,
    loadingRegions,
    loadingDistricts,
    fetchRegions,
    fetchDistricts,
  }
})
