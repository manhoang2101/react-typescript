import { IUserState, IUser } from "../store/user/user.types";
import { connect } from "react-redux";
import { Dispatch } from "redux"
import { IAppState } from "../store/types";
import UserContainer from "../containers/user.container";
import { EUserAction } from "../store/user/user.actions";

const mapStateToProps = (state: IAppState): IUserState => ({
    user: state.userReducer?.user,
    users: state.userReducer?.users
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchUsersAction: () => dispatch({ type: EUserAction.FETCH_USERS }),
    setUser: (user: IUser) => dispatch({ type: EUserAction.SET_USER, payload: user }),
    addUser: (user: IUser) => dispatch({ type: EUserAction.ADD_USER, payload: user })
});
export const UserPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserContainer);
