import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import style from "./style";
import theme from "src/untils/theme";
interface PropsSidebar extends WithStyles<typeof style> {
  Open: boolean;
  HandleDrawerClose?: () => void;
}

class SidebarComponent extends React.Component<PropsSidebar> {
  render() {
    const { classes, HandleDrawerClose, Open } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={Open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            className={`handle-drawer-button`}
            onClick={HandleDrawerClose}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}
export default withStyles(style)(SidebarComponent);
