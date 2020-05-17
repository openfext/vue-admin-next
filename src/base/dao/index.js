import axios from 'axios';
import Log from '@/base/log';

class Dao {
  static SUCCESS_CODE = 'SUCCESS';

  static instance = null;

  constructor(options = {}) {
    this.$logger = Log.createLogger({
      tag: this.constructor.name
    });

    if (options.dataflow) {
      this.dataflow = options.dataflow;
    }
  }

  axios(options = {}) {
    const baseOptions = {
      timeout: 20000,
      method: 'get'
    };

    return axios({
      ...baseOptions,
      ...options
    }).then(response => {
      const { data } = response;

      return this.checkCode(data);
    });
  }

  checkCode(response) {
    const code = response.code;
    const message = response.msg || 'error';

    if (code === Dao.SUCCESS_CODE) {
      return response;
    } else {
      const error = new Error(`Server error: ${code}, message: ${message}`);
      error.response = response;
      error.code = code;
      throw error;
    }
  }

  delay(timeout = 1000) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  }

  update(options) {}

  static get(options = {}) {
    const DAO = this;

    if (!DAO.instance || options.isNew) {
      const instance = new DAO(options);

      if (options.isNew) {
        return instance;
      }
      DAO.instance = instance;
    } else {
      DAO.instance.update(options);
    }

    return DAO.instance;
  }
}

export default Dao;
