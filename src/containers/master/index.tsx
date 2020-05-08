import React, { Fragment } from "react";
import { AppRoutes } from "../../untils/routers";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import styles from "../../untils/styles";
import { withSnackbar, WithSnackbarProps, VariantType } from "notistack";
import {
  WithStyles,
  withStyles,
  Backdrop,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IConfig } from "../../stories/common/common.types";
import { Cookies } from "react-cookie";
import PrivateContainer from "./privateRoute";
export interface MasterProps extends WithStyles<typeof styles> {
  fetchConfigAction: () => void;
  config: IConfig;
  pageLoading: boolean;
  cookies: Cookies;
  history: any;
}
export interface MasterStates {
  OpenSidebar: boolean;
  HeightHeader: number;
  HeightFooter: number;
  showHeader: boolean;
  showFooter: boolean;
}
export type Props = MasterProps & WithSnackbarProps;
export class MasterContainer extends React.Component<Props, MasterStates> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      OpenSidebar: false,
      HeightHeader: 0,
      HeightFooter: 0,
      showHeader: true,
      showFooter: true,
    };
    this.props.fetchConfigAction();
  }
  handleOpenNotification = (
    variant: VariantType,
    message: string,
    option?: any,
    callBack?: () => void
  ) => {
    const defaultOption = {
      variant,
      action: (key: number) => (
        <Fragment>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              this.props.closeSnackbar(key);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Fragment>
      ),
    };

    const mergeOption = { ...defaultOption, ...option };
    this.props.enqueueSnackbar(message, mergeOption);
    callBack && callBack();
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <Router>
          <Switch key="Switch">
            {AppRoutes.filter((route) => route.isPrivate === false).map(
              (route) => (
                <Route
                  exact
                  path={route.path}
                  key={route.key}
                  render={(props) => (
                    <route.component
                      {...props}
                      config={this.props.config}
                      openNotification={this.handleOpenNotification}
                      cookies={this.props.cookies}
                    />
                  )}
                />
              )
            )}
            {
              <PrivateContainer
                {...this.props}
                openNotification={this.handleOpenNotification}
              />
            }
          </Switch>
        </Router>
        <Backdrop className={classes.backdrop} open={this.props.pageLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }
}

export default withStyles(styles)(withSnackbar(MasterContainer));
