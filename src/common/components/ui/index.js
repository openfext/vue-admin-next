import { FormError } from './form-error';
import { FormAction } from './form-action';
import { FormTip } from './form-tip';
import { ClipboardText } from './clipboard-text';

const ApplicationUI = {
  FormError,
  FormAction,
  FormTip,
  ClipboardText
};

function install(Vue) {
  Object.keys(ApplicationUI).forEach(key => {
    let component = ApplicationUI[key];
    Vue.component(component.name, component);
  });
}

export default {
  install
};
