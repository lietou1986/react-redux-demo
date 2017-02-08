import api from '../api'

export const FETCH_CONFIG_PENDING = 'FETCH_CONFIG_PENDING';
export const FETCH_CONFIG_SUCCESS = 'FETCH_CONFIG_SUCCESS';
export const FETCH_CONFIG_ERROR = 'FETCH_CONFIG_ERROR';

export function fetchConfig() {
    return {
        type: 'FETCH_CONFIG',
        payload: {
            promise: api.get('/monitor')
        }
    }
}


