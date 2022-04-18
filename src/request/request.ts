import axios from 'axios'
import { API } from '../config'

console.log(API)

const request = axios.create({
  baseURL: `${API}`
})

request.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
