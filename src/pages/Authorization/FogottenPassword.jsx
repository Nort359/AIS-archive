import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import querystring from 'querystring';
import $ from 'jquery';

// Import components
import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import MessageBox from '../../components/MessageBox/MessageBox';

import Notification from '../../components/Notification/Notification';

import ChangePasswordForm from '../MyOffice/ChangePasswordForm/ChangePasswordForm';

import './Authorization.scss';

import AForm from '../../classes/AForm';
import Animation from '../../classes/Animation';

import { authorizationUser, getGenerateKey } from './actions';

// Import Data
import { inputsData } from './inputsData';

class FogottenPassword extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            isFogottenPassword: false,
            isSendEmail: false,
            isKey: false,
            userEmail: ''
        };

        this.inputsData = inputsData;

        this.onKeyPressEnter = this.onKeyPressEnter.bind(this);
        this.generateKey = this.generateKey.bind(this);
    }

    generateKey() {

    }

    onKeyPressEnter(event) {
    }

    /**
     * Вспомогательная функция, возвращает jsx объект
     * @returns {XML} — Уведомление о успешной авторизации
     * @private
     */
    _renderFormFogottenPassword() {
        const email = this.inputsData.email,
              password = this.inputsData.password;

        return (
            <CenterScreenBlock>
                <div className='form_container'>
                    <Form header={ 'Востановление пароля' }>
                        <div>
                            <Input
                                type={ email.type }
                                placeholder={ email.messageDefault }
                                icon={ email.icon }
                                inputId={ email.id }
                                onBlur={ event => this.checkValidTextInput(event, email.patternOk, email.messageOk, email.messageError, email.messageDefault) }
                                onFocus={ event => this.focusInput(event, email.messageDefault) }
                                onKeyPress={ this.onKeyPressEnter }
                            />

                            <div className='registration__button_container'>
                                <div className='registration__button_spinner'></div>
                                <Button
                                    type="button"
                                    onClick={ event => {
                                        event.preventDefault();

                                        let email = this.inputsData.email;

                                        this.checkAJAXEmail(email.id, email.messageOk)
                                            .then(result => {
                                                console.log(result[0]);
                                                if ( result[0] === true ) {
                                                    return false;
                                                }

                                                let email = this.inputsData.email;

                                                const inputEmail = document.querySelector(`#${email.id}`);

                                                this.setState({ userEmail: inputEmail.value });

                                                const user = {
                                                    email: inputEmail.value
                                                };

                                                this.props.getGenerateKey( user );

                                                this.setState({ isSendEmail: true });
                                            })
                                            .catch(error => console.error(error));
                                    } }
                                >
                                    Получить код
                                </Button>
                            </div>
                        </div>
                        <Link to='/authorization'>Назад</Link>
                    </Form>
                    <MessageBox></MessageBox>
                </div>
            </CenterScreenBlock>
        );
    }

    render() {
        // TODO реализовать вывод сообщения при непрвильном наборе данных
        const user = this.props.userData;

        const email = this.inputsData.email,
              password = this.inputsData.password;

        return (
            <div>
                {
                    this.state.isSendEmail === false ?
                        <div>
                            { this._renderFormFogottenPassword() }
                        </div>
                        :
                        <div>
                            {
                                this.state.isKey ?
                                    <div>
                                        <CenterScreenBlock>
                                            <div className='form_container'>
                                                <Form header={ 'Востановление пароля' }>
                                                    <div>
                                                        <div>
                                                            <Input
                                                                type={ password.type }
                                                                placeholder={ password.messageDefault }
                                                                icon={ password.icon }
                                                                inputId={ password.id }
                                                                onBlur={ event => this.checkValidTextInput(event, password.patternOk, password.messageOk, password.messageError, password.messageDefault) }
                                                                onFocus={ event => this.focusInput(event, password.messageDefault) }
                                                                onKeyPress={ this.onKeyPressEnter }
                                                            />

                                                            <div className='registration__button_container'>
                                                                <div className='registration__button_spinner'></div>
                                                                <Button
                                                                    type="button"
                                                                    onClick={ event => {
                                                                        event.preventDefault();
                                                                        const eventBlur = new Event('blur');

                                                                        const user = this.props.userData;

                                                                        const password = this.inputsData.password;

                                                                        const inputPassword = document.querySelector(`#${password.id}`);

                                                                        if (!password.patternOk.test(inputPassword.value)) {
                                                                            Animation.showMessageBox('Введите корректный пароль');
                                                                            return inputPassword.dispatchEvent(eventBlur);
                                                                        }

                                                                        const userData = {
                                                                            email: this.state.userEmail,
                                                                            newPassword: inputPassword.value
                                                                        };

                                                                        axios.post( 'http://ais-archive/api/user/user-password-create-new.php', querystring.stringify(userData) )
                                                                            .then(response => response.data)
                                                                            .then(answer => {
                                                                                if ( answer === 'Ok' ) {
                                                                                    window.location = '#/authorization';
                                                                                } else {
                                                                                    Animation.showMessageBox( answer );
                                                                                }
                                                                            })
                                                                            .catch(error => console.error(error));
                                                                    } }
                                                                >
                                                                    Восстановить
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Link to='/authorization'>Назад</Link>
                                                </Form>
                                                <MessageBox></MessageBox>
                                            </div>
                                        </CenterScreenBlock>
                                    </div>
                                    :
                                    <CenterScreenBlock>
                                        <div className='form_container'>
                                            <Form header={ 'Востановление пароля' }>
                                                <div>
                                                    <div>
                                                        <Input
                                                            type={ 'text' }
                                                            placeholder={ 'Введите код' }
                                                            inputId={ 'inputKod' }
                                                            onKeyPress={ this.onKeyPressEnter }
                                                        />

                                                        <div className='registration__button_container'>
                                                            <div className='registration__button_spinner'></div>
                                                            <Button
                                                                type="button"
                                                                onClick={ event => {
                                                                    event.preventDefault();

                                                                    if ( user.key == document.querySelector('#inputKod').value ) {
                                                                        this.setState({ isKey: true });
                                                                    } else {
                                                                        Animation.showMessageBox('Код доступа неверный');
                                                                    }
                                                                } }
                                                            >
                                                                Восстановить
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link to='/authorization'>Назад</Link>
                                            </Form>
                                            <MessageBox></MessageBox>
                                        </div>
                                    </CenterScreenBlock>
                            }
                        </div>
                }
            </div>
        );
    }

}

FogottenPassword.path = '/fogottenPassword';

export default connect(
    state => ({
        userData: state.userData
    }),
    dispatch => ({
        getUserDataBase: userData => {
            dispatch(authorizationUser(userData));
        },

        getGenerateKey: userData => {
            dispatch(getGenerateKey(userData));
        }
    })
)(FogottenPassword);
