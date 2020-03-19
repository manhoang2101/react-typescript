import React from "react"
import { useSelector } from 'react-redux'
import { selectorUser } from "../../store/user/user.selector";
const FooterComponent = () => {
    const user = useSelector(selectorUser);
    return <>
        Hello footer
        <footer>{user && user.name}</footer>
    </>
}

export default FooterComponent;