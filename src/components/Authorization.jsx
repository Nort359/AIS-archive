import React from 'react';
import { Link } from 'react-router';

import Input from './Form/Input';
import Button from './Button';
import Form from './Form/Form';
import AForm from './classes/AForm';

export default class Authorization extends AForm {

    constructor(props) {
        super(props);

        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }

    /**
     * Проверяет Email на валидность
     * @param event — Объект, на котором происходит событие
     */
    checkEmail(event) {
        const patternEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

        const messageOk = 'Email введён корректно';
        const messageError = 'Email введён неккоректно';
        const messageDefault = 'Ваш Email';

        this.checkValidTextInput(event, patternEmail, messageOk, messageError, messageDefault);
    }

    /**
     * Проверяет пароль на валидность
     * @param event — Объект, на котором происходит событие
     */
    checkPassword(event) {
        const patternStrongPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        const patternWeakPassword = /^.{6,}$/;

        this.checkValidPasswordInput(event, patternStrongPassword, patternWeakPassword);
    }

    render() {
        return (
            <Form header={ 'Авторизация' }>
                <Input
                    type={ 'email' }
                    placeholder={ 'Ваш Email' }
                    icon='glyphicon glyphicon-user'
                    inputId={ 'userEmail' }
                    onBlur={ this.checkEmail }
                    onFocus={ event => { this.focusInput(event, 'Ваш Email'); } }
                />
                <Input
                    type={ 'password' }
                    placeholder={ 'Ваш пароль' }
                    icon='glyphicon glyphicon-lock'
                    inputId={ 'userPassword' }
                    onChange={ this.checkPassword }
                />

                <Button type="button">Войти</Button>

                <Link to='/registration'>Ещё нет аккаунта? Создать<i className="glyphicon glyphicon-pencil"></i></Link>
                <Link to='#'>Забыли пароль?</Link>
            </Form>
        );
    }

}
