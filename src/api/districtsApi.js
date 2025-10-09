import apiClient from './axios'

export const districtsApi = {
  async getDistricts() {
    const response = await apiClient.get('/federalDistricts')
    // Сортировка по алфавиту

    return response.data.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  },
}
