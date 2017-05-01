import React from 'react';

import Input from './Input';
import Button from '../Button';

import './Authorization.scss';

export default class Authorization extends React.Component {

    render() {
        return (
            <main className="authorization">
                <h1>Авторизация</h1>

                <form>
                    <Input placeholder={ 'Ваш Email' } />
                    <Input placeholder={ 'Ваш пароль' } />
                    <Button type="button">Авторизоваться</Button>
                </form>

            </main>
        );
    }

}
