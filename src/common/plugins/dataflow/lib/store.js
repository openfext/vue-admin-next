export default function(dataflow) {
  return function(store) {
    store.dataflow = dataflow;
  };
}
