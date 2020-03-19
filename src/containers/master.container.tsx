import HeaderComponent from "../components/master/header.component"
import React from "react"
import FooterComponent from "../components/master/footer.component"
import { AppRoutes } from "../untils/routers"
import { Switch, Route } from "react-router-dom"
import styles from "src/untils/styles"
import { WithStyles, withStyles } from "@material-ui/core"
import clsx from 'clsx'
export interface PropsMaster extends WithStyles<typeof styles> { }
export interface StatesMaster {
    OpenSidebar: boolean
}
export class MasterContainer extends React.Component<PropsMaster, StatesMaster> {

    constructor(props: Readonly<PropsMaster>) {
        super(props);
        this.state = {
            OpenSidebar: false
        }
    }
    handleOpenSidebar = (status: boolean) => {
        this.setState({
            OpenSidebar: status
        })
    }
    render() {
        const { classes } = this.props
        return (
            <>
                <HeaderComponent
                    Open={this.state.OpenSidebar}
                    SetOpen={this.handleOpenSidebar}
                    key="HeaderComponent" />
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: this.state.OpenSidebar,
                    })}>
                    <Switch key="Switch">
                        {
                            AppRoutes.map(route => (
                                <Route exact path={route.path} key={route.lable} >
                                    {<route.component />}
                                </Route>)
                            )
                        }
                    </Switch>
                </main>
                <FooterComponent key="FooterComponent" />
            </>
        )
    }
}

export default withStyles(styles)(MasterContainer)