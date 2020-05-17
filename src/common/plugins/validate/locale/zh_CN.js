import { formatFileSize } from '../utils/formatter';

const messages = {
  alpha: '只能包含英文字母字符',
  alpha_dash: '只能包含英文字母、数字、破折号和下划线',
  alpha_num: '只能包含英文字母、数字',
  alpha_spaces: '只能包含英文字母、空格',
  between: '数值必须在 {min} 和 {max} 之间',
  confirmed: '该字段的值必须与 {target} 一致',
  digits: '该字段必须是数字，且精确到 {length} 位数',
  dimensions: '图片的宽高不能大于 {width} X {height}',
  email: '该字段必须是有效的邮箱',
  excluded: '该字段的值无效',
  ext: '文件类型无效',
  image: '必须是有效的图片类型',
  oneOf: '该字段的值无效',
  integer: '该字段的值必须是整数',
  length: '该字段的长度必须为 {length}',
  max: '该字段最大长度为 {length} 个字符',
  max_value: '该字段最大值为 {max}',
  mimes: '必须是有效的文件类型',
  min: '该字段最小长度为 {length} 个字符',
  min_value: '该字段最小值为 {min}',
  numeric: '只能包含数字字符',
  regex: '该字段格式无效',
  required: '该字段不能为空',
  required_if: '该字段不能为空',
  size: (_field_, { size }) => {
    return `文件不能大于 ${formatFileSize(size)}`;
  }
};

const locale = {
  name: 'zh',
  messages
};

export default locale;
