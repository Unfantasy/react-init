export default {
  namespace: 'user',
  state: {
    title: '我的react + antd项目',
    welcome: '欢迎使用react + antd创建项目！',
  },
  subscriptions: {
    setup({ dispatch, history }) { // eslint-disable-line
      history.listen((location) => {
        if (location.pathname.match('/')) {
          console.log('page start');
        }
      });
    },
  },
  effects: {
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
