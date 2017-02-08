import api from '../api'

export const FETCH_POSITION_PENDING = 'FETCH_POSITION_PENDING';
export const FETCH_POSITION_SUCCESS = 'FETCH_POSITION_SUCCESS';
export const FETCH_POSITION_ERROR = 'FETCH_POSITION_ERROR';

export function fetchPosition(positionId, positionName, exclude, page, pageSize) {
  return {
    type: 'FETCH_POSITION',
    payload: {
      promise: api.post('/dm', {
        data: {
          positionId: positionId,
          positionName: positionName,
          exclude: exclude,
          page: page,
          pageSize: pageSize
        }
      })
    }
  }
}
