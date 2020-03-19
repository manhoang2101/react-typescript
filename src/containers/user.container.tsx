import { IUserState, IUser } from "../store/user/user.types";
import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import { withStyles, WithStyles } from "@material-ui/core";
import { compose } from 'redux';
import style from "src/store/user/style";
import AppButton from "src/components/buttons/button.component";

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
            <Card className={classes.card}>
                <AppButton
                    text="Add User"
                    color="primary"
                    onClick={() => { this.addUser() }}
                    class="DDDDA"
                    style={{
                        '&hover': {
                            backgroundColor: '#000'
                        }
                    }}
                />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">cardNumber</TableCell>
                                <TableCell align="right">cardType</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map((user, index) => (
                                <TableRow key={index} onClick={() => this.onSelectUser(user)}>
                                    <TableCell align="right">{user.id}</TableCell>
                                    <TableCell component="th" scope="row"> {user.name} </TableCell>
                                    <TableCell align="right">{user.cardNumber}</TableCell>
                                    <TableCell align="right">{user.cardType}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
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