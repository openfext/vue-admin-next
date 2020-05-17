import { merge, camelCase as getInstanceName, upperFirst, flow } from 'lodash';

const getClassName = flow(getInstanceName, upperFirst);

function create(classes = {}, targetNamespace = {}, options = {}) {
  const out = {};

  for (let className in classes) {
    if (targetNamespace[getClassName(className)]) {
      throw new Error(
        `Dataflow Error: class ${className} is already being used, please try another name!`
      );
    }

    out[getClassName(className)] = classes[className];
    out[getInstanceName(className)] = classes[className].get(options);
  }

  return out;
}

function createModuleDataflow(source = {}, options = {}) {
  const { dataflow = {} } = options;

  return {
    models: source.models,

    dao: create(source.dao, dataflow.dao, options),

    services: create(source.services, dataflow.services, options)
  };
}

export default function(source = [], options = {}) {
  const { isNew = false } = options;
  const dataflow = {
    models: {},
    dao: {},
    services: {}
  };

  source.forEach(mod => {
    const moduleDataflow = createModuleDataflow(mod, {
      isNew,
      dataflow
    });

    merge(dataflow, moduleDataflow);
  });

  return dataflow;
}
