import { ADD_BREADCRUMB } from '../constants/index';
import mapMenu from "@/routes/menu";


/* 
    面包屑
    breadCrumb
*/
const breadCrumb = (state = ['首页'], action) => {
    switch (action.type) {
        case ADD_BREADCRUMB:
            return action.data;
        default:
            return state;
    };
};
export default breadCrumb;