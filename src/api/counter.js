import axios from 'axios'

const CounterService = axios.create({
  baseURL: process.env.REACT_APP_COUNTER_API_URL + 'counter',
  timeout: 30000
})

function getResponseData (response) {
  return typeof response.data !== 'undefined' ? response.data : response
}

function handleErrorResponse (exception) {
  const response = exception.response
  const message = response ? `${response.status} - ${response.statusText}` : 'Server error'
  return Promise.reject(message)
}

export default {
  list () {
    return CounterService.get('/')
            .then(getResponseData, handleErrorResponse)
  },
  add (title) {
    if (!title) {
      return Promise.reject('No title')
    }
    return CounterService.post('/', { title })
            .then(getResponseData, handleErrorResponse)
  },
  remove (id) {
    if (!id) {
      return Promise.reject('No id')
    }
    return CounterService.delete('/', { id })
            .then(getResponseData, handleErrorResponse)
  },
  increment (id) {
    if (!id) {
      return Promise.reject('No id')
    }
    return CounterService.post('/inc/', { id })
            .then(getResponseData, handleErrorResponse)
  },
  decrement (id) {
    if (!id) {
      return Promise.reject('No id')
    }
    return CounterService.post('/dec/', { id })
            .then(getResponseData, handleErrorResponse)
  }
}
