const NavUtil = {
  getAuthorizedNav(nav = [], validation) {
    const authorizedNav = [];

    for (const blockNav of nav) {
      if (validation.hasNavAuth(blockNav.key)) {
        const authorizedBlockLinkList = [];

        // 处理当前 Level 的链接
        (blockNav.links || []).forEach(link => {
          if (
            validation.hasURIAuth(link.path) ||
            validation.hasAliasAuth(link.alias)
          ) {
            authorizedBlockLinkList.push(link);
          }
        });

        // 递归处理下一 Level 的链接
        const authorizedBlockChildList = NavUtil.getAuthorizedNav(
          blockNav.children || [],
          validation
        );

        if (authorizedBlockChildList.length || authorizedBlockLinkList.length) {
          authorizedNav.push({
            ...blockNav,
            links: authorizedBlockLinkList,
            children: authorizedBlockChildList
          });
        }
      }
    }

    return authorizedNav;
  }
};

export default NavUtil;
