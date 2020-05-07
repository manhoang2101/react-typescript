import { VariantType } from "notistack";
export default interface ContainerProp {
  openNotification: (status: VariantType, massage: string) => void;
}
