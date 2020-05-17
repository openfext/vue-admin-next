import { merge } from 'lodash';
import { Entity, Collection } from '@/base/model';

const defaultOptions = {
  formatters: {
    // 给 Title 添加前缀
    title(value) {
      return `V - ${value || 'Unknown'}`;
    }
  }
};

class ExampleEntity extends Entity {
  constructor(data, options = {}) {
    options = merge({}, defaultOptions, options);
    super(data, options);
  }
}

class ExampleList extends Collection {
  constructor(list = [], entity = ExampleEntity, options = {}) {
    super(list, entity, options);
  }
}

export default ExampleList;
