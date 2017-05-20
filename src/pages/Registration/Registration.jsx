import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Import components
import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import SelectInput from '../../components/SelectInput/SelectInput';
import Button from '../../components/Button/Button';
import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner'; // используются стили данного компонента

// Import data
import { inputsData } from './inputsData';

import AForm from '../../classes/AForm';

import { registrationUser } from './actions';

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

    /**
     * Метод отправляет AJAX запрос и регистрирует пользоватея в базе данных
     * @param event — объект события клика по кнопке
     */
    registrationUser(event) {
        event.preventDefault();

        const eventBlur = new Event('blur');

        const lastName              = this.inputsData.lastName,
              firstName             = this.inputsData.firstName,
              middleName            = this.inputsData.middleName,
              email                 = this.inputsData.email,
              password              = this.inputsData.password,
              passwordAgain         = this.inputsData.passwordAgain,
              department            = this.inputsData.department,
              position              = this.inputsData.position,

              // Inputs
              inputLastName         = document.querySelector(`#${lastName.id}`),
              inputFirstName        = document.querySelector(`#${firstName.id}`),
              inputMiddleName       = document.querySelector(`#${middleName.id}`),
              inputEmail            = document.querySelector(`#${email.id}`),
              inputPassword         = document.querySelector(`#${password.id}`),
              inputPasswordAgain    = document.querySelector(`#${passwordAgain.id}`),

              selectDepartment      = document.getElementById(department.id),
              selectPosition        = document.getElementById(position.id);

        if (!lastName.patternOk.test(inputLastName.value))
            return inputLastName.dispatchEvent(eventBlur);

        if (!firstName.patternOk.test(inputFirstName.value))
            return inputFirstName.dispatchEvent(eventBlur);

        if (!middleName.patternOk.test(inputMiddleName.value))
            return inputMiddleName.dispatchEvent(eventBlur);

        if (!email.patternOk.test(inputEmail.value))
            return inputEmail.dispatchEvent(eventBlur);

        if (!password.patternWarn.test(inputPassword.value))
            return inputPassword.dispatchEvent(eventBlur);

        if (password.value !== inputPasswordAgain.value)
            return inputPasswordAgain.dispatchEvent(eventBlur);

        if (selectDepartment.value === department.placeholder)
            return selectDepartment.dispatchEvent(eventBlur);

        if (selectPosition.value === position.placeholder)
            return selectPosition.dispatchEvent(eventBlur);

        Promise.all([this.checkAJAXEmail(email.id, email.messageOk)])
            .then(checkerEmail => {
                if(checkerEmail[0] === false) return;

                const newUser = {
                    userFirstName: inputFirstName.value,
                    userMiddleName: inputMiddleName.value,
                    userLastName: inputLastName.value,
                    userEmail: inputEmail.value,
                    userPassword: inputPassword.value,
                    userDepartment: selectDepartment.value,
                    userPosition: selectPosition.value
                };

                // Все поля заполнены: регистрируем нового пользователя
                this.props.addUserDataBase(newUser);
            })
            .catch(error => console.error(error));
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
              passwordAgain = this.inputsData.passwordAgain,
              department = this.inputsData.department,
              position = this.inputsData.position;

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
                    <SelectInput
                        selectId={ department.id }
                        placeholder={ department.placeholder }
                    >
                        <option value={ 'СИТ' }>СИТ</option>
                        <option value={ 'Отдел кадров' }>Отдел кадров</option>
                        <option value={ 'Отдел обслуживания' }>Отдел обслуживания</option>
                    </SelectInput>
                    <SelectInput
                        selectId={ position.id }
                        placeholder={ position.placeholder }
                    >
                        <option value={ 'Программист' }>Программист</option>
                        <option value={ 'Инжинер' }>Инжинер</option>
                        <option value={ 'Системный администратор' }>Системный администратор</option>
                        <option value={ 'Бухгалтер' }>Бухгалтер</option>
                        <option value={ 'Охранник' }>Охранник</option>
                    </SelectInput>

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
        const user = this.props.userData;

        return (
            <CenterScreenBlock>
                <Notification
                    header={ 'Вы успешно зарегистрировались' }
                    btnText={ 'Ок' }
                    btnEvent={ () => {
                        setTimeout(() => {
                            window.location = '/public/#/'; // TODO Убрать хэш, когда в роутах его не будет
                        }, 1000);
                    } }
                >
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
                    this.props.userData.authorization ?
                        this._renderNotification()
                        :
                        this._renderForm()
                }
            </main>
        );
    }

}

Registration.path = '/registration';

export default connect(
    state => ({
        userData: state.userData
    }),
    dispatch => ({
        addUserDataBase: (userData) => {
            dispatch(registrationUser(userData));
        }
    })
)(Registration);
