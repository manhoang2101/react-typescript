import { IUserState, IUser } from "../../stories/user/user.types";
import React from "react";
import AppTable from "../../components/table";
import { WithStyles } from "@material-ui/core";
import style from "../../pages/user/style";
import ContainerProp from "..";
import AppDialog from "../../components/dialog";
import { Button } from "@material-ui/core";
import AppButton from "./../../components/form/button";
import AppForm from "./../../components/form";
import AppTextField from "./../../components/form/textfield";
import * as Yup from "yup";

interface IUserContainerProps extends WithStyles<typeof style> {
  fetchUsersAction?: () => void;
  setUser?: (user: IUser) => void;
  addUser?: (user: IUser) => void;
  deleteUser?: (index: number) => void;
  updateUser?: (user: IUser) => void;
}
type Props = IUserState & IUserContainerProps & ContainerProp;
interface State {
  open: boolean;
  isUpdate: boolean;
  user: IUser;
}

class UserContainer extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      isUpdate: false,
      open: false,
      user: {
        id: "",
        name: "",
        cardNumber: "",
        cardType: "",
      },
    };
  }
  componentDidMount() {
    const { fetchUsersAction } = this.props;
    fetchUsersAction && fetchUsersAction();
  }
  handelOnSubmit = (user: any) => {
    const {updateUser, addUser, history } = this.props;
    const { isUpdate } = this.state;
    if (isUpdate) {
      updateUser && updateUser(user);
      this.handleClickClose();
    } else {
      addUser && addUser(user);
      history.push("/users");
      this.handleClickClose();
    }
  };
  handleClickClose = () => {
    this.setState({ open: false });
  };
  handleClickOpen = () => {
    const { setUser } = this.props; 
    setUser && setUser({ id: "", name: "", cardNumber: "", cardType: "" });
    this.setState({ open: true, isUpdate: false });
  };
  handleOnDelete = (row: any) => {
    const { deleteUser } = this.props;
    deleteUser && deleteUser(row.index);
  };
  handleOnUpdate = (cell: any) => {
    const { setUser } = this.props;
    setUser && setUser(cell.row);
    this.setState({ open: true, isUpdate: true });
  };
  onCancel =()=>{
    this.handleClickClose();
  }
  render() {

    const { open } = this.state;
    const { users = [] } = this.props;
    const SignupSchema = Yup.object().shape({
      id: Yup.string().required("this is field Required"),
      name: Yup.string().required("this is field Required"),
    });
    const { user } = this.props;
    return (
      <>
        {open && (
          <div>
            <AppDialog
              maxWidth={"sm"}
              fullWidth
              open={open}
              onClose={this.handleClickClose}
              dialogContent={
                <AppForm
                  onSubmit={this.handelOnSubmit}
                  formSchema={SignupSchema}
                  initialValues={user && user || {}}
                  render={(formik) => {
                    return (
                      <div style={{ padding: 20 }}>
                        <AppTextField
                          name={`id`}
                          value={formik.values.id}
                          onChange={formik.handleChange}
                          label={`ID *`}
                          error={
                            formik.errors.id !== undefined && formik.touched.id
                          }
                          helperText={formik.errors.id}
                          onBlur={formik.handleBlur}
                          disabled={!!(user && user.id)}
                        ></AppTextField>
                        <AppTextField
                          name={`name`}
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          label={`Name *`}
                          error={
                            formik.errors.name !== undefined && formik.touched.name
                          }
                          helperText={formik.errors.name}
                          onBlur={formik.handleBlur}
                        ></AppTextField>
                        <AppTextField
                          name={`cardNumber`}
                          value={formik.values.cardNumber}
                          onChange={formik.handleChange}
                          label={`Card Number`}
                          onBlur={formik.handleBlur}
                        ></AppTextField>
                        <AppTextField
                          name={`cardType`}
                          value={formik.values.cardType}
                          onChange={formik.handleChange}
                          label={`CardType `}
                          onBlur={formik.handleBlur}
                        ></AppTextField>
                        <br />
                        <AppButton
                          type="submit"
                          variant="contained"
                          color="primary"
                          text="Submit"
                          // onClick={() => console.log(user)}
                        />
                        <AppButton
                          type="button"
                          variant="contained"
                          color="inherit"
                          text="Cancel"
                          onClick={this.onCancel}
                        />
                      </div>
                    );
                  }}
                ></AppForm>
              }
            />
          </div>
        )}
        <Button
          variant="outlined"
          type="submit"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Add User
        </Button>
        <AppTable
          classes={this.props.classes.addUser}
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
            {
              label: "action",
              key: "",
              renderCell: (row: number) => {
                return (
                  <>
                    <AppButton
                      type="button"
                      variant="contained"
                      color={"inherit"}
                      text="Delete"
                      onClick={() => this.handleOnDelete(row)}
                    />
                    <AppButton
                      type="button"
                      variant="contained"
                      color={"primary"}
                      text="Update"
                      onClick={() => this.handleOnUpdate(row)}
                    />
                  </>
                );
              },
            },
          ]}
          data={users}
        />
      </>
    );
  }
}
export default UserContainer;
