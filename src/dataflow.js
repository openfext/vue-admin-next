import DataFlow from '@/common/plugins/dataflow';
import CommonModule from '@/common';
import { AppModules } from './modules';

const source = [CommonModule, ...AppModules].map(m => m.dataflow);
const dataflow = DataFlow.create(source);
const dataflowVuexPlugin = DataFlow.store(dataflow);

export { dataflowVuexPlugin };

export default dataflow;
