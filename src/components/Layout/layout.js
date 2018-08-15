import React,{ Component } from 'react'
import Aux from '../../hoc/Aux'

import classes from './layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer:false
    }

    showSideDrawer = () => {
        this.setState({
            showSideDrawer:false
        })
    }

    toggleSidebar = () => {
        this.setState((prevState) => {
           return  {showSideDrawer:!prevState.showSideDrawer}
        })
    }


    render () {
        return (
        <Aux>
        <Toolbar toggleSide={this.toggleSidebar}/>
        <SideDrawer showSide={this.state.showSideDrawer} closedsideDrawer={this.showSideDrawer} />
        <main className={classes.Content}>
            {this.props.children}
        </main>
        </Aux>
        )
    }
} 

export default Layout;