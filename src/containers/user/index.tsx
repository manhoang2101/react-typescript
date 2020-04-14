import { IUserState, IUser } from "../../store/user/user.types";
import React from "react";
import { WithStyles } from "@material-ui/core";
import style from "../../pages/user/style";
import AppTable from "../../components/table";

interface PropsFromDispatch extends WithStyles<typeof style> {
  fetchUsersAction?: () => void;
  setUser?: (user: IUser) => void;
  addUser?: (user: IUser) => void;
}

type Props = IUserState & PropsFromDispatch;

class UserContainer extends React.Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.onSelectUser.bind(this);
  }
  componentDidMount() {
    const { fetchUsersAction } = this.props;
    fetchUsersAction && fetchUsersAction();
  }
  render() {
    const { users = [] } = this.props;
    return (
      <AppTable
        classes={this.props.classes}
        columns={[
          {
            label: "id",
            key: "id",
          },
          {
            label: "Name",
            key: "name",
          },
          {
            label: "cardNumber",
            key: "cardNumber",
          },
          {
            label: "cardType",
            key: "cardType",
          },
        ]}
        data={users}
      />
    );
  }
  onSelectUser(user: IUser) {
    const { setUser } = this.props;
    setUser && setUser(user);
  }
  addUser() {
    const { users, addUser } = this.props;
    const user = users && users[0];
    addUser && addUser(user);
  }
}
export default UserContainer;
