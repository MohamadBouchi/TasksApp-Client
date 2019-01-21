export const login = (email, password) => {
    return (dispatch) => {
        const request = {
            query: `
              query {
                login(email: "${email}", password: "${password}")
                {
                  userId
                  token
                  userName
                }
              }
            `
        };
        fetch('http://10.10.11.70:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status === 200)
                return res.json();
            else {
                dispatch({ type: "LOGIN_ERROR", payload: res });
            }
        }).then(resData => {
            if(resData)
                if(resData.data.login.token){
                    dispatch({ type: "LOGIN", payload: resData });
                }
        }).catch(err => {
            console.log(err)
        });
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({ type: "LOGOUT" });
    }
} 


export const changePassword = (id, password) => {
    return (dispatch) => {
        const request = {
            query: `
            mutation {
                updateUserPassword(
                    updateUserPassword:
                        {
                            id:"${id}",
                            password:"${password}"
                        }
                    )
              }
            `
        };
        fetch('http://10.10.11.70:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status === 200)
                dispatch({ type: "CHANGE_PASSWORD" });
            else {
                dispatch({ type: "LOGIN_ERROR", payload: res });
            }
        }).catch(err => {
            console.log(err)
        });
    };
};