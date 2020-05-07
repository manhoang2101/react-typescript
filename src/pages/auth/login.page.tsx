import { connect } from "react-redux";
import { Dispatch } from "redux";
import LoginContainer from "../../containers/auth/login.container";
import EAuthAction from "../../stories/auth/auth.actions";
import { withStyles } from "@material-ui/core";
import style from "./style";
import { IAppState } from "../../stories/types";
export const mapStateToProps = (state: IAppState) => ({});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (formData: any, callBack: (data: any) => void) =>
    dispatch({
      type: EAuthAction.LOGIN_SUBMIT,
      payload: {
        auth: formData,
        callBack,
      },
    }),
});
export const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(LoginContainer));
