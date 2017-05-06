import React from 'react';
import { Link } from 'react-router';

import './Header.scss';

export default class Header extends React.Component {

    render() {
        return (
            <header>
                <nav className='main-menu'>
                    <ul className='main-menu__left'>
                        <li>Документы</li>
                        <li>Помощь</li>
                    </ul>
                    <ul className='main-menu__right'>
                        <li>Личный кабинет
                            <ul className="main-menu__drop-menu">
                                <li>Настройка</li>
                                <li>Выход</li>
                            </ul>
                        </li>
                        <li>Авторизация</li>
                        <li>Регистрация</li>
                    </ul>
                </nav>
            </header>
        );
    }

}
