import React from 'react';
import { NavLink } from 'react-router-dom';
import Style from './PageNav.module.css';
import Logo from './Logo.jsx';
export default function PageNav() {
    return (
        <nav className={Style.nav}>
            <Logo />
            <ul>
                <li>
                    <NavLink to='/Product'>Product</NavLink>
                </li>
                <li>
                    <NavLink to='/Pricing'>Pricing</NavLink>
                </li>
                <li>
                    <NavLink to='/Login' className={Style.ctaLink }>Log in</NavLink>
                </li>
            </ul>
        </nav>
    );
}
