import BaseConstants from '../config/constants';

const FakeUtil = {
  successResponse: function(data = {}) {
    return {
      msg: BaseConstants.SUCCESS_MSG,
      code: BaseConstants.SUCCESS_CODE,
      data
    };
  },

  getList: function(options) {
    let result, pageNo, pageSize, order, orderBy, totalCount, currentPageSize;

    try {
      let {
        data: { page: pageJSON, filter: filterJSON }
      } = options;
      pageJSON = JSON.parse(pageJSON);
      filterJSON = JSON.parse(filterJSON);
      pageNo = pageJSON.pageNo;
      pageSize = pageJSON.pageSize;
      order = pageJSON.order;
      orderBy = pageJSON.orderBy;
      totalCount = 256;
      currentPageSize = pageSize;

      if (filterJSON.id) {
        currentPageSize = 1;
        totalCount = 1;
      }

      if (pageNo * pageSize > totalCount) {
        currentPageSize = totalCount % pageSize;
      }

      result = Array(currentPageSize)
        .fill(1)
        .map((item, index) => {
          const id = Number(
            filterJSON.id ? filterJSON.id : index + pageNo * 1000
          );
          return {
            id,
            pageId: Number(id + '20'),
            title: `示例标题 ${filterJSON.q || ''} ${Math.random().toFixed(3)}`,
            createTime: '2020-01-01 08:00:00',
            createUserName: 'Felix Yang',
            category: 'Cate',
            place: 'China'
          };
        });

      if (filterJSON.id) {
        result = result.filter(item => {
          const id = Number(filterJSON.id);
          return id === item.id || id === item.pageId;
        });
      }

      if (order) {
        result.sort((a, b) => {
          return order === 'asc' ? a.id - b.id : b.id - a.id;
        });
      }
    } catch (err) {
      result = [];
    }

    return FakeUtil.successResponse({
      pageNo: pageNo || 1,
      pageSize: pageSize || 10,
      totalCount: totalCount || 0,
      order: order || 'desc',
      orderBy: orderBy || 'createTime',
      result
    });
  }
};

export default FakeUtil;
