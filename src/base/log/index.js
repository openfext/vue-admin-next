import Consola from 'consola';

class Log {
  constructor(options = {}) {
    this.$logger = Log.createLogger({
      tag: this.constructor.name
    });
  }

  static createLogger({ tag = '' } = {}) {
    return Consola.create({
      defaults: {
        tag
      },
      reporters: [new Consola.BrowserReporter()]
    });
  }
}

export default Log;
