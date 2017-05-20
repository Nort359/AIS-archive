import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Import components
import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import Notification from '../../components/Notification/Notification';

import AForm from '../../classes/AForm';

import { authorizationUser } from './actions';

// Import Data
import { inputsData } from './inputsData';

class Authorization extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            isAuthorization: false
        };

        this.inputsData = inputsData;

        this.authorizationUser = this.authorizationUser.bind(this);
    }

    authorizationUser() {

        const eventBlur = new Event('blur');

        const email = this.inputsData.email,
              password = this.inputsData.password;

        const inputEmail = document.querySelector(`#${email.id}`),
              inputPassword = document.querySelector(`#${password.id}`);

        if (!email.patternOk.test(inputEmail.value))
            return inputEmail.dispatchEvent(eventBlur);

        if (!password.patternOk.test(inputPassword.value))
            return inputPassword.dispatchEvent(eventBlur);

        const user = {
            userEmail: inputEmail.value,
            userPassword: inputPassword.value
        };

        this.props.getUserDataBase(user); // Получение пользователя
    }

    /**
     * Вспомогательная функция, возвращает jsx объект
     * @returns {XML} — Уведомление о успешной авторизации
     * @private
     */
    _renderFormAuthorization() {
        const email = this.inputsData.email,
              password = this.inputsData.password;

        return (
            <CenterScreenBlock>
                <Form header={ 'Авторизация' }>
                    <Input
                        type={ email.type }
                        placeholder={ email.messageDefault }
                        icon={ email.icon }
                        inputId={ email.id }
                        onBlur={ event => this.checkValidTextInput(event, email.patternOk, email.messageOk, email.messageError, email.messageDefault) }
                        onFocus={ event => this.focusInput(event, email.messageDefault) }
                    />
                    <Input
                        type={ password.type }
                        placeholder={ password.messageDefault }
                        icon={ password.icon }
                        inputId={ password.id }
                        onChange={ event => this.checkValidPasswordInput(event, password.patternOk, null, '') }
                    />

                    <Button type="button" onClick={ this.authorizationUser }>Войти</Button>

                    <Link to='/registration'>Ещё нет аккаунта? Создать<i className="glyphicon glyphicon-pencil"></i></Link>
                    <Link to='/' className={ 'forgot-password' }>Забыли пароль?</Link>

                </Form>
            </CenterScreenBlock>
        );
    }

    _renderNotification() {
        const user = this.props.userData;

        return (
            <CenterScreenBlock>
                <Notification
                    header={ 'Вы успешно вошли в аккаунт' }
                    btnText={ 'Ок' }
                    btnEvent={ () => {
                        setTimeout(() => {
                            window.location = '/public/#/'; // TODO Убрать хэш, когда в роутах его не будет
                        }, 1000);
                    } }
                >
                    <img className='notification__img' src={ user.photo } alt='Фото пользователя'/>
                    <p>ФИО: <span className='notification__userData'>{
                        user.surname + ' ' + user.name + ' ' + user.middlename
                    }</span></p>
                    <p>Email: <span className='notification__userData'>{ user.email }</span></p>
                </Notification>
            </CenterScreenBlock>
        );
    }

    render() {
        // TODO реализовать вывод сообщения при непрвильном наборе данных
        const user = this.props.userData;

        return (
            <div>
            {
                user.authorization ?
                    this._renderNotification()
                    :
                    this._renderFormAuthorization()
            }
            </div>
        );
    }

}

Authorization.path = '/authorization';

export default connect(
    state => ({
        userData: state.userData
    }),
    dispatch => ({
        getUserDataBase: (userData) => {
            dispatch(authorizationUser(userData));
        }
    })
)(Authorization);
