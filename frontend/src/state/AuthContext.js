import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer"

//default
const initialState = {
    user:JSON.parse(localStorage.getItem("user")) || null,
//  user: {
//     _id: "64c21350df0ba6d69be1e1ef",
//     username: "test",
//     email: "test@gmail.com",
//     password: "123456",
//     desc: "student",
//     profilePicture: "https://assets.website-files.com/619e8d2e8bd4838a9340a810/647c106477f8934b266ba39c_profile-picture-og.webp",
//     coverPicture: "",
//     followers: [],
//     followings:
//     "64c22eac2659c42446f4036d",
//     isAdmin: false,
//   },
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

//store current user data in localStorage
useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
}, [state.user]);

    return(
        <AuthContext.Provider
        value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
};

