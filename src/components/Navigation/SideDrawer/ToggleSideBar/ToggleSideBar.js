import React from 'react'

import classes from './ToggleSideBar.css'

const ToggleSideBar = (props) => (
    <div
     onClick={props.toggleSide} className={classes.DrawerToggle}
      style={{cursor:'pointer'}}>
      <div></div>
      <div></div>
      <div></div>
      </div>
)

export default ToggleSideBar;