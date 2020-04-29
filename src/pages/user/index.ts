import { IUserState, IUser } from "../../stories/user/user.types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IAppState } from "../../stories/types";
import UserContainer from "../../containers/user";
import EUserAction from "../../stories/user/user.actions";
import { withStyles } from "@material-ui/core";
import style from "./style";

export const mapStateToProps = (state: IAppState): IUserState => ({
  user: state.userReducer?.user,
  users: state.userReducer?.users,
});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsersAction: () => dispatch({ type: EUserAction.FETCH_USERS }),
  setUser: (user: IUser) =>
    dispatch({ type: EUserAction.SET_USER, payload: user }),
  addUser: (user: IUser) =>
    dispatch({ type: EUserAction.ADD_USER, payload: user }),
});
export const UserPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(UserContainer));
