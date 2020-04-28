import MasterContainer from "./containers/master";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ECommonAction from "./stories/common/common.actions";
import { IAppState } from "./stories/types";
export const mapStateToProps = (state: IAppState) => ({
  config: state.commonReducer.config,
  pageLoading: state.commonReducer.pageLoading,
});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConfigAction: () => dispatch({ type: ECommonAction.FETCH_CONFIG }),
});
const App = connect(mapStateToProps, mapDispatchToProps)(MasterContainer);
export default App;
