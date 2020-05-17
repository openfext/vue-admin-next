import Log from '@/base/log';

class Service {
  static instance = null;

  constructor(options = {}) {
    this.$logger = Log.createLogger({
      tag: this.constructor.name
    });

    if (options.dataflow) {
      this.dataflow = options.dataflow;
    }
  }

  update(options) {}

  static get(options = {}) {
    const SERVICE = this;

    if (!SERVICE.instance || options.isNew) {
      const instance = new SERVICE(options);

      if (options.isNew) {
        return instance;
      }
      SERVICE.instance = instance;
    } else {
      SERVICE.instance.update(options);
    }

    return SERVICE.instance;
  }
}

export default Service;
