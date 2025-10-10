import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://schooldb.skillline.ru/api',
  timeout: 10000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 404) {
      console.error('404')
    } else if (error.response?.status >= 500) {
      console.error('500')
      alert('Нет данных по этому региону, выберите другой !!!!!!!!!')
    }

    return Promise.reject(error)
  },
)

export default apiClient
