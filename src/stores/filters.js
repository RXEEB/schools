import { defineStore } from 'pinia'
import { ref } from 'vue'
import { regionsApi } from '@/api/regionsApi'
import { districtsApi } from '@/api/districtsApi'

export const useFiltersStore = defineStore('filters', () => {
  const regions = ref([])
  const districts = ref([])
  const loadingRegions = ref(false)
  const loadingDistricts = ref(false)
  const selectedDistrict = ref(null)
  const selectedRegion = ref(null)

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

  const selectDistrict = (district) => {
    selectedDistrict.value = district
  }

  const selectRegion = (region) => {
    selectedRegion.value = region
  }

  // Функция для сброса выбора округа
  const clearDistrict = () => {
    selectedDistrict.value = null
  }

  return {
    regions,
    districts,
    loadingRegions,
    loadingDistricts,
    selectDistrict,
    selectRegion,
    clearDistrict,
    fetchRegions,
    fetchDistricts,
  }
})

// // stores/filters.js
// import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import { regionsApi } from '@/api/regionsApi'
// import { districtsApi } from '@/api/districtsApi'

// export const useFiltersStore = defineStore('filters', () => {
//   const regions = ref([])
//   const districts = ref([])
//   const loadingRegions = ref(false)
//   const loadingDistricts = ref(false)

//   const selectedDistrict = ref(null)
//   const selectedRegion = ref(null)

//   const fetchRegions = async () => {
//     loadingRegions.value = true
//     try {
//       regions.value = await regionsApi.getRegions()
//       console.log('✅ Регионы загружены:', regions.value.length)
//     } catch (error) {
//       console.error('Ошибка загрузки регионов:', error)
//     } finally {
//       loadingRegions.value = false
//     }
//   }

//   const fetchDistricts = async () => {
//     loadingDistricts.value = true
//     try {
//       districts.value = await districtsApi.getDistricts()
//       console.log('✅ Округа загружены:', districts.value.length)
//     } catch (error) {
//       console.error('Ошибка загрузки округов:', error)
//     } finally {
//       loadingDistricts.value = false
//     }
//   }

//   const selectDistrict = (district) => {
//     selectedDistrict.value = district
//     console.log('🎯 Округ выбран:', district?.name)
//   }

//   const selectRegion = (region) => {
//     selectedRegion.value = region
//     console.log('🎯 Регион выбран:', region?.name)
//   }

//   const clearDistrict = () => {
//     selectedDistrict.value = null
//     console.log('🔄 Округ сброшен')
//   }

//   const clearRegion = () => {
//     selectedRegion.value = null
//     console.log('🔄 Регион сброшен')
//   }

//   return {
//     regions,
//     districts,
//     loadingRegions,
//     loadingDistricts,
//     selectedDistrict,
//     selectedRegion,
//     fetchRegions,
//     fetchDistricts,
//     selectDistrict,
//     selectRegion,
//     clearDistrict,
//     clearRegion,
//   }
// })
