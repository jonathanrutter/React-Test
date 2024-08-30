import { useState } from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, NavbarBrand, Nav, NavItem} from 'reactstrap';

function AppNavbar({title}) {

    const [show, setShow] = useState(true);

    function toggle() {
        setShow(!show);
    }

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand>{title}</NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/help">Help</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/employees">Employees</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
    )
}
export default AppNavbar;