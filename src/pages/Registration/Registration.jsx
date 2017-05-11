import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import querystring from 'querystring';

// Import components
import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner'; // используются стили данного компонента

// Import data
import { inputsData } from './inputsData';

import AForm from '../../classes/AForm';

import { addUser } from './actions';

class Registration extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            userData: {},
            userRegistration: false
        };

        this.inputsData = inputsData;

        this.registrationUser = this.registrationUser.bind(this);
    }

    _checkInput(element, pattern) {
        if (!pattern.test(element.value)) {
            element.focus();
            element.select();

            return false;
        }

        return true;
    }

    /**
     * Метод отправляет AJAX запрос и регистрирует пользоватея в базе данных
     * @param event — объект события клика по кнопке
     */
    registrationUser(event) {
        event.preventDefault();

        

        /*
        const userLastName = document.getElementById('userLastName');
        const userFirstName = document.getElementById('userFirstName');
        const userMiddleName = document.getElementById('userMiddleName');
        const userEmail = document.getElementById('userEmail');
        const userPassword = document.getElementById('userPassword');
        const userPasswordAgain = document.getElementById('userPasswordAgain');

        const patternName = /^[a-zA-Zа-яА-Я]{3,}$/i;
        const patternEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        const patternStrongPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        const patternWeakPassword = /^.{6,}$/;

        if (!this._checkInput(userLastName, patternName)) return;
        if (!this._checkInput(userFirstName, patternName)) return;
        if (!this._checkInput(userMiddleName, patternName)) return;
        if (!this._checkInput(userEmail, patternEmail)) return;
        if (!this._checkInput(userPassword, patternWeakPassword)) return;

        if (userPasswordAgain.value !== userPassword.value) {
            userPasswordAgain.focus();
            userPasswordAgain.select();

            return;
        }

        const emailId = 'userEmail';
        let emailExist = false;

        this._getIconSpinner(emailId, 'mk-spinner-ring', true);

        axios.post('http://ais-archive/api/check_email.php', querystring.stringify({
            checkEmail: userEmail.value
        }))
            .then(res => {
                if (res.data === 'Ok') {
                    emailExist = true;
                }
                this._getIconSpinner(emailId, 'mk-spinner-ring', false);

                if(emailExist === true) {
                    this._acceptInput(emailId, 'Email введён корректно');

                    const newUser = {
                        userLastName: userLastName.value,
                        userFirstName: userFirstName.value,
                        userMiddleName: userMiddleName.value,
                        userEmail: userEmail.value,
                        userPassword: userPassword.value
                    };

                    this.props.registrationUser(newUser);

                    this.setState({ userRegistration: true });
                } else {
                    this._rejectInput(emailId, 'Такой Email уже зарегистрирован');
                }
            })
            .catch(error => console.error(error));
        */
        /*
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
        */
    }

    /**
     * Вспомогательная функция, возвращает jsx объект
     * @returns {XML} — Форма регистрации
     * @private
     */
    _renderForm() {
        const lastName = this.inputsData.lastName,
              firstName = this.inputsData.firstName,
              middleName = this.inputsData.middleName,
              email = this.inputsData.email,
              password = this.inputsData.password,
              passwordAgain = this.inputsData.passwordAgain;

        return (
            <CenterScreenBlock>
                <Form header={ 'Регистрация' }>
                    <Input
                        placeholder={ lastName.messageDefault }
                        inputId={ lastName.id }
                        icon='glyphicon glyphicon-user'
                        onBlur={ event => this.checkValidTextInput(event, lastName.patternOk, lastName.messageOk, lastName.messageError, lastName.messageDefault)}
                        onFocus={ event => this.focusInput(event, lastName.messageDefault) }
                    />
                    <Input
                        placeholder={ firstName.messageDefault }
                        inputId={ firstName.id }
                        onBlur={ event => this.checkValidTextInput(event, firstName.patternOk, firstName.messageOk, firstName.messageError, firstName.messageDefault) }
                        onFocus={ event => this.focusInput(event, firstName.messageDefault) }
                    />
                    <Input
                        placeholder={ middleName.messageDefault }
                        inputId={ middleName.id }
                        onBlur={ event => this.checkValidTextInput(event, middleName.patternOk, middleName.messageOk, middleName.messageError, middleName.messageDefault) }
                        onFocus={ event =>this.focusInput(event, middleName.messageDefault) }
                    />
                    <Input
                        type={ 'email' }
                        placeholder={ email.messageDefault }
                        inputId={ email.id }
                        onBlur={ event => this.checkValidEmailInput(event, email.patternOk) }
                        onFocus={ event => this.checkValidEmailInput(event, email.patternOk, email.messageOk, email.messageError, email.messageDefault) }
                    />
                    <Input
                        type={ 'password' }
                        placeholder={ password.messageDefault }
                        inputId={ password.id }
                        icon='glyphicon glyphicon-lock'
                        onBlur={ event => this.checkValidPasswordInput(event, password.patternOk, password.patternWarn) }
                        onChange={ event => this.checkValidPasswordInput(event, password.patternOk, password.patternWarn) }
                        onFocus={ event => this.focusInput(event, password.messageDefault) }
                    />
                    <Input
                        type={ 'password' }
                        placeholder={ passwordAgain.messageDefault }
                        inputId={ passwordAgain.id }
                        icon='glyphicon glyphicon-lock'
                        onBlur={ () => this.checkEqualsInputs(passwordAgain.id, password.id) }
                        onChange={ () => this.checkEqualsInputs(passwordAgain.id, password.id) }
                        onFocus={ event => this.focusInput(event, passwordAgain.messageDefault) }
                    />

                    <Button type="button" onClick={ this.registrationUser }>Зарегистрироваться</Button>
                    <Link to='/authorization'>Уже есть аккаунт? Войти</Link>
                </Form>
            </CenterScreenBlock>
        );
    }

    /**
     * Вспомогательная функция, возвращает jsx объект
     * @returns {XML} — Уведомление о успешной регистрации
     * @private
     */
    _renderNotification() {
        const user = this.props.user;

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

function mapStateToProps(state) {
    return {
        user: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registrationUser: userData => dispatch(addUser(userData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
