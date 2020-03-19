import React from 'react'
import HeaderComponent from '../src/components/master/header.component'
import MenuComponent from '../src/components/master/menu.component'

export const MenuHeader = () => (
        <MenuComponent></MenuComponent>
);
export const Header = () => {
    const [open, setOpen] = React.useState(false);
    return  (
        <HeaderComponent Open={open} SetOpen={setOpen} />
    )
}   
;
 
export default { title: 'Header' }

