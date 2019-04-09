import axios from 'axios'

const Api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 1000,
})

Api.interceptors.request.use(
  config => {
    console.log(config)
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

Api.interceptors.response.use(
  response => {
    console.log(response)
    return response
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default Api
