import {Navbar, NavbarBrand} from 'reactstrap';

import { useState } from 'react';

function AppNavbar({title}) {

    const [show, setShow] = useState(true);

    function toggle() {
        setShow(!show);
    }

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand>{title}</NavbarBrand>
        </Navbar>
    )
}
export default AppNavbar;