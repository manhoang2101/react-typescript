import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import style from "./style";
import MenuComponent from "./menu.component";
import SidebarComponent from "./sidebar.component";
import { menuId, mobileMenuId } from "./constants";
export interface IAppHeaderProps extends WithStyles<typeof style> {
  Open: boolean;
  SetOpen?: (type: boolean) => void;
  SetHeight?: (type: string, height: number) => void;
}
export interface IAppHeaderStates {
  anchorEl: null | HTMLElement;
  mobileMoreAnchorEl: null | HTMLElement;
}

export class HeaderComponent extends React.Component<
  IAppHeaderProps,
  IAppHeaderStates
> {
  containerRef: any;
  constructor(props: Readonly<IAppHeaderProps>) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };
    this.containerRef = React.createRef();
  }
  refCallback = (element: HTMLElement) => {
    if (element) {
      const bounding = element.getBoundingClientRect();
      this.props.SetHeight &&
        this.props.SetHeight("HeaderComponent", bounding.height);
    }
  };
  componentDidMount() {}
  handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleDrawerOpen = () => {
    this.props.SetOpen && this.props.SetOpen(true);
  };

  handleDrawerClose = () => {
    this.props.SetOpen && this.props.SetOpen(false);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.grow}>
        <AppBar
          ref={this.refCallback}
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.props.Open,
          })}
        >
          <Toolbar>
            <IconButton
              edge="start"
              onClick={this.handleDrawerOpen}
              color="inherit"
              aria-label="open drawer"
              className={`${clsx(
                classes.menuButton,
                this.props.Open && classes.hide
              )} button-control-sidebar`}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              3SHU-UI
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <MenuComponent
          AnchorEl={this.state.anchorEl}
          MobileMoreAnchorEl={this.state.mobileMoreAnchorEl}
          HandleMenuClose={this.handleMenuClose}
          HandleMobileMenuClose={this.handleMobileMenuClose}
          HandleProfileMenuOpen={this.handleProfileMenuOpen}
          MenuId={menuId}
          MobileMenuId={mobileMenuId}
        ></MenuComponent>
        <SidebarComponent
          Open={this.props.Open}
          HandleDrawerClose={this.handleDrawerClose}
        ></SidebarComponent>
      </div>
    );
  }
}

export default withStyles(style)(HeaderComponent);
