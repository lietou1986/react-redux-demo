import api from '../api'

export const FETCH_COMPANY_PENDING = 'FETCH_COMPANY_PENDING';
export const FETCH_COMPANY_SUCCESS = 'FETCH_COMPANY_SUCCESS';
export const FETCH_COMPANY_ERROR = 'FETCH_COMPANY_ERROR';

export const FETCH_COMPANYCORE_PENDING = 'FETCH_COMPANYCORE_PENDING';
export const FETCH_COMPANYCORE_SUCCESS = 'FETCH_COMPANYCORE_SUCCESS';
export const FETCH_COMPANYCORE_ERROR = 'FETCH_COMPANYCORE_ERROR';

export function fetchCompany(companyId, solrAddress, coreName, page, pageSize) {
  return {
    type: 'FETCH_COMPANY',
    payload: {
      promise: api.post('/company', {
        data: {
          companyId: companyId,
          solrAddress: solrAddress,
          coreName: coreName,
          page: page,
          pageSize: pageSize
        }
      })
    }
  }
}

export function fetchCompanyCore(source, page, pageSize) {
  return {
    type: 'FETCH_COMPANYCORE',
    payload: {
      promise: api.post('/company/core', {
        data: {
          source: source,
          page: page,
          pageSize: pageSize
        }
      })
    }
  }
}