import Service from '@/base/service';
import { CommonUtil } from '@/common/utils';

const CONFIG = {
  uri_prefix: '/',
  auth_prefix: 'AUTH_',
  action_prefix: 'AUTH_action_',
  alias_prefix: 'AUTH_alias_',
  nav_prefix: 'AUTH_nav_'
};

class AuthService extends Service {
  authList = [];

  constructor(options) {
    super(options);

    const global = CommonUtil.getInitialState().global || {};

    if (global) {
      this.setAuthList(global.auth);
    }
  }

  setAuthList(authList = []) {
    this.authList = authList;
  }

  getAuthList() {
    return this.authList || [];
  }

  getAuthItems(auth, compare) {
    const list = this.getAuthList();

    if (!list) {
      return;
    }

    if (!compare) {
      compare = (item, prefix) => item.startsWith(prefix);
    }

    return list.filter(item => compare(item, auth));
  }

  getURIList() {
    const prefix = CONFIG.uri_prefix;
    return this.getAuthItems(prefix);
  }

  getNavList() {
    const prefix = CONFIG.nav_prefix;
    return this.getAuthItems(prefix);
  }

  getAliasList() {
    const prefix = CONFIG.alias_prefix;
    return this.getAuthItems(prefix);
  }

  getActionList() {
    const prefix = CONFIG.action_prefix;
    return this.getAuthItems(prefix);
  }

  hasAuth(auth) {
    return !!this.getAuthItems(auth, (item, auth) => item === auth).length;
  }

  hasAuthByPerfix(id, prefix, list) {
    prefix = prefix || CONFIG.auth_prefix;
    list = list || this.getAuthItems(prefix);

    if (!list) {
      return;
    }

    let result = false;
    list.forEach(function(item) {
      if (item.substr(prefix.length) === String(id)) {
        result = true;
      }
    });
    return result;
  }

  hasNavAuth(navId) {
    return this.hasAuthByPerfix(navId, CONFIG.nav_prefix, this.getNavList());
  }

  hasAliasAuth(alias) {
    return this.hasAuthByPerfix(
      alias,
      CONFIG.alias_prefix,
      this.getAliasList()
    );
  }

  hasActionAuth(action) {
    return this.hasAuthByPerfix(
      action,
      CONFIG.action_prefix,
      this.getActionList()
    );
  }

  hasURIAuth(uri) {
    const authURIList = this.getURIList();

    for (const authURI of authURIList) {
      if (uri === authURI) {
        return true;
      }

      if (authURI.indexOf('/') === 0 && authURI.length > 1) {
        const reg = new RegExp(`^${authURI}`);

        if (reg.test(uri)) {
          return true;
        }
      }
    }

    if (this.hasAuth(uri)) {
      return true;
    }

    return false;
  }
}

export default AuthService;
