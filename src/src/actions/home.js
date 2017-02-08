import api from '../api'

export const GET_ALL_MENU = 'GET_ALL_MENU';
export const GET_ALL_MENU_SUCCESS = 'GET_ALL_MENU_SUCCESS';
export const UPDATE_NAVPATH = 'UPDATE_NAVPATH';
export const SWITCH_THEME = 'SWITCH_THEME';

export function updateNavPath(path, key, url) {
    return {
        type: UPDATE_NAVPATH,
        payload: {
            data: path,
            key: key,
            url: url
        }
    }
}

export function getAllMenu() {
    return {
        type: GET_ALL_MENU,
        payload: {
            promise: api.post('/menu')
        }
    }
}

export function switchTheme(theme) {
    return {
        type: SWITCH_THEME,
        payload: {
            theme: theme
        }
    }
}