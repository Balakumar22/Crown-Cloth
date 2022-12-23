import { createSelector } from "reselect";
import { UserData } from "../../utils/firebase/firebase.utils";
import { RootState } from "../store";
import { UserState } from "./user.reducer";

const selectUser = (state: RootState): UserState => state.USER;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
