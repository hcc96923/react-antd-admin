import { combineReducers } from 'redux';
import { collapse, theme, breadcrumb, tag, message  } from './setting';
import breadCrumb from './breadCrumb';
import tagList from './tagList';
import userInfo from './userInfo';


const concatReducers = combineReducers({
    collapse, 
    theme,
    breadcrumb,
    breadCrumb,
    tag,
    tagList,
    message,
    userInfo
});
export default concatReducers;