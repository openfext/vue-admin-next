import Service from '@/base/service';

class ExampleListService extends Service {
  exampleList = null;

  async getList(options = {}) {
    const { exampleTableDao } = this.dataflow.dao;
    const query = this.formatExampleQuery(options);
    const data = await exampleTableDao
      .getExampleList({
        data: query
      })
      .then(json => json.data);

    this.exampleList = data;

    this.formatExampleList();

    this.$logger.log('[getList]', '[options]', options);

    return this.exampleList;
  }

  formatExampleQuery(options = {}) {
    const { ExampleQueryFilter } = this.dataflow.models;
    const { filter = {}, page = {} } = options.data || {};
    const exampleQueryFilter = new ExampleQueryFilter(filter);

    // some other stuff...
    exampleQueryFilter.add('_ts', new Date().getTime());

    return {
      page: JSON.stringify(page),
      filter: JSON.stringify(exampleQueryFilter.get())
    };
  }

  formatExampleList() {
    // some other stuff...
    const { exampleList } = this;
    const { ExampleList } = this.dataflow.models;
    const collection = new ExampleList(exampleList.result);

    exampleList.result = collection.get();
  }
}

export default ExampleListService;
