import React from 'react';
import Styles from './Sidebar.module.css';
import Logo from './Logo.jsx';
import AppNav from './AppNav.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';


export default function Sidebar() {
  return (
    <div className={Styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      {/* <P>List of cities</P> */}
      <Footer />
    </div>
  );
}
