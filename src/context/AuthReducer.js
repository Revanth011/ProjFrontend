const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload
            };
        case "LOGOUT":
            localStorage.removeItem('user');
            return {
                user: null
            };
        default:
            return state;
    }
};

export default AuthReducer;
