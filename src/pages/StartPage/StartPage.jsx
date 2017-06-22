import React from 'react';
import { Link } from 'react-router';

import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';
import Button from '../../components/Button/Button';
import Authorization from '../Authorization/Authorization';
import { connect } from 'react-redux';

import './StartPage.scss';

class StartPage extends React.Component {

    render() {
        return (
            <Authorization bgImage={ 'img/startBackground3.jpeg' } />
        );
    }

}

StartPage.path = '/';

export default connect(
    state => ({
        userData: state.userData
    }),
    dispatch => ({
    })
)(StartPage);
