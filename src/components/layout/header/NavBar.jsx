import { NavLink } from "react-router-dom";

import './NavBar.css'

const NavBar = () => {

    return (
        <nav >
            <NavLink  to="/">
                <span>Logo</span>
            </NavLink>
            <ul>
                <li>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/study">
                        Day
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/work">
                        Week
                    </NavLink>
                </li>



            </ul>
        </nav>
    );
};

export default NavBar;