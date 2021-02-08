import {CountersExampleTitles} from 'utils'

const mockedCounters = [
  { 'id': 'kkvgaqvv','title': 'counter1', 'count': 0 },
  { 'id': 'kkvgaqxd','title': 'counter2', 'count': 2 },
  { 'id': 'kkvgaqcd','title': 'counter3', 'count': 9 },
  { 'id': 'kkvgaqxx','title': 'counter4', 'count': 3 }
]


const mockedCounterService = (_debugRejection = false) => {

  function getResponseData (response) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(typeof response.data !== 'undefined' ? response.data : response)
      }, 100)
    })
  }

  function handleErrorResponse (exception) {
    const response = exception.response
    const message = response ? `${response.status} - ${response.statusText}` : 'Server error'
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(message)
      }, 100)
    })
  }

  return {
    list () {
      if ( _debugRejection) {
        return handleErrorResponse()
      } else {
        return getResponseData(mockedCounters)
      }
    },
    add (title) {
      if (!title) {
        return Promise.reject('No title')
      }
      if ( _debugRejection) {
        return handleErrorResponse()
      } else {
        return getResponseData({id: 'C_' + new Date().getTime(), title, count: 0})
      }
    },
    remove (id) {
      if (!id) {
        return Promise.reject('No id')
      }
      if ( _debugRejection) {
        return handleErrorResponse()
      } else {
        return getResponseData(id)
      }
    },
    increment (id) {
      if (!id) {
        return Promise.reject('No id')
      }
      if ( _debugRejection) {
        return handleErrorResponse()
      } else {
        return getResponseData(id)
      }
    },
    decrement (id) {
      if (!id) {
        return Promise.reject('No id')
      }
      if ( _debugRejection) {
        return handleErrorResponse()
      } else {
        return getResponseData(id)
      }
    },
    examples () {
      if ( _debugRejection) {
        return handleErrorResponse()
      } else {
        return getResponseData(CountersExampleTitles)
      }
    }
  }
}

export {
  mockedCounters,
  mockedCounterService
}

export default 'Hello World, test utils'
