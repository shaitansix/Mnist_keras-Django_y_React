import axios from 'axios'

const BASE_URL = 'http://localhost:8000'
const HEADERS = { 
  'headers': { 
    'Content-Type': 'application/json'
  }
}

const getResponse = async (url, body) => {
  try {
    const res = body ? await axios.post(url, body, HEADERS) : await axios.get(url)
    
    if (res.statusText !== 'OK') {
      throw ({
        state: 'Failed', 
        message: res.data.message ? 'An error has occurred' : res.data.message
      })
    }
    return { 
      data: res.data.result, 
      error: { state: res.data.state }
    }
  } catch (e) {
    return { 
      data: null, 
      error: e
    }
  }
}

export const fitModel = (body) => {
  return getResponse(`${BASE_URL}/api/v1/fit/`, body)
}

export const classifyImage = (id, body) => {
  return getResponse(`${BASE_URL}/api/v1/classify/${id}/`, body)
}

export const testImage = (id) => {
  return getResponse(`${BASE_URL}/api/v1/test/${id}/`)
}