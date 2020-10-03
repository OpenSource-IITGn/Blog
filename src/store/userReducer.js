export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      //   localStorage.setItem('user', JSON.stringify(action.user))
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}
