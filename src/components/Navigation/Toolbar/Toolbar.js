import React from 'react'

import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import ToggleSideBar from '../SideDrawer/ToggleSideBar/ToggleSideBar'

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <ToggleSideBar toggleSide={props.toggleSide}/>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticate={props.isAuth}/>
        </nav>
    </header>
)

export default Toolbar; 