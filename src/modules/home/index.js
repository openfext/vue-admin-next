import dao from './dao';
import services from './services';
import models from './models';
import stores from './store';
import routes from './router';

const dataflow = {
  models,
  dao,
  services
};

export default { routes, stores, dataflow };
