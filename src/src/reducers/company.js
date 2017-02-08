import {
    FETCH_COMPANY_PENDING,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_ERROR,
    FETCH_COMPANYCORE_PENDING,
    FETCH_COMPANYCORE_SUCCESS,
    FETCH_COMPANYCORE_ERROR
} from '../actions/company';

const initialState = {
    data: [],
    numFound: 0,
    message: '正在获取数据...',
    loading: false
};

export default function company(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_COMPANY_PENDING:
            return Object.assign({}, initialState, { loading: true });
        case FETCH_COMPANY_SUCCESS:
            return {
        ...state,
                data: action.payload.data,
                numFound: action.payload.numFound,
                message: '数据获取成功',
                loading: false
            };
        case FETCH_COMPANY_ERROR:
            return Object.assign({}, initialState, { message: '数据获取失败', loading: false });

        case FETCH_COMPANYCORE_PENDING:
            return Object.assign({}, initialState, { loading: true });
        case FETCH_COMPANYCORE_SUCCESS:
            return {
        ...state,
                data: action.payload.data,
                numFound: action.payload.numFound,
                message: '数据获取成功',
                loading: false
            };
        case FETCH_COMPANYCORE_ERROR:
            return Object.assign({}, initialState, { message: '数据获取失败', loading: false });

        default:
            return state;
    }
}
