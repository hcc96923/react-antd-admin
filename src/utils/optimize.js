/* 
    debounce
    防抖函数
*/
export const debounce = (fn, delay) => {
    return function (args) {
        clearTimeout(fn.id);

        fn.id = setTimeout(() => {
            fn.call(this, args);
        }, delay);
    };
};
/* 
    throttle
    节流函数
*/
export const throttle = (fn, delay) => {
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, delay);
    };
};