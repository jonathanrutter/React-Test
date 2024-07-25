import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand>Home</NavbarBrand>
        </Navbar>;
    }
}
export default AppNavbar;