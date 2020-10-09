import { combineReducers } from 'redux';
import { collapse, theme, breadcrumb, tag, message  } from './setting';
import tagList from './tagList';
import userInfo from './userInfo';


const concatReducers = combineReducers({
    collapse, 
    theme,
    breadcrumb,
    tag,
    message,
    tagList,
    userInfo
});
export default concatReducers;