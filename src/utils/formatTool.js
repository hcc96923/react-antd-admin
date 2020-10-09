/* 
    formatAmount
    格式化数量
*/
export const formatAmount = (val, n=0) => {
    if (val) {
        const num = parseInt(val, 10);
        return (num.toFixed(n).toString()).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
    }
    return '0.00';
}
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
        }
    });
};
/* 
    formatTime
    格式化时间
*/
export const formatTime = (time) => {
    return time.slice(0, 10) + ' ' + time.slice(11, 19);
};