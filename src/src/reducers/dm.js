import {
    FETCH_POSITION_PENDING,
    FETCH_POSITION_SUCCESS,
    FETCH_POSITION_ERROR,
} from '../actions/dm';

const initialState = {
    data: [],
    numFound: 0,
    message: '正在获取数据...',
    loading: false
};

export default function dm(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_POSITION_PENDING:
            return Object.assign({}, initialState, { loading: true });
        case FETCH_POSITION_SUCCESS:
            return {
        ...state,
                data: action.payload.data,
                numFound: action.payload.numFound,
                message: '数据获取成功',
                loading: false
            };
        case FETCH_POSITION_ERROR:
            return Object.assign({}, initialState, { message: '数据获取失败', loading: false });
        default:
            return state;
    }
}
