import { ADD_TAG, REMOVE_TAG } from '../constants/index';


/* 
    创建标签
    addTag
*/
export const addTag = (data) => {
    return {
        type: ADD_TAG,
        data
    }
}
/* 
    移除标签
    removeTag
*/
export const removeTag = (data) => {
    return {
        type: REMOVE_TAG,
        data
    }
}