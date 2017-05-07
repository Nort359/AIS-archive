import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import querystring from 'querystring';

import Input from './Form/Input';
import Button from './Button';
import Form from './Form/Form';
import AForm from './classes/AForm';

export default class Registration extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            answerServer: ''
        };

        this.registrationUser = this.registrationUser.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }

    /**
     * Метод отправляет AJAX запрос и регистрирует пользоватея в базе данных
     * @param event — объект события клика по кнопке
     */
    registrationUser(event) {
        event.preventDefault();

        axios.post('http://ais-archive/api/registration-user.php',
            querystring.stringify({
                userFirstName: document.getElementById('userFirstName').value,
                userMiddleName: document.getElementById('userMiddleName').value,
                userLastName: document.getElementById('userLastName').value,
                userEmail: document.getElementById('userEmail').value,
                userPassword: document.getElementById('userPassword').value
            }))
            .then(user => { this.setState({ answerServer: user.data }) })
            .catch(error => console.error(error));
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

    checkEqualsInputs(event, idCheckInput) {
        const checkInput = document.querySelector(`#${idCheckInput}`);

        if (event.target.value === checkInput.value) {
            // Пароли совпадают
            this._acceptInput(event, 'Пароли совпадают');
        } else {
            // Пароли НЕ совпадают
            this._rejectInput(event, 'Пароли не совпадают');
        }
    }

    render() {
        const patternName = /^[a-zA-Zа-яА-Я]{3,}$/i;

        return (
            <main>
                <Form header={ 'Регистрация' }>
                    <Input
                        placeholder={ 'Ваша фамилия' }
                        inputId={ 'userLastName' }
                        icon='glyphicon glyphicon-user'
                        onBlur={ event => {
                            const messageOk = 'Фамилия введёна корректно';
                            const messageError = 'Фамилия введёна неккоректно';
                            const messageDefault = 'Ваша фамилия';

                            this.checkValidTextInput(event, patternName, messageOk, messageError, messageDefault);
                        } }
                        onFocus={ event => { this.focusInput(event, 'Ваша фамилия'); } }
                    />
                    <Input
                        placeholder={ 'Ваше имя' }
                        inputId={ 'userFirstName' }
                        onBlur={ event => {
                            const messageOk = 'Имя введёно корректно';
                            const messageError = 'Имя введёно неккоректно';
                            const messageDefault = 'Ваше имя';

                            this.checkValidTextInput(event, patternName, messageOk, messageError, messageDefault);
                        } }
                        onFocus={ event => { this.focusInput(event, 'Ваше имя'); } }
                    />
                    <Input
                        placeholder={ 'Ваше отчество' }
                        inputId={ 'userMiddleName' }
                        onBlur={ event => {
                            const messageOk = 'Отчество введёно корректно';
                            const messageError = 'Отчество введёно неккоректно';
                            const messageDefault = 'Ваше отчество';

                            this.checkValidTextInput(event, patternName, messageOk, messageError, messageDefault);
                        } }
                        onFocus={ event => { this.focusInput(event, 'Ваше отчество'); } }
                    />
                    <Input
                        type={ 'email' }
                        placeholder={ 'Ваш Email' }
                        inputId={ 'userEmail' }
                        onBlur={ this.checkEmail }
                        onFocus={ event => { this.focusInput(event, 'Ваш Email'); } }
                    />
                    <Input
                        type={ 'password' }
                        placeholder={ 'Придумайте пароль' }
                        inputId={ 'userPassword' }
                        icon='glyphicon glyphicon-lock'
                        onChange={ this.checkPassword }
                        onFocus={ event => { this.focusInput(event, 'Придумайте пароль'); } }
                    />
                    <Input
                        type={ 'password' }
                        placeholder={ 'Повторите пароль' }
                        inputId={ 'userPasswordAgain' }
                        icon='glyphicon glyphicon-lock'
                        onChange={ event => {
                            const idCheckInput = 'userPassword';

                            this.checkEqualsInputs(event, idCheckInput);
                        } }
                        onFocus={ event => { this.focusInput(event, 'Придумайте пароль'); } }
                    />

                    <Button type="button" onClick={ this.registrationUser }>Зарегистрироваться</Button>
                    <Link to='/authorization'>Уже есть аккаунт? Войти</Link>
                </Form>
                {
                    this.state.answerServer === '' ?
                        <h2>{ this.state.answerServer }</h2>
                    :
                        this.state.answerServer
                }
            </main>
        );
    }

}
