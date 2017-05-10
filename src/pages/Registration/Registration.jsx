import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import querystring from 'querystring';

// Import components
import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner'; // используются стили данного компонента

import AForm from '../../classes/AForm';

class Registration extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            userData: {},
            userRegistration: false
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
            .then(user => {
                console.log(user.data);
                this.setState({ userData: user.data });
                this.setState({ userRegistration: true });
            })
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

        this.checkValidEmailInput(event, patternEmail, messageOk, messageError, messageDefault);
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
        const elementId = event.target.id;

        if (event.target.value === checkInput.value) {
            // Пароли совпадают
            this._acceptInput(elementId, 'Пароли совпадают');
        } else {
            // Пароли НЕ совпадают
            this._rejectInput(elementId, 'Пароли не совпадают');
        }
    }

    _renderForm() {
        const patternName = /^[a-zA-Zа-яА-Я]{3,}$/i;

        return (
            <CenterScreenBlock>
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
                        onBlur={ this.checkPassword }
                        onChange={ this.checkPassword }
                        onFocus={ event => { this.focusInput(event, 'Придумайте пароль'); } }
                    />
                    <Input
                        type={ 'password' }
                        placeholder={ 'Повторите пароль' }
                        inputId={ 'userPasswordAgain' }
                        icon='glyphicon glyphicon-lock'
                        onBlur={ event => {
                            const idCheckInput = 'userPassword';

                            this.checkEqualsInputs(event, idCheckInput);
                        } }
                        onChange={ event => {
                            const idCheckInput = 'userPassword';

                            this.checkEqualsInputs(event, idCheckInput);
                        } }
                        onFocus={ event => { this.focusInput(event, 'Придумайте пароль'); } }
                    />

                    <Button type="button" onClick={ this.registrationUser }>Зарегистрироваться</Button>
                    <Link to='/authorization'>Уже есть аккаунт? Войти</Link>
                </Form>
            </CenterScreenBlock>
        );
    }

    _renderNotification() {
        const user = this.state.userData;

        return (
            <CenterScreenBlock>
                <Notification header={ 'Вы успешно зарегистрировались' } btnText={ 'Ок' }>
                    <img className='notification__img' src='img/no-profile-photo.jpg' alt='Нет изображения'/>
                    <p>ФИО: <span className='notification__userData'>{
                        user.surname + ' ' + user.name + ' ' + user.otchestvo
                    }</span></p>
                    <p>Email: <span className='notification__userData'>{ user.email }</span></p>
                </Notification>
            </CenterScreenBlock>
        );
    }

    render() {
        return (
            <main>
                {
                    this.state.userRegistration ?
                        this._renderNotification()
                        :
                        this._renderForm()
                }
            </main>
        );
    }

}

Registration.path = '/registration';

export default Registration;
