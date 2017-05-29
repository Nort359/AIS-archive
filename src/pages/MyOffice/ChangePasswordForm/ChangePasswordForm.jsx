import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Import components
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

import Notification from '../../../components/Notification/Notification';

import AForm from '../../../classes/AForm';

import { updatePassword } from './actions';

// Import Data
import { inputsData } from './inputsData';

class ChangePasswordForm extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            isChangePasswordForm: false
        };

        this.inputsData = inputsData;

        this.updatePassword = this.updatePassword.bind(this);
    }

    updatePassword(user) {
        const eventBlur             = new Event('blur');

        const oldPassword           = this.inputsData.oldPassword,
              password              = this.inputsData.password,
              passwordAgain         = this.inputsData.passwordAgain,

              // Inputs
              inputPassword         = document.querySelector(`#${password.id}`),
              inputPasswordAgain    = document.querySelector(`#${passwordAgain.id}`);

        if (!password.patternWarn.test(inputPassword.value))
            return inputPassword.dispatchEvent(eventBlur);

        if (inputPassword.value !== inputPasswordAgain.value)
            return inputPasswordAgain.dispatchEvent(eventBlur);

        Promise.all([ this.checkAJAXPassword(oldPassword.id, user.password, oldPassword.messageOk) ])
            .then(checkerEmail => {
                if(checkerEmail[0] === false) return;

                const newPassword = {
                    userId: user.id,
                    userPassword: inputPassword.value
                };

                // Все поля заполнены: регистрируем нового пользователя
                this.props.updatePasswordDB(newPassword);

                this.setState({ isChangePasswordForm: true });
            })
            .catch(error => console.error(error));
    }

    /**
     * Вспомогательная функция, возвращает jsx объект
     * @returns {XML} — Уведомление о успешной авторизации
     * @private
     */
    _renderFormChangePasswordForm() {
        const oldPassword = this.inputsData.oldPassword,
              password = this.inputsData.password,
              passwordAgain = this.inputsData.passwordAgain;

        const user = this.props.userData;

        return (
            <CenterScreenBlock>
                <Form header={ 'Изменение пароля' }>
                    <Input
                        type={ oldPassword.type }
                        placeholder={ oldPassword.messageDefault }
                        inputId={ oldPassword.id }
                        icon={ oldPassword.icon }
                        onBlur={ event => this.checkAJAXPassword(event.target.id, user.password, oldPassword.messageOk) }
                        onFocus={ event => this.focusInput(event, oldPassword.messageDefault) }
                    />
                    <Input
                        type={ password.type }
                        placeholder={ password.messageDefault }
                        inputId={ password.id }
                        icon={ password.icon }
                        onBlur={ event => this.checkValidPasswordInput(event, password.patternOk, password.patternWarn) }
                        onChange={ event => this.checkValidPasswordInput(event, password.patternOk, password.patternWarn) }
                        onFocus={ event => this.focusInput(event, password.messageDefault) }
                    />
                    <Input
                        type={ passwordAgain.type }
                        placeholder={ passwordAgain.messageDefault }
                        inputId={ passwordAgain.id }
                        icon={ passwordAgain.icon }
                        onBlur={ () => this.checkEqualsInputs(passwordAgain.id, password.id) }
                        onChange={ () => this.checkEqualsInputs(passwordAgain.id, password.id) }
                        onFocus={ event => this.focusInput(event, passwordAgain.messageDefault) }
                    />

                    <Button type="button" onClick={ () => this.updatePassword(user) }>Войти</Button>

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
                    header={ 'Данные изменены' }
                    btnText={ 'Ок' }
                    btnEvent={ () => {
                        setTimeout(() => {
                            window.location = '/public/#/'; // TODO Убрать хэш, когда в роутах его не будет
                        }, 1000);
                    } }
                >
                    <p>Ваш пароль успешно изменён</p>
                </Notification>
            </CenterScreenBlock>
        );
    }

    render() {
        // TODO реализовать вывод сообщения при непрвильном наборе данных

        return (
            <div>
                {
                    this.state.isChangePasswordForm ?
                        this._renderNotification()
                        :
                        this._renderFormChangePasswordForm()
                }
            </div>
        );
    }

}

ChangePasswordForm.path = '/my-office/ChangePassword';

export default connect(
    state => ({
        userData: state.userData
    }),
    dispatch => ({
        updatePasswordDB: newPassword => {
            dispatch(updatePassword(newPassword));
        }
    })
)(ChangePasswordForm);
