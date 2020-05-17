import { extend } from 'vee-validate/dist/vee-validate.full';

// 大于当前时间（可选秒数：大于当前时间多少秒）
extend('afterNow', {
  params: ['seconds'],
  validate(value, { seconds = 0 }) {
    try {
      const ms = seconds * 1000;
      const now = Date.now();
      const date = new Date(value).getTime();

      if (date > now + ms) {
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  },

  message(value, { seconds }) {
    const sec = seconds > 0 ? ` ${seconds} 秒` : '';

    return `必须大于当前时间${sec}`;
  }
});
