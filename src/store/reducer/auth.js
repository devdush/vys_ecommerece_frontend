const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,
};

const authLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.user,
        isAuthenticated: action.isAuthenticated,
        isLoading: action.isLoading,
        token: action.token,
        
      };
    case "CHECK_AUTH":
      return {
        ...state,
        user: action.user,
        isAuthenticated: action.isAuthenticated,
        isLoading: action.isLoading,
      };
  }
  return state;
};
export default authLoginReducer;
