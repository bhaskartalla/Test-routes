import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} from '../actions/todosActions'

const initialState = {
  todos: [],
  loading: false,
  error: null,
}

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload.todos,
      }
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default todosReducer
