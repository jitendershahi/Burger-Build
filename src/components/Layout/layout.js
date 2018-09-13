import React,{ Component } from 'react'
import Aux from '../../hoc/Aux'

import classes from './layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

import { connect } from 'react-redux'

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
        <Toolbar
        isAuth={this.props.isAuthenticated}
         toggleSide={this.toggleSidebar}/>
        <SideDrawer
        isAuth={this.props.isAuthenticated}
         showSide={this.state.showSideDrawer} closedsideDrawer={this.showSideDrawer} />
        <main className={classes.Content}>
            {this.props.children}
        </main>
        </Aux>
        )
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);