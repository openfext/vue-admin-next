import Service from '@/base/service';
import { CommonUtil } from '@/common/utils';

class UserService extends Service {
  user = {};

  constructor(options) {
    super(options);

    const global = CommonUtil.getInitialState().global || {};

    if (global) {
      this.setUser(global.user);
    }
  }

  setUser(user = {}) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getId() {
    return this.user.id;
  }

  getName() {
    return this.user.name;
  }
}

export default UserService;
