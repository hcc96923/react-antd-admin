import React from 'react';
import ReactDOM from 'react-dom';

// 使用hash路由
import { HashRouter } from 'react-router-dom';

// 集中式路由管理
import { renderRoutes } from 'react-router-config';

// 使用react-redux
import { Provider } from 'react-redux';

// 为组件提供统一的全局化配置
import { ConfigProvider } from 'antd';

// 国际化
import zhCN from 'antd/es/locale/zh_CN';

// 网络请求
import http from '@/utils/request';

// 路由配置
import routes from '@/routes/index';

// antd css
import 'antd/dist/antd.css';

// 使用store使每个组件都能使用store
import store from '@store/store';

// 挂载http
React.$http = http;

function RAA() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <HashRouter>
          {renderRoutes(routes)}
        </HashRouter>
      </ConfigProvider>
    </Provider>
  );
};
ReactDOM.render(<RAA />, document.getElementById('root'));