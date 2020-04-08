import React from "react";
import { Menu, MenuItem, IconButton, Badge } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
export interface PropsMenu {
  AnchorEl?: HTMLElement | null;
  MobileMoreAnchorEl?: HTMLElement | null;
  HandleMenuClose?: () => void;
  HandleMobileMenuClose?: () => void;
  HandleProfileMenuOpen?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  MenuId: string;
  MobileMenuId: string;
  StoryOpen?: boolean;
}
const MenuComponent = (props: PropsMenu) => {
  const isMenuOpen = Boolean(Boolean(props.AnchorEl) || props.StoryOpen);
  const isMobileMenuOpen = Boolean(props.MobileMoreAnchorEl);
  const renderMenu = (
    <Menu
      anchorEl={props.AnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={props.MenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={props.HandleMenuClose}
    >
      <MenuItem onClick={props.HandleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={props.HandleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={props.MobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={props.MobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={props.HandleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={props.HandleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      {renderMenu}
      {renderMobileMenu}
    </>
  );
};

export default MenuComponent;
