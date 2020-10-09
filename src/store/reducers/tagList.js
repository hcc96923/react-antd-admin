import { ADD_TAG, REMOVE_TAG } from '../constants/index';


const tagList = (state = [{ key: 'home', name: '首页' }], action) => {
    switch (action.type) {
        case ADD_TAG:
            const addState = JSON.parse(JSON.stringify(state));
            const addTag = action.data;

            const isExist = addState.every(item => {
                return (item.key !== addTag.key && item.name !== addTag.name) ? true : false;
            });
            if (isExist) {
                addState.push(addTag);
            }

            return addState;
        case REMOVE_TAG:
            const removeState = JSON.parse(JSON.stringify(state));
            const removeTag = action.data;
            
            removeState.forEach((item, index, array) => {
                if (item.key === removeTag.key && item.name === removeTag.name) {
                    array.splice(index, 1);
                }
            });

            return removeState;
        default:
            return state;
    };
};
export default tagList;