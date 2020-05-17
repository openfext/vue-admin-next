import { merge } from 'lodash';
import { Entity } from '@/base/model';

const defaultOptions = {
  formatters: {
    name(value) {
      return `${value}${Math.random().toFixed(2)}`;
    }
  }
};

class User extends Entity {
  constructor(data = {}, options = {}) {
    options = merge({}, defaultOptions, options);
    super(data, options);
  }
}

export default User;
