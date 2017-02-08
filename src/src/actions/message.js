import api from '../api'

export const SEND_PENDING = 'SEND_PENDING';
export const SEND_SUCCESS = 'SEND_SUCCESS';
export const SEND_ERROR = 'SEND_ERROR';

export const RESET_PENDING = 'RESET_PENDING';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_ERROR = 'RESET_ERROR';


export const FETCH_GLZMESSAGE_PENDING = 'FETCH_GLZMESSAGE_PENDING';
export const FETCH_GLZMESSAGE_SUCCESS = 'FETCH_GLZMESSAGE_SUCCESS';
export const FETCH_GLZMESSAGE_ERROR = 'FETCH_GLZMESSAGE_ERROR';

export function fetchGlzMessage(date, startTime, endTime, topic, message, page, pageSize) {
  return {
    type: 'FETCH_GLZMESSAGE',
    payload: {
      promise: api.post('/message', {
        data: {
          date: date,
          startTime: startTime,
          endTime: endTime,
          topic: topic,
          message: message,
          page: page,
          pageSize: pageSize
        }
      })
    }
  }
}

export function resetMessage(message, uploadFile) {
  return {
    type: 'RESET',
    payload: {
      promise: api.post('/message/reset', {
        data: {
          message: message,
          uploadFile: uploadFile
        }
      })
    }
  }
}

export function sendMessage(type, message, uploadFile) {
  return {
    type: 'SEND',
    payload: {
      promise: api.post('/message/send', {
        data: {
          type: type,
          message: message,
          uploadFile: uploadFile
        }
      })
    }
  }
}