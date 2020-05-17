import Dao from '@/base/dao';
import FakeUtil from '@/common/utils/fake';

class ExampleFormDao extends Dao {
  async getExampleEntity(options = {}) {
    await this.delay(1000);
    const { id } = options;

    const entity = {
      id: id || 0,
      channel: 3,
      name: 'An Example Name ' + id || '',
      shortName: 'Short Name ' + id || '',
      time: '2030-11-20 15:00:50',
      recommended: 1,
      recommendRate: 3,
      tag: '1,3',
      type: 1,
      category: '2|3|5|8',
      actor: ['Xiao Yang', 'Xiao Zhang'],
      description: 'An Example Description ' + id || ''
    };

    this.$logger.log(
      '[getExampleEntity]',
      '[options]',
      options,
      '[data]',
      entity
    );

    return this.checkCode(FakeUtil.successResponse(entity));
  }

  async saveExampleEntity(data) {
    await this.delay(2000);

    this.$logger.log('[saveExampleEntity]', '[data]', data);

    return this.checkCode(FakeUtil.successResponse());
  }
}

export default ExampleFormDao;
