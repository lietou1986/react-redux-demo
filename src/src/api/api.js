import superagent from 'superagent';

const methods = [
  'get',
  'head',
  'post',
  'put',
  'del',
  'options',
  'patch'
];

class _Api {

  constructor(opts) {

    this.opts = opts || {};

    if (!this.opts.baseURI)
      throw new Error('baseURI option is required');

    //返回Promise对象
    methods.forEach(method =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](this.opts.baseURI + path);

        if (params) {
          request.query(params);
        }

        if (this.opts.headers) {
          request.set(this.opts.headers);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      })
    );

    //返回request
    methods.forEach(method =>
      this['_' + method] = (path, { params, data } = {}, callback) => {
        const request = superagent[method](this.opts.baseURI + path);

        if (params) {
          request.query(params);
        }

        if (this.opts.headers) {
          request.set(this.opts.headers);
        }

        if (data) {
          request.send(data);
        }

        return request.end((err, { body } = {}) => callback(body, err));
      })
  }
}

const Api = _Api;

export default Api;
