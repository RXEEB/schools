import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { regionsApi } from '@/api/regionsApi'
import { districtsApi } from '@/api/districtsApi'

export const useFiltersStore = defineStore('filters', () => {
  const regions = ref([])
  const districts = ref([])
  const loadingRegions = ref(false)
  const loadingDistricts = ref(false)
  const selectedDistrict = ref(null)
  const selectedRegion = ref(null)

  const getCurrentDistrictId = () => selectedDistrict.value?.id || null
  const getCurrentRegionId = () => selectedRegion.value?.id || null

  const clearAllFilters = () => {
    selectedDistrict.value = null
    selectedRegion.value = null
  }

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

  const selectDistrict = district => {
    selectedDistrict.value = district
  }

  const selectRegion = region => {
    selectedRegion.value = region
  }

  const clearDistrict = () => {
    selectedDistrict.value = null
  }

  const clearRegion = () => {
    selectedRegion.value = null
  }

  return {
    regions,
    districts,
    loadingRegions,
    loadingDistricts,
    selectedDistrict,
    selectedRegion,
    getCurrentDistrictId,
    getCurrentRegionId,
    clearAllFilters,
    selectDistrict,
    selectRegion,
    clearDistrict,
    clearRegion,
    fetchRegions,
    fetchDistricts,
  }
})
