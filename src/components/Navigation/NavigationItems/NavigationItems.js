import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {props.isAuthenticate ?
         <NavigationItem link="/logout">Logout</NavigationItem> 
         : <NavigationItem link="/auth">Authenticate</NavigationItem> }

        {/* <NavigationItem link="/checkout">Checkout</NavigationItem> */}
    </ul>

)

export default NavigationItems;