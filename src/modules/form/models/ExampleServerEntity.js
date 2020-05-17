import { merge } from 'lodash';
import { Entity } from '@/base/model';

const defaultOptions = {
  formatters: {
    // 给 name 添加前缀
    name(value) {
      return `SERVER - ${value || 'Unknown'}`;
    },
    // 将 tag 改为 , 连接的字符串
    tag(value) {
      return value ? value.join(',') : '';
    },
    // 将 category 改为 , 连接的字符串
    category(value) {
      return value ? value.join('|') : '';
    }
  }
};

class ExampleServerEntity extends Entity {
  constructor(data = {}, options = {}) {
    options = merge({}, defaultOptions, options);
    super(data, options);
  }
}

export default ExampleServerEntity;
