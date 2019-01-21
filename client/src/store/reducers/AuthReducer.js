const re = new RegExp('auth=([^;]+)');
const value = re.exec(document.cookie);
let tokenCookie = '';
let userIdCookie = '';
let userNameCookie = '';
if (value) {
    tokenCookie = JSON.parse(value[1]).token;
    userIdCookie = JSON.parse(value[1]).userId;
    userNameCookie = JSON.parse(value[1]).userName;
}

const initState = {
    userId: userIdCookie,
    token: tokenCookie,
    userName: userNameCookie
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
                    userName: action.payload.data.login.userName,
                }) +
                '; Expires=' + date.toUTCString() +
                '; path=/';
            return {
                ...state,
                userId: action.payload.data.login.userId,
                token: action.payload.data.login.token,
                userName: action.payload.data.login.userName
            };

            case 'LOGOUT':
                document.cookie =
                    'auth=' + JSON.stringify({
                        token: '',
                        userId: '',
                        userName: '',
                    }) +
                    '; path=/';
                return {
                    ...state,
                    userId: '',
                    token: '',
                    userName: ''
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