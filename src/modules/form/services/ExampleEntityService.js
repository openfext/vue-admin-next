import Service from '@/base/service';

class ExampleEntityService extends Service {
  exampleClientEntity = null;
  exampleServerEntity = null;

  /* ----------- Client Entity --------------- */

  async setExampleClientEntity(entity) {
    const { ExampleClientEntity } = this.dataflow.models;

    this.exampleClientEntity = new ExampleClientEntity(entity);

    this.formatExampleClientEntity();

    return this.exampleClientEntity;
  }

  getExampleClientEntity() {
    return this.exampleClientEntity.get();
  }

  formatExampleClientEntity() {
    // some other stuff...
  }

  async fetchExampleClientEntity(options) {
    const { exampleFormDao } = this.dataflow.dao;

    const response = await exampleFormDao.getExampleEntity(options);

    this.setExampleClientEntity(response.data);

    this.$logger.log(
      '[fetchExampleClientEntity]',
      '[data]',
      this.getExampleClientEntity()
    );

    return this.getExampleClientEntity();
  }

  /* ----------- Server Entity --------------- */

  async setExampleServerEntity(entity) {
    const { ExampleServerEntity } = this.dataflow.models;

    this.exampleServerEntity = new ExampleServerEntity(entity);

    this.formatExampleServerEntity();

    return this.exampleServerEntity;
  }

  getExampleServerEntity() {
    return this.exampleServerEntity.get();
  }

  formatExampleServerEntity() {
    // some other stuff...
  }

  async saveExampleServerEntity(entity) {
    if (entity) {
      await this.setExampleServerEntity(entity);
    }

    const { exampleFormDao } = this.dataflow.dao;
    const exampleServerEntity = this.getExampleServerEntity();

    this.$logger.log(
      '[saveExampleServerEntity]',
      '[data]',
      exampleServerEntity
    );

    return exampleFormDao.saveExampleEntity(exampleServerEntity);
  }
}

export default ExampleEntityService;
