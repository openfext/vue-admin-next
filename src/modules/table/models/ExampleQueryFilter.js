import { merge } from 'lodash';
import { Entity } from '@/base/model';

const defaultOptions = {
  formatters: {
    // 去掉 Q 两端的空白
    q(value = '') {
      return value.trim();
    }
  }
};

class ExampleQuery extends Entity {
  constructor(data = {}, options = {}) {
    options = merge({}, defaultOptions, options);
    super(data, options);
  }
}

export default ExampleQuery;
