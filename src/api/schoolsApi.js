import apiClient from './axios'

export const schoolsApi = {
  async getSchools(filters = {}) {
    const params = {}

    if (filters.regionId) params.region_id = filters.regionId
    if (filters.districtId) params.district_id = filters.districtId
    if (filters.search) params.search = filters.search

    const response = await apiClient.get('/schools', { params })
    return response
  },
}
