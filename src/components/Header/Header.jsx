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

        const userName = user.middlename != null ? user.middlename : user.surname;

        return (
            <div className='header_container'>
                <header>
                    <nav className='main-menu'>
                        <ul className='main-menu__left'>
                            <Link to={ '/documents' } activeStyle={{ color: '#00b5ff' }}><li>Документы</li></Link>
                            <Link to={ '/help' }><li>Помощь</li></Link>
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
                                    <li><i className='main-menu__user-icon glyphicon glyphicon-user'></i>{ `${user.name} ${userName}`  }
                                        <ul className='main-menu__drop-menu'>
                                            <Link to='/my-office'><li>Личный кабинет</li></Link>
                                            <Link to='/my-office/Notifications'><li>Уведомления</li></Link>
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
            </div>
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

