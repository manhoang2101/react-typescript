import { VariantType } from "notistack";
import { IConfig } from "../stories/common/common.types";

export default interface ContainerProp {
  openNotification?: (status: VariantType, massage: string) => void;
  config?: IConfig;
  classes?: any;
}
