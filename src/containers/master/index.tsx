import HeaderComponent from "../../components/master/header.component";
import React from "react";
import FooterComponent from "../../components/master/footer.component";
import { AppRoutes } from "../../untils/routers";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import styles from "../../untils/styles";
import {
  WithStyles,
  withStyles,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import clsx from "clsx";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { IConfig } from "../../stories/common/common.types";
export interface PropsMaster extends WithStyles<typeof styles> {
  fetchConfigAction: () => void;
  openNotification: (callBack: () => void) => void;
  config: IConfig;
  pageLoading: boolean;
}
export interface StatesMaster {
  OpenSidebar: boolean;
  HeightHeader: number;
  HeightFooter: number;
}
export class MasterContainer extends React.Component<
  PropsMaster,
  StatesMaster
> {
  constructor(props: Readonly<PropsMaster>) {
    super(props);
    this.state = {
      OpenSidebar: false,
      HeightHeader: 0,
      HeightFooter: 0,
    };
    this.handleOpenSidebar.bind(this);
    this.setHeightElement.bind(this);
    this.props.fetchConfigAction();
  }
  handleOpenSidebar = (status: boolean) => {
    this.setState({
      OpenSidebar: status,
    });
  };
  handOpenNotification = (variant: VariantType, massage: string) => {
    const { openNotification } = this.props;
    const { enqueueSnackbar } = useSnackbar();
    openNotification(() => {
      enqueueSnackbar(massage, { variant });
    });
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
    const { classes } = this.props;
    return (
      <SnackbarProvider maxSnack={3}>
        <HeaderComponent
          Open={this.state.OpenSidebar}
          SetOpen={this.handleOpenSidebar}
          SetHeight={this.setHeightElement}
          key="HeaderComponent"
        />
        <main
          style={{
            marginTop: this.state.HeightHeader,
            marginBottom: this.state.HeightFooter,
          }}
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.OpenSidebar,
          })}
        >
          <Router>
            <Switch key="Switch">
              {AppRoutes.map((route) => (
                <Route
                  exact
                  path={route.path}
                  key={route.label}
                  pathMatch={route?.pathMatch}
                >
                  {
                    <route.component
                      openNotification={this.handOpenNotification}
                    />
                  }
                </Route>
              ))}
            </Switch>
          </Router>
          <Backdrop className={classes.backdrop} open={this.props.pageLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </main>
        <FooterComponent
          SetHeight={this.setHeightElement}
          key="FooterComponent"
        />
      </SnackbarProvider>
    );
  }
}

export default withStyles(styles)(MasterContainer);
