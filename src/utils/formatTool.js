/* 
    formatAmount
    格式化数量
*/
export const formatAmount = (val, n=0) => {
    if (val) {
        const num = parseInt(val, 10);
        return (num.toFixed(n).toString()).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
    };
    return '0.00';
};
/* 
    resolveTitle
    处理document.title
*/
export const resolveTitle = (location, route) => {
    const { pathname } = location;
    const { routes } = route;
    routes.forEach(item => {
        if (pathname === item.path) {
            document.title = item.meta.title;
        };
    });
};
/* 
    formatTime
    格式化时间
*/
export const formatTime = (time) => {
    return time.slice(0, 10) + ' ' + time.slice(11, 19);
};
/* 
    formatRole
    格式化权限
*/
export const formatRole = (role) => {
    switch (role) {
        case 1:
            return "user";
        case 2:
            return "admin";
        case 3:
            return "root";
        default:
            break;
    };
};
/* 
    resolveMenuList
    处理路由表
*/
export const resolveMenuList = (menuList, role) => {
    return menuList.filter((menu, i) => {
        if (menu.children) {
            if (!menu.roles.includes(role)) {
                menuList.splice(i, 1);
            } else {
                menu.children.forEach((child, j) => {
                    if (!child.roles.includes(role)) {
                        menu.children.splice(j, 1);
                    };
                });
            };
        };
        const roles = menu.roles;
        return roles.includes(role);
    });
};