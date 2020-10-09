import { SET_USER_INFO } from '../constants/index';
const userInfoState = JSON.parse(localStorage.getItem('userInfo')) || { id:0, username: '', avatar: ''};


const userInfo = (state = userInfoState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return action.data; 
        default:
            return state;
    };
};
export default userInfo;