import React from 'react'
import HeaderComponent from '../src/components/master/header.component'
import MenuComponent from '../src/components/master/menu.component'
import SidebarComponent from '../src/components/master/sidebar.component'
import { menuId, mobileMenuId } from '../src/components/master/constants';



export const Header = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <HeaderComponent
            Open={open}
            SetOpen={setOpen}
            SetHeight={() => { }}
        />
    )
}
    ;
export const MenuHeader = () => {
    const [anchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    return (
        <MenuComponent
            StoryOpen={true}
            AnchorEl={anchorEl}
            MobileMoreAnchorEl={mobileMoreAnchorEl}
            MenuId={menuId}
            MobileMenuId={mobileMenuId}
        />
    )
}


export const Sidebar = () => {
    return (
        <SidebarComponent
            Open={true}
        />
    )
}
export default { title: 'Component/Header' }

