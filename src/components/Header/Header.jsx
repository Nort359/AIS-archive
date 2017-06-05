import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './Header.scss';

import { exitUser } from './actions';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authorization: false
        };
    }

    render() {
        const user = this.props.userData;

        return (
            <header>
                <nav className='main-menu'>
                    <ul className='main-menu__left'>
                        <Link to={ '/documents' } activeStyle={{ color: '#00b5ff' }}><li>Документы</li></Link>
                        <li>Помощь</li>
                    </ul>
                    <ul className='main-menu__right'>
                        {
                            user.admin === '1' ?
                                <Link to={ '/AdminPanel' } activeStyle={{ color: '#00b5ff' }}><li>Панель администратора</li></Link>
                                :
                                null
                        }
                        {
                            user.authorization ?
                                <li><i className='main-menu__user-icon glyphicon glyphicon-user'></i>{ `${user.name} ${user.middlename}` }
                                    <ul className='main-menu__drop-menu'>
                                        <Link to='/my-office'><li>Личный кабинет</li></Link>
                                        <li>Мои документы</li>
                                        <li onClick={ this.props.exitUser }>Выход</li>
                                    </ul>
                                </li>
                                :
                                <div>
                                    <Link to='/authorization' activeStyle={{ color: '#00b5ff' }}><li>Авторизация</li></Link>
                                    <Link to='/registration' activeStyle={{ color: '#00b5ff' }}><li>Регистрация</li></Link>
                                </div>
                        }
                    </ul>
                </nav>
            </header>
        );
    }

}

export default connect(
    state => ({
        userData: state.userData
    }),
    dispatch => ({
        exitUser: () => {
            dispatch(exitUser());
        }
    })
)(Header);

