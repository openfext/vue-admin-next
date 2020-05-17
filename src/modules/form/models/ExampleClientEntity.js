import { merge } from 'lodash';
import { Entity } from '@/base/model';

const defaultOptions = {
  formatters: {
    // 给 name 添加前缀
    name(value) {
      return `CLIENT - ${value || 'Unknown'}`;
    },
    // 将 tag 拆分为数组
    tag(value) {
      return value ? value.split(',').map(Number) : [];
    },
    // 将 category 拆分为数组
    category(value) {
      return value ? value.split('|').map(Number) : [];
    }
  }
};

class ExampleClientEntity extends Entity {
  constructor(data = {}, options = {}) {
    options = merge({}, defaultOptions, options);
    super(data, options);
  }
}

export default ExampleClientEntity;
