import { UserActionTypes } from "./user.types";
const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      // 见root-reducer：其实下面👇的大括号的名字是user object
      // user: { ...state, currentUser: action.payload }
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
