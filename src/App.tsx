import MasterContainer from "./containers/master";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ECommonAction from "./store/common/common.actions";
import { ICommonState } from "./store/common/common.types";
import { IAppState } from "./store/types";
export const mapStateToProps = (state: IAppState): ICommonState => ({
  config: state.commonReducer.config,
  pageLoadding: state.commonReducer.pageLoadding,
});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConfigAction: () => dispatch({ type: ECommonAction.FETCH_CONFIG }),
});
const App = connect(mapStateToProps, mapDispatchToProps)(MasterContainer);
export default App;
