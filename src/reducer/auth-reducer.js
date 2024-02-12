const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        user: null,
      };
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export { authReducer };
