import {
    FETCH_CONFIG_PENDING,
    FETCH_CONFIG_SUCCESS,
    FETCH_CONFIG_ERROR

} from '../actions/monitor';

const initialState = {
    result: {
        ok: false,
        message: ''
    },
    config: [],
    message: '正在获取数据...',
    loading: false
};

export default function monitor(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_CONFIG_PENDING:
            return Object.assign({}, initialState, { loading: true });
        case FETCH_CONFIG_SUCCESS:
            return {
        ...state,
                config: action.payload.configs,
                message: '数据获取成功',
                loading: false
            };
        case FETCH_CONFIG_ERROR:
            return Object.assign({}, initialState, { message: '数据获取失败', loading: false });

        default:
            return state;
    }
}