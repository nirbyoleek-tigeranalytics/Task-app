const initialState = {
    tasks: [],
    error: null,
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TASKS_SUCCESS':
        return {
          ...state,
          tasks: action.payload,
        };
      case 'FETCH_TASKS_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'CREATE_TASK_SUCCESS':
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
      case 'CREATE_TASK_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'UPDATE_TASK_SUCCESS':
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id ? action.payload : task
          ),
        };
      case 'UPDATE_TASK_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'DELETE_TASK_SUCCESS':
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.payload),
        };
      case 'DELETE_TASK_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
        case 'FETCH_USER_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'FETCH_USER_TASKS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'UPDATE_TASK_STATUS_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case 'UPDATE_TASK_STATUS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
      default:
        return state;
    }
  };
  
  export default taskReducer;
  