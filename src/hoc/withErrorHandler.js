import React, { Component } from 'react';

import Yux from './Yux'
import Modal from '../components/UI/Modal/Modal'


const withErrorHandler = (WrapperComponernt, axios) => {
    return class extends Component {

        state = {
            error:null,
        };
        reqinterceptors
        resinterceptors

        componentWillMount() {
           this.reqinterceptors = axios.interceptors.request.use(req => {
                this.setState({ error : null})
                return req
            })

           this.resinterceptors = axios.interceptors.response.use(res => res,error => {
                this.setState({ error : error})
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqinterceptors);
            axios.interceptors.response.eject(this.resinterceptors);
        }

        closeBackDrop = () => {
        this.setState({
            error: null,
        })
        }

        render() {
            return (
                <Yux>
                <Modal show={this.state.error} clickedback={this.closeBackDrop}>
                    {(this.state.error) ? this.state.error.message : null}
                </Modal>
                <WrapperComponernt {...this.props}/>
                </Yux>
            )
        }
    }
}

export default withErrorHandler;