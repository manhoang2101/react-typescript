import { IUserState, IUser } from "../../stories/user/user.types";
import React from "react";
import { WithStyles } from "@material-ui/core";
import style from "../../pages/user/style";
import ContainerProp from "..";
// import Button from "@material-ui/core/Button";
import AppButton from "./../../components/form/button";
import AppForm from "./../../components/form";
import AppTextField from "./../../components/form/textfield";
import * as Yup from "yup";

interface IUserContainerProps extends WithStyles<typeof style> {
fetchUsersAction?: () => void;
  setUser?: (user: IUser) => void;
  addUser?: (user: IUser) => void;
}
type Props = IUserState & IUserContainerProps & ContainerProp;
class addUserContainer extends React.Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.onSelectUser.bind(this);
    this.addUser.bind(this);

  }
  componentDidMount() {
    const { fetchUsersAction } = this.props;
    fetchUsersAction && fetchUsersAction();
  }
  handelSubmit = (data : any) =>{
    console.log("values :", data);
    const {  addUser , history } = this.props;
    addUser && addUser(data);
    history.push("/users");

  }
  render() {
    const SignupSchema = Yup.object().shape({
      id: Yup.string().required("this is field Required"),
    });

    return (
      <AppForm
        onSubmit={this.handelSubmit}
        formSchema={SignupSchema}
        initialValues={{}}
        render={(formik) => (
          <>
            <br />

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
          ></AppTextField>
            <AppTextField
            name={`name`}
            value={formik.values.name}
            onChange={formik.handleChange}
            label={`Name *`}
            onBlur={formik.handleBlur}
          ></AppTextField>
          <AppTextField
            name={`cardNumber`}
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            label={`Card Number *`}
            onBlur={formik.handleBlur}
          ></AppTextField>
          <AppTextField
            name={`cardType`}
            value={formik.values.cardType}
            onChange={formik.handleChange}
            label={`CardType *`}
            onBlur={formik.handleBlur}
          ></AppTextField>
            <br/>
            <AppButton
              type="submit"
              variant="contained"
              color="primary"
              text="Add"
              onClick={() => console.log(formik)}
            />
          </>
        )}
      ></AppForm>
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
export default addUserContainer;
