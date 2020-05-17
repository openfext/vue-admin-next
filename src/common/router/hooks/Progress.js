import NProgress from 'nprogress';

class NProgressTask {
  static MINIMUM = 0.1;
  static STEP_PERCENT = 0.03;
  static STEP_DURATION = 50;
  static DELAY_TIME = 1500;

  static taskId = null;
  static taskDoneId = null;

  static start() {
    clearInterval(NProgressTask.taskId);
    clearTimeout(NProgressTask.taskDoneId);

    NProgress.done();

    NProgress.set(NProgress.MINIMUM);

    NProgress.start();

    NProgressTask.taskId = setInterval(() => {
      NProgress.inc(NProgressTask.STEP_PERCENT);
    }, NProgressTask.STEP_DURATION);
  }

  static done() {
    NProgressTask.taskDoneId = setTimeout(() => {
      clearInterval(NProgressTask.taskId);
      setTimeout(() => {
        NProgress.done();
      });
    }, NProgressTask.DELAY_TIME);
  }
}

NProgress.configure({
  minimum: NProgressTask.MINIMUM,
  trickle: false,
  // trickleSpeed: 10,
  showSpinner: false
});

export default {
  StartHook: function() {
    return function(to, from, next) {
      NProgressTask.start();

      if (next) {
        next();
      }
    };
  },

  EndHook: function() {
    return function(to, from, next) {
      NProgressTask.done();

      if (next) {
        next();
      }
    };
  }
};
