import dao from './dao';
import services from './services';
import models from './models';

import plugins from './plugins';

const dataflow = {
  models,
  dao,
  services
};

export default { plugins, dataflow };
