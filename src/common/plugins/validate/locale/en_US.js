import { formatFileSize } from '../utils/formatter';

const messages = {
  alpha: 'This field may only contain alphabetic characters',
  alpha_num: 'This field may only contain alpha-numeric characters',
  alpha_dash:
    'This field may contain alpha-numeric characters as well as dashes and underscores',
  alpha_spaces:
    'This field may only contain alphabetic characters as well as spaces',
  between: 'This field must be between {min} and {max}',
  confirmed: 'This field confirmation does not match',
  digits: 'This field must be numeric and exactly contain {length} digits',
  dimensions: 'This field must be {width} pixels by {height} pixels',
  email: 'This field must be a valid email',
  excluded: 'This field is not a valid value',
  ext: 'This field is not a valid file',
  image: 'This field must be an image',
  integer: 'This field must be an integer',
  length: 'This field must be {length} long',
  max_value: 'This field must be {max} or less',
  max: 'This field may not be greater than {length} characters',
  mimes: 'This field must have a valid file type',
  min_value: 'This field must be {min} or more',
  min: 'This field must be at least {length} characters',
  numeric: 'This field may only contain numeric characters',
  oneOf: 'This field is not a valid value',
  regex: 'This field format is invalid',
  required_if: 'This field is required',
  required: 'This field is required',
  size: (_field_, { size }) => {
    return `This field size must be less than ${formatFileSize(size)}`;
  }
};

const locale = {
  name: 'en',
  messages
};

export default locale;
