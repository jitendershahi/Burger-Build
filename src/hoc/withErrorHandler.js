import React, { Component } from 'react';

import Yux from './Yux'
import Modal from '../components/UI/Modal/Modal'


const withErrorHandler = (WrapperComponernt, axios) => {
    return class extends Component {

        state = {
            error:null
        }

        componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error : null})
                return req
            })

            axios.interceptors.response.use(res => res,error => {
                this.setState({ error : error})
            })
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