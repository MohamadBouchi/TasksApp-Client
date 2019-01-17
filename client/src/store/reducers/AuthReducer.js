const re = new RegExp('auth=([^;]+)');
const value = re.exec(document.cookie);
let tokenCookie = '';
let userIdCookie = '';
if (value) {
    tokenCookie = JSON.parse(value[1]).token;
    userIdCookie = JSON.parse(value[1]).userId;
}

const initState = {
    userId: userIdCookie,
    token: tokenCookie,
};
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN':
            const date = new Date();
            date.setTime(date.getTime() + (3600 * 1000));
            document.cookie =
                'auth=' + JSON.stringify({
                    token: action.payload.data.login.token,
                    userId: action.payload.data.login.userId,
                }) +
                '; Expires=' + date.toUTCString() +
                '; path=/';
            return {
                ...state,
                userId: action.payload.data.login.userId,
                token: action.payload.data.login.token,
            };
        case 'LOGIN_ERROR':
            console.log(action.payload)
            return {
                ...state
            };
        default:
            return state;
    }
}
export default authReducer;