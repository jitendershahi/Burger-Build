import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {
    let attachClass = [classes.SideDrawer, classes.Close]

    if(props.showSide) {
        attachClass = [classes.SideDrawer, classes.Open]
    }

    return (
        <div>
        <Backdrop show={props.showSide} clicked={props.closedsideDrawer}/>
        <div className={attachClass.join(' ')}>
        <div className={classes.Logo}>
            <Logo />
            </div>
            <nav>
            <NavigationItems isAuthenticate={props.isAuth} />
            </nav>
        </div>
        </div>
    )
}

export default SideDrawer;