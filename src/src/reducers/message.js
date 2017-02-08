import {
    SEND_PENDING,
    SEND_SUCCESS,
    SEND_ERROR,
    RESET_PENDING,
    RESET_SUCCESS,
    RESET_ERROR,
    FETCH_GLZMESSAGE_PENDING,
    FETCH_GLZMESSAGE_SUCCESS,
    FETCH_GLZMESSAGE_ERROR

} from '../actions/message';

const initialState = {
    sendOver: false,
    sendResult: {
        ok: false,
        message: ''
    },
    resetOver: false,
    resetResult: {
        ok: false,
        message: ''
    },
    data: [],
    numFound: 0,
    message: '正在获取数据...',
    loading: false
};

export default function message(state = initialState, action = {}) {
    switch (action.type) {
        case SEND_PENDING:
            return Object.assign({}, initialState);
        case SEND_SUCCESS:
            return {
        ...state,
                sendResult: action.payload,
                sendOver: true
            };
        case SEND_ERROR:
            return {
        ...state,
                sendResult: action.payload,
                sendOver: true
            };
        case RESET_PENDING:
            return Object.assign({}, initialState);
        case RESET_SUCCESS:
            return {
        ...state,
                resetResult: action.payload,
                resetOver: true
            };
        case RESET_ERROR:
            return {
        ...state,
                resetResult: action.payload,
                resetOver: true
            };
        case FETCH_GLZMESSAGE_PENDING:
            return Object.assign({}, initialState, { loading: true });
        case FETCH_GLZMESSAGE_SUCCESS:
            return {
        ...state,
                data: action.payload.data,
                numFound: action.payload.numFound,
                message: '数据获取成功',
                loading: false
            };
        case FETCH_GLZMESSAGE_ERROR:
            return Object.assign({}, initialState, { message: '数据获取失败', loading: false });
        default:
            return state;
    }
}