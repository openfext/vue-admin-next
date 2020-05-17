import _ from 'lodash';
import Entity from './entity';

class Collection {
  list = null;
  entity = null;
  options = null;

  constructor(list = [], entity = Entity, options = {}) {
    this._ = _;
    this.list = list;
    this.entity = entity;
    this.options = options;

    this.format();
  }

  get() {
    return this.list.map(entity => entity.get());
  }

  set(list) {
    this.list = list;

    this.format();

    return this;
  }

  format() {
    const { list, entity: Entity, options } = this;

    this.list = list.map(data => {
      return new Entity(data, options);
    });

    return this;
  }
}

export default Collection;
