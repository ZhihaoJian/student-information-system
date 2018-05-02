import React from 'react';
import {connect} from 'react-redux';
import {doLogout} from '../../redux/login.redux';

@connect(
    state=>state.login,
    {doLogout}
)
class Logout extends React.Component{
    
    componentDidMount(){
        this.props.doLogout();
    }

    render(){
        return null
    }
}

export default Logout;