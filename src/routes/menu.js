const menu = [
    { key: 'home', name: '首页' },

    { key: 'user-list', name: '用户列表', parentKey: 'user-menu', parentName: '用户管理' },
    { key: 'role-list', name: '角色列表', parentKey: 'user-menu', parentName: '用户管理' },

    { key: 'basic-info', name: '基本资料', parentKey: 'setting-menu', parentName: '设置管理' },
    { key: 'modify-password', name: '修改密码', parentKey: 'setting-menu', parentName: '设置管理' },
    { key: 'system', name: '系统设置', parentKey: 'setting-menu', parentName: '设置管理' },

    { key: 'icon-list', name: '图标' },

    { key: 'line', name: '折线图', parentKey: 'chart', parentName: '图表' },
    { key: 'bar', name: '柱状图', parentKey: 'chart', parentName: '图表' },
    { key: 'pie', name: '饼状图', parentKey: 'chart', parentName: '图表' },
    { key: 'key-board', name: '键盘图', parentKey: 'chart', parentName: '图表' },
    { key: 'mix', name: '混合图表', parentKey: 'chart', parentName: '图表' },

    { key: 'excel', name: 'Excel', parentKey: 'module', parentName: '组件' },
    { key: 'zip', name: 'Zip', parentKey: 'module', parentName: '组件' },
    { key: 'pdf', name: 'Pdf', parentKey: 'module', parentName: '组件' },
    { key: 'udfile', name: '上传下载文件', parentKey: 'module', parentName: '组件' },
    { key: 'rich-text', name: '富文本', parentKey: 'module', parentName: '组件' },
    { key: 'mark-down', name: 'MarkDown', parentKey: 'module', parentName: '组件' },

    { key: 'authority', name: '权限切换', parentKey: 'permission', parentName: '权限测试' },
    { key: 'page', name: '权限页面', parentKey: 'permission', parentName: '权限测试' },

    { key: 'message', name: '消息' },

    { key: '401', name: '401', parentKey: 'error-page', parentName: '错误页面' },
    { key: '404', name: '404', parentKey: 'error-page', parentName: '错误页面' },
    { key: '500', name: '500', parentKey: 'error-page', parentName: '错误页面' },

    { key: 'about', name: '关于' }
];
export default menu;