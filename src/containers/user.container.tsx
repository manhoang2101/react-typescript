import { IUserState, IUser } from "../store/user/user.types";
import React from "react";
import Card from '@material-ui/core/Card';
import { withStyles, WithStyles } from "@material-ui/core";
import { compose } from 'redux';
import style from "src/store/user/style";
import AppButton from "src/components/button";
import AppTable from '../components/table';

interface PropsFromDispatch extends WithStyles<typeof style> {
    fetchUsersAction: Function,
    setUser: Function,
    addUser: Function
}

type Props = IUserState & PropsFromDispatch

class UserContainer extends React.Component<Props>  {
    constructor(props: Readonly<Props>) {
        super(props);
        this.onSelectUser.bind(this);
    }
    componentDidMount() {
        const { fetchUsersAction } = this.props;
        fetchUsersAction();

    }
    render() {
        const { users = [], classes } = this.props;
        return (

            <AppTable
                classes={this.props.classes}
                columns={
                    [

                        {
                            label: 'id',
                            key: 'id'
                        },
                        {
                            label: 'Name',
                            key: 'name'
                        },
                        {
                            label: 'cardNumber',
                            key: 'cardNumber'
                        },
                        {
                            label: 'cardType',
                            key: 'cardType'
                        }
                    ]
                }
                data={users}
            />
        );
    }
    onSelectUser(user: IUser) {
        const { setUser } = this.props;
        setUser(user)
    }
    addUser() {
        const { users, addUser } = this.props;
        const user = users && users[0];
        addUser(user);
    }
}
export default compose(
    withStyles(style)(UserContainer)
)