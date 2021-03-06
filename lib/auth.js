import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';


const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    console.log({ user });

    const provider = new firebase.auth.GithubAuthProvider();


    const signinWithGithub = (email, password) => {
        return firebase
            .auth()
            .signInWithPopup(provider)
            .then((response) => {
                setUser(response.user);
                return response.user;
            });
    };



    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
            });
    };



    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGithub,
        signout,

    };
};

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};


const getFromQueryString = (key) => {
    return queryString.parse(window.location.search)[key];
};