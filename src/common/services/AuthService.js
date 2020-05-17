import Service from '@/base/service';
import { CommonUtil } from '@/common/utils';

const CONFIG = {
  uri_prefix: '/',
  auth_prefix: 'AUTH_',
  action_prefix: 'AUTH_action_',
  alias_prefix: 'AUTH_alias_',
  nav_prefix: 'AUTH_nav_',
  channel_prefix: 'AUTH_channel_'
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

  getAuthItems(auth, comparer) {
    const list = this.getAuthList();
    if (!list) {
      return;
    }
    comparer =
      comparer ||
      function(item, auth) {
        return item.substr(0, auth.length) === auth;
      };
    return list.filter(function(item) {
      return comparer(item, auth);
    });
  }

  findAuthItems(auth, comparer) {
    comparer =
      comparer ||
      function(item, auth) {
        return item.indexOf(auth) > -1;
      };
    return this.getAuthItems(auth, comparer);
  }

  getChannelList() {
    const prefix = CONFIG.channel_prefix;
    return this.getAuthItems(prefix).filter(function(item) {
      return Number(item.indexOf(prefix.length)) >= 0;
    });
  }

  getURIList() {
    const prefix = CONFIG.uri_prefix;
    return this.getAuthItems(prefix).filter(function(item) {
      return item.indexOf(prefix) === 0;
    });
  }

  getNavList() {
    const prefix = CONFIG.nav_prefix;
    return this.getAuthItems(prefix).filter(function(item) {
      return item.indexOf(prefix) === 0;
    });
  }

  getAliasList() {
    const prefix = CONFIG.alias_prefix;
    return this.getAuthItems(prefix).filter(function(item) {
      return item.indexOf(prefix) === 0;
    });
  }

  getActionList() {
    const prefix = CONFIG.action_prefix;
    return this.getAuthItems(prefix).filter(function(item) {
      return item.indexOf(prefix) === 0;
    });
  }

  hasAuth(auth) {
    return (
      this.getAuthItems(auth, function(item, auth) {
        return item === auth;
      }).length > 0
    );
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

  hasChannel(id) {
    return this.hasAuthByPerfix(
      id,
      CONFIG.channel_prefix,
      this.getChannelList()
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
