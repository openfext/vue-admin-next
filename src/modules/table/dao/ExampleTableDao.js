import Dao from '@/base/dao';
import FakeUtil from '@/common/utils/fake';

class ExampleTableDao extends Dao {
  async getExampleList(options = {}) {
    // return this.fetchJSON('/path/to/example/list', options)

    await this.delay(1000);

    this.$logger.log('[getExampleList]', '[options]', options);

    return this.checkCode(FakeUtil.getList(options));
  }
}

export default ExampleTableDao;
