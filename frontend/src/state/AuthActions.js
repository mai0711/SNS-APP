export const LoginStart = (user) => ({
    type: "LOGIN_START", //type = action.type inAuthReducer
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user, //return user
});

export const LoginError = (error) => ({
    type: "LOGIN_ERROR",
    payload: error, //return error
});