import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';

// Import components
import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import SelectInput from '../../components/SelectInput/SelectInput';
import Button from '../../components/Button/Button';
import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner'; // используются стили данного компонента
import MessageBox from '../../components/MessageBox/MessageBox';

import './Registration.scss';

// Import data
import { inputsData } from './inputsData';

import AForm from '../../classes/AForm';
import ObjectHandler from '../../classes/ObjectHandler';
import Animation from '../../classes/Animation';

import { registrationUserDB } from './actions';

class Registration extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            userData: {},
            userRegistration: false
        };

        this.inputsData = inputsData;

        this.registrationUser = this.registrationUser.bind(this);
        this.onKeyPressEnter = this.onKeyPressEnter.bind(this);
    }

    onKeyPressEnter(event) {
        if (event.which === 13 || event.keyCode === 13) {
            this.registrationUser();
        }
    }

    /**
     * Метод отправляет AJAX запрос и регистрирует пользоватея в базе данных
     */
    registrationUser() {
        const eventBlur             = new Event('blur'),
              eventFocus            = new Event('focus');

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

        if (!lastName.patternOk.test(inputLastName.value)) {
            Animation.showMessageBox('Введите фамилию');
            return inputLastName.dispatchEvent(eventBlur);
        }

        if (!firstName.patternOk.test(inputFirstName.value)) {
            Animation.showMessageBox('Введите имя');
            return inputFirstName.dispatchEvent(eventBlur);
        }

        if (!email.patternOk.test(inputEmail.value)) {
            Animation.showMessageBox('Введите email');
            return inputEmail.dispatchEvent(eventBlur);
        }

        if (!password.patternWarn.test(inputPassword.value)) {
            Animation.showMessageBox('Введите пароль');
            return inputPassword.dispatchEvent(eventBlur);
        }

        if (inputPassword.value !== inputPasswordAgain.value) {
            Animation.showMessageBox('Повторите пароль');
            return inputPasswordAgain.dispatchEvent(eventBlur);
        }

        if (selectDepartment.value === '0') {
            Animation.showMessageBox('Вы не выбрали отдел');
            return selectDepartment.dispatchEvent(eventFocus);
        }

        if (selectPosition.value === '0') {
            Animation.showMessageBox('Вы не выбрали должность');
            return selectPosition.dispatchEvent(eventFocus);
        }

        Promise.all([this.checkAJAXEmail(email.id, email.messageOk)])
            .then(checkerEmail => {
                if(checkerEmail[0] === false) {
                    return false;
                }

                const newUser = {
                    userFirstName: inputFirstName.value,
                    userMiddleName: inputMiddleName.value,
                    userLastName: inputLastName.value,
                    userEmail: inputEmail.value,
                    userPassword: inputPassword.value,
                    userDepartment: selectDepartment.value,
                    userPosition: selectPosition.value
                };

                const buttonSpinner  = document.getElementsByClassName('registration__button_spinner')[0];
                buttonSpinner.classList.add('mk-spinner-ring');

                const buttonSpinnerStyle = buttonSpinner.style;
                buttonSpinnerStyle.display = 'block';

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

        let departments = ObjectHandler.getArrayFromObject(this.props.department),
            positions = ObjectHandler.getArrayFromObject(this.props.position);

        return (
            <CenterScreenBlock>
                <div className='form_container'>
                    <Form header={ 'Регистрация' }>
                        <Input
                            placeholder={ lastName.messageDefault }
                            inputId={ lastName.id }
                            icon={ lastName.icon }
                            onBlur={ event => this.checkValidTextInput(event, lastName.patternOk, lastName.messageOk, lastName.messageError, lastName.messageDefault)}
                            onFocus={ event => this.focusInput(event, lastName.messageDefault) }
                            onKeyPress={ this.onKeyPressEnter }
                        />
                        <Input
                            placeholder={ firstName.messageDefault }
                            inputId={ firstName.id }
                            onBlur={ event => this.checkValidTextInput(event, firstName.patternOk, firstName.messageOk, firstName.messageError, firstName.messageDefault) }
                            onFocus={ event => this.focusInput(event, firstName.messageDefault) }
                            onKeyPress={ this.onKeyPressEnter }
                        />
                        <Input
                            placeholder={ middleName.messageDefault }
                            inputId={ middleName.id }
                            onBlur={ event => this.checkValidTextInput(event, middleName.patternOk, middleName.messageOk, middleName.messageError, middleName.messageDefault) }
                            onFocus={ event =>this.focusInput(event, middleName.messageDefault) }
                            onKeyPress={ this.onKeyPressEnter }
                        />
                        <Input
                            type={ 'email' }
                            placeholder={ email.messageDefault }
                            inputId={ email.id }
                            onBlur={ event => this.checkValidEmailInput(event, email.patternOk) }
                            onFocus={ event => this.checkValidEmailInput(event, email.patternOk, email.messageOk, email.messageError, email.messageDefault) }
                            onKeyPress={ this.onKeyPressEnter }
                        />
                        <Input
                            type={ password.type }
                            placeholder={ password.messageDefault }
                            inputId={ password.id }
                            icon={ password.icon }
                            onBlur={ event => this.checkValidPasswordInput(event, password.patternOk, password.patternWarn) }
                            onChange={ event => this.checkValidPasswordInput(event, password.patternOk, password.patternWarn) }
                            onFocus={ event => this.focusInput(event, password.messageDefault) }
                            onKeyPress={ this.onKeyPressEnter }
                        />
                        <Input
                            type={ passwordAgain.type }
                            placeholder={ passwordAgain.messageDefault }
                            inputId={ passwordAgain.id }
                            icon={ passwordAgain.icon }
                            onBlur={ () => this.checkEqualsInputs(passwordAgain.id, password.id) }
                            onChange={ () => this.checkEqualsInputs(passwordAgain.id, password.id) }
                            onFocus={ event => this.focusInput(event, passwordAgain.messageDefault) }
                            onKeyPress={ this.onKeyPressEnter }
                        />
                        <SelectInput
                            selectId={ department.id }
                            placeholder={ department.placeholder }
                            onKeyPress={ this.onKeyPressEnter }
                        >
                            { departments.map(department => {
                                return <option key={ department.id } value={ department.id }>{ department.title }</option>
                            }) }
                        </SelectInput>
                        <SelectInput
                            selectId={ position.id }
                            placeholder={ position.placeholder }
                            onKeyPress={ this.onKeyPressEnter }
                        >
                            { positions.map(position => {
                                return <option key={ position.id } value={ position.id }>{ position.title }</option>
                            }) }
                        </SelectInput>

                        <div className='registration__button_container'>
                            <div className='registration__button_spinner'></div>
                            <Button type='button' onClick={ this.registrationUser }>Зарегистрироваться</Button>
                        </div>
                        <Link to='/authorization'>Уже есть аккаунт? Войти</Link>
                    </Form>
                    <MessageBox></MessageBox>
                </div>
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
                            window.location = '/public/#/documents/'; // TODO Убрать хэш, когда в роутах его не будет
                        }, 1000);
                    } }
                >
                    <img className='notification__img' src={ user.photo } alt='Нет изображения'/>
                    <p>ФИО: <span className='notification__userData'>{
                        user.surname + ' ' + user.name + ' ' + user.middlename
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
        userData: state.userData,
        department: state.department,
        position: state.position
    }),
    dispatch => ({
        addUserDataBase: (userData) => {
            dispatch(registrationUserDB(userData));
        }
    })
)(Registration);
