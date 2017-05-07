import React from 'react';
import { Link } from 'react-router';

import './Header.scss';

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authorization: false
        };
    }

    render() {
        return (
            <header>
                <nav className='main-menu'>
                    <ul className='main-menu__left'>
                        <li>Документы</li>
                        <li>Помощь</li>
                    </ul>
                    <ul className='main-menu__right'>
                        {
                            this.state.authorization ?
                                <li>Личный кабинет
                                    <ul className="main-menu__drop-menu">
                                        <li>Настройка</li>
                                        <li>Выход</li>
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
