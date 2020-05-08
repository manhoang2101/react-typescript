import { VariantType } from "notistack";
import { IConfig } from "../stories/common/common.types";
import { Cookies } from "react-cookie";

export default interface ContainerProp {
  openNotification: (
    variant: VariantType,
    massage: string,
    option?: Object,
    callBack?: () => void
  ) => void;
  config?: IConfig;
  classes?: any;
  showFooter?: (show: boolean) => void;
  showHeader?: (show: boolean) => void;
  history?: any;
  cookies: Cookies;
}
