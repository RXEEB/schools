import apiClient from './axios'

export const schoolsApi = {
  async getSchools(federal_district_id = null, region_id = null, search = null) {
    const params = {
      count: 8,
      page: 1,
    }

    if (federal_district_id) {
      params.federal_district_id = federal_district_id
    }

    if (region_id) {
      params.region_id = region_id
    }

    if (search) {
      params.search = search
    }

    try {
      const response = await apiClient.get('/schools', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },
}
