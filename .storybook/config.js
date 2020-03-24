import { addDecorator,configure } from "@storybook/react"
import themeDecorator from "./themeDecorator"
import requireContext from "require-context.macro";
const req = requireContext("../src", true, /\.stories\.tsx$/);
function loadStories() {
    req.keys().forEach(req);
}
configure(loadStories, module);
addDecorator(themeDecorator);
 