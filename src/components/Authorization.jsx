import React from 'react';
import { Link } from 'react-router';

import Input from './Form/Input';
import Button from './Button';
import Form from './Form/Form';
import Notification from './Notification/Notification';
import AForm from './classes/AForm';

export default class Authorization extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            isAuthorization: false
        };

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

    _renderForm() {
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

                <Button type="button" onClick={ () => { this.setState({ isAuthorization: true }) } }>Войти</Button>

                <Link to='/registration'>Ещё нет аккаунта? Создать<i className="glyphicon glyphicon-pencil"></i></Link>
                <Link to='#'>Забыли пароль?</Link>
            </Form>
        );
    }

    _renderNotification() {
        return (
            <Notification header={ 'Вы успешно авторизовались' } btnText={ 'Ок' }>
                <img className='notification__img' src='img/no-profile-photo.jpg' alt='Нет изображения'/>
                <p>ФИО: <span className='notification__userData'>Просвиркин Максим Васильевич</span></p>
                <p>Email: <span className='notification__userData'>Nort359@gmail.com</span></p>
            </Notification>
        );
    }

    render() {
        return (
            <div>
                {
                    this.state.isAuthorization === false ?
                        this._renderForm()
                    :
                        this._renderNotification()
                }
            </div>
        );
    }

}
