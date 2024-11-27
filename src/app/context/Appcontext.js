"use client"
import { createContext, useEffect, useState } from "react"

export const AppContext = createContext();

function AppContextCreator({children}){
    console.log("appcontext creater -=> " );

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [user, setUser] = useState(typeof window !== 'undefined' && localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null);
    const [token, setToken] = useState(typeof window !== 'undefined' && localStorage.getItem("token") ? JSON.parse(localStorage.getItem('token')) : null);
    const [editMode, setEditMode] = useState(false);
    const [product, setProduct] = useState(null);
    // const [isContextRedy, setIsContextRedy] = useState(false);

    // const User = typeof window !== 'undefined' && localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null;
    // const Token = typeof window !== 'undefined' && localStorage.getItem("token") ? JSON.parse(localStorage.getItem('token')) : null;
    // console.log("auth user at useeffect -=>", user);
    // if(authUser) setAuthUser(authUser);
    // if(authToken) setAuthToken(authToken);

    // useEffect(() => {
    //     console.log("jhkdsjfy hel;low");
    //     const authUser = typeof window !== 'undefined' && localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null;
    //     const authToken = typeof window !== 'undefined' && localStorage.getItem("token") ? JSON.parse(localStorage.getItem('token')) : null;
    //     console.log("auth user at useeffect -=>", authUser);
    //     if(authUser) setAuthUser(authUser);
    //     if(authToken) setAuthToken(authToken);
    //     // setIsContextRedy(true);
    // }, []);

    // console.log("auth user at after useeffect -=>", authUser);

    const setAuthUser = (user) => {
        console.log("set auth user at context -=<>", user);
        setUser(user);
        typeof window !== 'undefined' && localStorage.setItem('user', JSON.stringify(user));
    } 

    const setAuthToken = (token) => {
        setToken(token);
        typeof window !== 'undefined' && localStorage.setItem("token", JSON.stringify(token));
    }

    // if(User){
    //     setAuthUser(User);
    // }

    // if(Token){
    //     setAuthToken(Token);
    // }

    // useEffect(() => {

    //     const User = typeof window !== 'undefined' && localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null;
    //     const Token = typeof window !== 'undefined' && localStorage.getItem("token") ? JSON.parse(localStorage.getItem('token')) : null;

    //     if(User){
    //     setAuthUser(User);
    //     }

    //     if(Token){
    //         setAuthToken(Token);
    //     }
    // }, [typeof window]);

    const value = {
        showLoginModal,
        setShowLoginModal,
        token,
        setToken,
        user,
        setUser,
        setAuthToken,
        setAuthUser,
        setEditMode,
        editMode,
        product,
        setProduct,
        // isContextRedy
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )


}

export default AppContextCreator;