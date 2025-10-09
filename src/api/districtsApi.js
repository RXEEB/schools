import apiClient from './axios'

export const districtsApi = {
  async getDistricts() {
    const response = await apiClient.get('/federalDistricts')
    return response.data.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  },
}
