import React from "react";
import style from "./style";
import { WithStyles, withStyles, Grid, Paper } from "@material-ui/core";
export interface IAppLoginContainerProps extends WithStyles<typeof style> {}
export class AppLoginContainer extends React.Component<
  IAppLoginContainerProps
> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(style)(AppLoginContainer);
