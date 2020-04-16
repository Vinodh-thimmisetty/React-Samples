import { ADD_TRANSACTION, DELETE_TRANSACTION } from "./types";

const AppReducer = (state, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (tr) => tr.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default AppReducer;
