import _ from 'lodash';

function format(data, formatters = {}) {
  if (!_.isPlainObject(data)) {
    return data;
  }

  Object.entries(formatters).forEach(([key, fn]) => {
    if (!_.isFunction(fn)) {
      return;
    }

    const originValue = data[key];

    data[key] = fn.call(data, originValue, data);
  });

  return data;
}

class Entity {
  data = null;
  options = null;

  constructor(data = {}, options = {}) {
    this._ = _;
    this.data = data;
    this.options = options;

    this.format();
  }

  add(key, value) {
    const { data } = this;

    if (_.isString(key) && _.isPlainObject(data)) {
      data[key] = value;
    }
  }

  get() {
    return this.data;
  }

  set(data) {
    this.data = data;

    this.format();

    return this;
  }

  format() {
    const { data, options } = this;
    const { formatters = {} } = options;

    this.data = format(data, formatters);

    return this;
  }
}

export default Entity;
