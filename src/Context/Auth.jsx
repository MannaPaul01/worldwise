import { createContext, useReducer } from "react";


const UserAuthContext = createContext();
const initialState = {
    user: null,
    isAuthenticated: false
};
function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };
        case 'logout':
            return {
                ...state,
                user: null,
                isAuthenticated: false
            };
        default: {
            throw new Error('invalid action type !');
        }
    }
}
const Fake_user = {
    name: 'Manna',
    email: 'manna.paul@gmail.com',
    password: 'Manna#123'

}

function UserAuthContextProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

    function login(email, password) {
        if (email === Fake_user.email && password === Fake_user.password) {
            dispatch({ type: 'login', payload: Fake_user });
        }
    }
    function logout() {
        dispatch({ type: 'logout' })

    }
    return (
        <UserAuthContext.Provider
            value={
                { user, isAuthenticated, login, logout }
            }>
            {children}
        </UserAuthContext.Provider>
    )
};

export {UserAuthContext,UserAuthContextProvider};