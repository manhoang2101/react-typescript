import HeaderComponent from "../../components/master/header.component";
import React from "react";
import FooterComponent from "../../components/master/footer.component";
import { AppRoutes } from "../../untils/routers";
import { Route, Redirect } from "react-router-dom";
import styles from "../../untils/styles";
import { withSnackbar, WithSnackbarProps, VariantType } from "notistack";
import { WithStyles, withStyles } from "@material-ui/core";
import clsx from "clsx";
import { IConfig } from "../../stories/common/common.types";
import { Cookies } from "react-cookie";
import CONSTANTS from "../../untils/constants";

export interface PrivateProps extends WithStyles<typeof styles> {
  fetchConfigAction: () => void;
  openNotification: (
    variant: VariantType,
    massage: string,
    option?: Object,
    callBack?: () => void
  ) => void;
  config: IConfig;
  pageLoading: boolean;
  cookies: Cookies;
  history: any;
}
export interface PrivateStates {
  OpenSidebar: boolean;
  HeightHeader: number;
  HeightFooter: number;
  showHeader: boolean;
  showFooter: boolean;
}
export type Props = PrivateProps & WithSnackbarProps;
export class PrivateContainer extends React.Component<Props, PrivateStates> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      OpenSidebar: false,
      HeightHeader: 0,
      HeightFooter: 0,
      showHeader: true,
      showFooter: true,
    };
    this.handleOpenSidebar.bind(this);
    this.setHeightElement.bind(this);
    this.props.fetchConfigAction();
  }
  componentDidMount() {}

  handleOpenSidebar = (status: boolean) => {
    this.setState({
      OpenSidebar: status,
    });
  };
  handleShowHeader = (show: boolean) => {
    this.setState({ showHeader: show });
  };
  handleShowFooter = (show: boolean) => {
    this.setState({ showFooter: show });
  };
  handleOpenNotification = (
    variant: VariantType,
    message: string,
    option?: any,
    callBack?: () => void
  ) => {
    this.props.openNotification(variant, message, option, callBack);
  };
  setHeightElement = (name: string, height: number) => {
    switch (name) {
      case "HeaderComponent":
        this.setState({
          HeightHeader: height,
        });
        break;
      case "FooterComponent":
        this.setState({
          HeightFooter: height,
        });
        break;
    }
  };
  render() {
    const auth = this.props.cookies.get(CONSTANTS.AUTH_KEY);
    if (!auth) {
      return <Redirect to="/login" />;
    }
    const { classes } = this.props;
    const { showHeader, showFooter } = this.state;
    return (
      <>
        {showHeader && (
          <HeaderComponent
            Open={this.state.OpenSidebar}
            SetOpen={this.handleOpenSidebar}
            SetHeight={this.setHeightElement}
            key="HeaderComponent"
          />
        )}
        <main
          style={{
            marginTop: this.state.HeightHeader,
            marginBottom: this.state.HeightFooter,
          }}
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.OpenSidebar,
          })}
        >
          {AppRoutes.filter((route) => route.isPrivate === true).map(
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
        </main>
        {showFooter && (
          <FooterComponent
            SetHeight={this.setHeightElement}
            key="FooterComponent"
          />
        )}
      </>
    );
  }
}

export default withStyles(styles)(withSnackbar(PrivateContainer));
