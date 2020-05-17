import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  reactive,
  toRefs,
  computed
} from '@vue/composition-api';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import isString from 'lodash/isString';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _Object$assign from '@babel/runtime-corejs3/core-js-stable/object/assign';
import uniqBy from 'lodash/uniqBy';

function useResize() {
  var windowInnerWidth = ref(0);
  var windowInnerHeight = ref(0);

  var update = function update() {
    windowInnerWidth.value = window.innerWidth;
    windowInnerHeight.value = window.innerHeight;
  }; // initialize

  update();
  onMounted(function() {
    window.addEventListener('resize', update);
  });
  onUnmounted(function() {
    window.removeEventListener('resize', update);
  });
  return {
    windowInnerWidth: windowInnerWidth,
    windowInnerHeight: windowInnerHeight
  };
}

function useLoading() {
  var loading = ref(false);

  var setLoading = function setLoading(value) {
    loading.value = value;
  };

  var withLoading = function withLoading(task) {
    var _ref =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _ref$autocomplete = _ref.autocomplete;
    var autocomplete = _ref$autocomplete === void 0 ? true : _ref$autocomplete;

    return _Promise
      .resolve()
      .then(function() {
        loading.value = true;
        return task();
      })
      .finally(function() {
        if (autocomplete) {
          loading.value = false;
        }
      });
  };

  return {
    loading: loading,
    setLoading: setLoading,
    withLoading: withLoading
  };
}

function useRequired() {
  var rules =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ref({});
  var requiredKey =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : 'required';
  var isRequired = ref(false);
  watch(
    rules,
    function() {
      var rules =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      isRequired.value = false;
      requiredKey = isString(requiredKey)
        ? requiredKey.split('|')
        : requiredKey;

      _forEachInstanceProperty(requiredKey).call(requiredKey, function(key) {
        if (rules[key]) {
          isRequired.value = true;
        }
      });
    },
    {
      deep: true
    }
  );
  return {
    isRequired: isRequired
  };
}

function useFormElement(props, context) {
  var options =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$requiredKey = options.requiredKey;
  var requiredKey =
    _options$requiredKey === void 0 ? 'required' : _options$requiredKey;
  var rules = ref({});
  var dirty = ref(false);
  var localValue = ref(null);
  var initialValue = ref(null);

  var _useRequired = useRequired(rules, requiredKey);
  var isRequired = _useRequired.isRequired;

  var setInitialValue = function setInitialValue(value) {
    initialValue.value = cloneDeep(value);
    localValue.value = cloneDeep(value);
    context.emit('input', localValue.value);
  };

  var resetLocalValue = function resetLocalValue() {
    localValue.value = cloneDeep(initialValue.value);
    context.emit('input', localValue.value);
  };

  var updateLocalValue = function updateLocalValue(value) {
    if (!isEqual(value, localValue.value)) {
      dirty.value = true;
      localValue.value = cloneDeep(value);
      context.emit('input', localValue.value);
    }
  };

  var watchPropValue = function watchPropValue(callback) {
    watch(
      function() {
        return props.value;
      },
      function(value) {
        if (isEqual(value, localValue.value)) {
          return;
        }

        callback(value);
      },
      {
        deep: true
      }
    );
  };

  watchPropValue(function(value) {
    if (!dirty.value) {
      initialValue.value = cloneDeep(value);
    }

    localValue.value = cloneDeep(value);
  });
  watch(
    function() {
      return props.rules;
    },
    function(value) {
      rules.value = value;
    }
  );
  return {
    dirty: dirty,
    isRequired: isRequired,
    localValue: localValue,
    watchPropValue: watchPropValue,
    setInitialValue: setInitialValue,
    resetLocalValue: resetLocalValue,
    updateLocalValue: updateLocalValue
  };
}

function ownKeys(object, enumerableOnly) {
  var keys = _Object$keys(object);
  if (_Object$getOwnPropertySymbols) {
    var symbols = _Object$getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = _filterInstanceProperty(symbols).call(symbols, function(sym) {
        return _Object$getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      var _context;
      _forEachInstanceProperty((_context = ownKeys(Object(source), true))).call(
        _context,
        function(key) {
          _defineProperty(target, key, source[key]);
        }
      );
    } else if (_Object$getOwnPropertyDescriptors) {
      _Object$defineProperties(
        target,
        _Object$getOwnPropertyDescriptors(source)
      );
    } else {
      var _context2;
      _forEachInstanceProperty((_context2 = ownKeys(Object(source)))).call(
        _context2,
        function(key) {
          _Object$defineProperty(
            target,
            key,
            _Object$getOwnPropertyDescriptor(source, key)
          );
        }
      );
    }
  }
  return target;
}

function useForm() {
  var state = reactive({
    initialFormValues: {},
    formValues: {}
  });

  var setInitialFormValues = function setInitialFormValues(formValues) {
    state.initialFormValues = cloneDeep(formValues);
    state.formValues = cloneDeep(formValues);
  };

  var updateFormValues = function updateFormValues(formValues) {
    state.formValues = formValues;
  };

  var resetFormValues = function resetFormValues() {
    state.formValues = cloneDeep(state.initialFormValues);
  };

  return _objectSpread(
    _objectSpread({}, toRefs(state)),
    {},
    {
      setInitialFormValues: setInitialFormValues,
      updateFormValues: updateFormValues,
      resetFormValues: resetFormValues
    }
  );
}

function convertPageSort(sort, _ref) {
  var _ref$toCustomTable = _ref.toCustomTable;
  var toCustomTable = _ref$toCustomTable === void 0 ? true : _ref$toCustomTable;
  var sortKeys = _ref.sortKeys;

  if (toCustomTable) {
    var _ref2;

    return (
      (_ref2 = {}),
      _defineProperty(_ref2, sortKeys.orderBy, sort.orderBy),
      _defineProperty(
        _ref2,
        sortKeys.order,
        sort.order === 'asc' ? sortKeys.asc : sortKeys.desc
      ),
      _ref2
    );
  } else {
    return {
      orderBy: sort[sortKeys.orderBy],
      order: sort[sortKeys.order] === sortKeys.asc ? 'asc' : 'desc'
    };
  }
}

function useTable() {
  var options =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$uniqueKey = options.uniqueKey;
  var uniqueKey = _options$uniqueKey === void 0 ? 'id' : _options$uniqueKey;
  var _options$sortKeys = options.sortKeys;
  var sortKeys =
    _options$sortKeys === void 0
      ? {
          order: 'order',
          orderBy: 'orderBy',
          asc: 'asc',
          desc: 'desc'
        }
      : _options$sortKeys;
  var updatingCount = ref(0);
  var state = reactive({
    initialPage: {},
    initialFilter: {},
    page: {},
    filter: {},
    list: {},
    selection: [],
    crossPageSelection: []
  });
  var customPageSorter = computed(function() {
    return convertPageSort(state.page, {
      sortKeys: sortKeys
    });
  });

  var increaseUpdatingCount = function increaseUpdatingCount() {
    updatingCount.value++;
  };

  var setPage = function setPage() {
    var page =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref3 =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _ref3$merge = _ref3.merge;
    var merge = _ref3$merge === void 0 ? true : _ref3$merge;

    if (merge) {
      state.page = _Object$assign({}, state.page, page);
    } else {
      state.page = page;
    }
  };

  var resetPage = function resetPage() {
    state.page = cloneDeep(state.initialPage);
  };

  var setInitialPage = function setInitialPage() {
    var page =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    state.initialPage = cloneDeep(page);
    state.page = cloneDeep(page);
  };

  var setFilter = function setFilter() {
    var filter =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref4 =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _ref4$merge = _ref4.merge;
    var merge = _ref4$merge === void 0 ? true : _ref4$merge;

    if (merge) {
      state.filter = _Object$assign({}, _filterInstanceProperty(state), filter);
    } else {
      state.filter = filter;
    }
  };

  var resetFilter = function resetFilter() {
    state.filter = cloneDeep(state.initialFilter);
  };

  var setInitialFilter = function setInitialFilter() {
    var filter =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    state.initialFilter = cloneDeep(filter);
    state.filter = cloneDeep(filter);
  };

  var setList = function setList() {
    var list =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    state.list = list;
  };

  var setPageSort = function setPageSort(sort) {
    if (sort[sortKeys.orderBy] && sort[sortKeys.order]) {
      sort = convertPageSort(sort, {
        sortKeys: sortKeys,
        toCustomTable: false
      });
      setPage(sort);
    } else {
      setPage({
        order: state.initialPage.order,
        orderBy: state.initialPage.orderBy
      });
    }

    increaseUpdatingCount();
  };

  var setPageSize = function setPageSize(pageSize) {
    if (state.page.pageSize !== pageSize) {
      setPage({
        pageSize: pageSize
      });
      increaseUpdatingCount();
    }
  };

  var setPageNo = function setPageNo(pageNo) {
    if (pageNo !== state.page.pageNo) {
      setPage({
        pageNo: pageNo
      });
      increaseUpdatingCount();
    }
  };

  var setSelection = function setSelection() {
    var items =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    state.selection = items;
  };

  var addCrossPageSelection = function addCrossPageSelection() {
    var _context;

    var items =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var previousCount = state.crossPageSelection.length;

    var arr = _concatInstanceProperty(
      (_context = state.crossPageSelection)
    ).call(_context, items);

    state.crossPageSelection = uniqBy(arr, uniqueKey);
    return state.crossPageSelection.length - previousCount;
  };

  var removeCrossPageSelection = function removeCrossPageSelection() {
    var _context2;

    var items =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var previousCount = state.crossPageSelection.length;
    var leftSelection = [];

    _forEachInstanceProperty((_context2 = state.crossPageSelection)).call(
      _context2,
      function(sel) {
        var shouldRemove = !!_findInstanceProperty(items).call(items, function(
          item
        ) {
          return item[uniqueKey] === sel[uniqueKey];
        });

        if (!shouldRemove) {
          leftSelection.push(sel);
        }
      }
    );

    state.crossPageSelection = leftSelection;
    return previousCount - state.crossPageSelection.length;
  };

  var clearCrossPageSelection = function clearCrossPageSelection() {
    var previousCount = state.crossPageSelection.length;
    state.crossPageSelection = [];
    return previousCount;
  };

  var triggerUpdate = function triggerUpdate() {
    increaseUpdatingCount();
  };

  var watchUpdate = function watchUpdate(task) {
    watch(updatingCount, function() {
      task();
    });
  };

  return {
    state: state,
    customPageSorter: customPageSorter,
    setList: setList,
    setPage: setPage,
    resetPage: resetPage,
    setInitialPage: setInitialPage,
    setFilter: setFilter,
    resetFilter: resetFilter,
    setInitialFilter: setInitialFilter,
    setPageSort: setPageSort,
    setPageSize: setPageSize,
    setPageNo: setPageNo,
    setSelection: setSelection,
    addCrossPageSelection: addCrossPageSelection,
    removeCrossPageSelection: removeCrossPageSelection,
    clearCrossPageSelection: clearCrossPageSelection,
    triggerUpdate: triggerUpdate,
    watchUpdate: watchUpdate
  };
}

export {
  useForm,
  useFormElement,
  useLoading,
  useRequired,
  useResize,
  useTable
};
