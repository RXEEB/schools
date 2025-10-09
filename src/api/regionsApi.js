import apiClient from './axios'

export const regionsApi = {
  async getRegions() {
    const response = await apiClient.get('/regions')

    // Сортировка по алфавиту
    return response.data.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  },
}
