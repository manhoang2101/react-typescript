import React from "react"
import { WithStyles, withStyles } from "@material-ui/core";
import style from "./style";

export interface PropsAppHeader extends WithStyles<typeof style> {
    SetHeight: Function
};
export class FooterComponent extends React.Component<PropsAppHeader> {
    refCallback = (element: HTMLElement | null) => {
        if (element) {
            const bounding = element.getBoundingClientRect();
            this.props.SetHeight('FooterComponent', bounding.height);
        }
    };
    render() {
        return <div ref={this.refCallback} > </div>
    }
}
export default withStyles(style)(FooterComponent);