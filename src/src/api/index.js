import Api from './api';

const api = new Api({
  baseURI: 'http://localhost:8000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api
