const initialState = {
    roles: [],
    error: null,
  };
  
  const roleReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_ROLES_SUCCESS':
        return {
          ...state,
          roles: action.payload,
        };
      case 'FETCH_ROLES_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'CREATE_ROLE_SUCCESS':
        return {
          ...state,
          roles: [...state.roles, action.payload],
        };
      case 'CREATE_ROLE_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'UPDATE_ROLE_SUCCESS':
        return {
          ...state,
          roles: state.roles.map((role) =>
            role.id === action.payload.id ? action.payload : role
          ),
        };
      case 'UPDATE_ROLE_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'DELETE_ROLE_SUCCESS':
        return {
          ...state,
          roles: state.roles.filter((role) => role.id !== action.payload),
        };
      case 'DELETE_ROLE_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default roleReducer;
  