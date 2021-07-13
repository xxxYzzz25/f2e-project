import { GET_REPOSITORIES_PENDING, GET_REPOSITORIES_SUCCESS, GET_REPOSITORIES_FAILURE } from './actions';

const initialState = {
  list: [],
  total: 0,
  pending: false,
};

const bikes = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPOSITORIES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        pending: false,
        list: action.payload.items,
        total: action.payload.total_count >= 1000 ? 100 : action.payload.total_count,
      };
    case GET_REPOSITORIES_FAILURE:
      return {
        ...state,
        pending: false,
      };
    default:
      return state;
  }
};

export default bikes;
