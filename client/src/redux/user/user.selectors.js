import { createSelector } from "reselect";

// 1. input selector: get user in state
const selectUser = state => state.user;

// 2. output selector:
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
