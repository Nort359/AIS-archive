import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import querystring from 'querystring';
import $ from 'jquery';

// Import components
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Input/Input';
import SelectInput from '../../../components/SelectInput/SelectInput';
import Button from '../../../components/Button/Button';
import Notification from '../../../components/Notification/Notification';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Spinner from '../../../components/Spinner/Spinner'; // используются стили данного компонента

// Import data
import { inputsData } from './inputsData';

import AForm from '../../../classes/AForm';
import ObjectHandler from '../../../classes/ObjectHandler';

import { updateUserData } from './actions';

class ChangeDataUserFrom extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            userData: {},
            userChangeDataUserFrom: false
        };

        this.inputsData = inputsData;

        this.registrationUser = this.registrationUser.bind(this);
    }

    /**
     * Метод отправляет AJAX запрос и регистрирует пользоватея в базе данных
     * @param event — объект события клика по кнопке
     */
    registrationUser(event, user) {
        event.preventDefault();

        const eventBlur             = new Event('blur'),
              eventFocus            = new Event('focus');

        const lastName              = this.inputsData.lastName,
              firstName             = this.inputsData.firstName,
              middleName            = this.inputsData.middleName,
              department            = this.inputsData.department,
              position              = this.inputsData.position,
              photo                 = this.inputsData.photo,

              // Inputs
              inputLastName         = document.querySelector(`#${lastName.id}`),
              inputFirstName        = document.querySelector(`#${firstName.id}`),
              inputMiddleName       = document.querySelector(`#${middleName.id}`),

              selectDepartment      = document.getElementById(department.id),
              selectPosition        = document.getElementById(position.id);

        if (!lastName.patternOk.test(inputLastName.value))
            return inputLastName.dispatchEvent(eventBlur);

        if (!firstName.patternOk.test(inputFirstName.value))
            return inputFirstName.dispatchEvent(eventBlur);

        if (!middleName.patternOk.test(inputMiddleName.value))
            return inputMiddleName.dispatchEvent(eventBlur);

        if (selectDepartment.value === department.placeholder)
            return selectDepartment.dispatchEvent(eventFocus);

        if (selectPosition.value === position.placeholder)
            return selectPosition.dispatchEvent(eventFocus);

        let data = new FormData();
        data.append('file', document.getElementById(photo.id).files[0]);

        const buttonSpinner  = document.getElementsByClassName('registration__button_spinner')[0];
        buttonSpinner.classList.add('mk-spinner-ring');

        const buttonSpinnerStyle = buttonSpinner.style;
        buttonSpinnerStyle.display = 'block';

        let $input = $(`#${photo.id}`);
        let fd = new FormData;

        fd.append('photo', $input.prop('files')[0]);
        fd.append('userId', user.id);
        fd.append('userFirstName', inputFirstName.value);
        fd.append('userMiddleName', inputMiddleName.value);
        fd.append('userLastName', inputLastName.value);
        fd.append('userDepartment', selectDepartment.value);
        fd.append('userPosition', selectPosition.value);

        $.ajax({
            url: 'http://ais-archive/api/user/user-data-update.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST'
        });

        this.setState({ userChangeDataUserFrom: true });

        // Все поля заполнены: регистрируем нового пользователя
        // this.props.updateUserDataDB(newUserData);
        /*
        axios.post('http://ais-archive/api/user/user-data-update.php', querystring.stringify(data))
            .then(response => response.data)
            .then(answer => console.log(answer) )
            .then(answer => this.setState({ userChangeDataUserFrom: true }) )
            .catch(error => console.error(error));
        */
    }

    /**
     * Вспомогательная функция, возвращает jsx объект
     * @returns {XML} — Форма регистрации
     * @private
     */
    _renderForm() {
        const user = this.props.userData;

        const lastName      = this.inputsData.lastName,
              firstName     = this.inputsData.firstName,
              middleName    = this.inputsData.middleName,
              department    = this.inputsData.department,
              position      = this.inputsData.position,
              photo         = this.inputsData.photo;

        let departments     = ObjectHandler.getArrayFromObject(this.props.department),
            positions       = ObjectHandler.getArrayFromObject(this.props.position);

        return (
            <CenterScreenBlock>
                <div className='form_container'>
                    <Form header={ 'Изменение данных' }>
                        <Input
                            placeholder={ lastName.messageDefault }
                            inputId={ lastName.id }
                            icon={ lastName.icon }
                            value={ user.surname }
                            onBlur={ event => this.checkValidTextInput(event, lastName.patternOk, lastName.messageOk, lastName.messageError, lastName.messageDefault)}
                            onFocus={ event => this.focusInput(event, lastName.messageDefault) }
                        />
                        <Input
                            placeholder={ firstName.messageDefault }
                            inputId={ firstName.id }
                            value={ user.name }
                            onBlur={ event => this.checkValidTextInput(event, firstName.patternOk, firstName.messageOk, firstName.messageError, firstName.messageDefault) }
                            onFocus={ event => this.focusInput(event, firstName.messageDefault) }
                        />
                        <Input
                            placeholder={ middleName.messageDefault }
                            inputId={ middleName.id }
                            value={ user.middlename }
                            onBlur={ event => this.checkValidTextInput(event, middleName.patternOk, middleName.messageOk, middleName.messageError, middleName.messageDefault) }
                            onFocus={ event => this.focusInput(event, middleName.messageDefault) }
                        />
                        <Input
                            type={ 'file' }
                            inputId={ photo.id }
                        />
                        <SelectInput
                            selectId={ department.id }
                            placeholder={ department.placeholder }
                        >
                            { departments.map(department => {
                                return <option
                                    key={ department.id }
                                    value={ department.id }
                                    selected={ department.id === user.department_id ? 'selected' : null }
                                >{ department.title }</option>
                            }) }
                        </SelectInput>
                        <SelectInput
                            selectId={ position.id }
                            placeholder={ position.placeholder }
                        >
                            { positions.map(position => {
                                return <option
                                    key={ position.id }
                                    value={ position.id }
                                    selected={ position.id === user.position_id ? 'selected' : null }
                                >{ position.title }</option>
                            }) }
                        </SelectInput>

                        <div className='registration__button_container'>
                            <div className='registration__button_spinner'></div>
                            <Button type='button' onClick={ event => this.registrationUser(event, user) }>Изменить</Button>
                        </div>
                        <Link to='/my-office'>В личный кабинет</Link>
                    </Form>
                    <MessageBox>Для изображение доступны только расширения типа .jpg, .png</MessageBox>
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
        return (
            <CenterScreenBlock>
                <Notification
                    header={ 'Вы успешно зарегистрировались' }
                    btnText={ 'Ок' }
                    btnEvent={ () => {
                        setTimeout(() => {
                            window.location = '/public/#/my-office'; // TODO Убрать хэш, когда в роутах его не будет
                        }, 1000);
                    } }
                >
                    <p>Данные успешно измененны</p>
                </Notification>
            </CenterScreenBlock>
        );
    }

    render() {
        return (
            <main>
                {
                    this.state.userChangeDataUserFrom ?
                        this._renderNotification()
                        :
                        this._renderForm()
                }
            </main>
        );
    }

}

ChangeDataUserFrom.path = '/my-office/ChangeUserData';

export default connect(
    state => ({
        userData: state.userData,
        department: state.department,
        position: state.position
    }),
    dispatch => ({
        updateUserDataDB: newUserData => {
            dispatch(updateUserData(newUserData));
        }
    })
)(ChangeDataUserFrom);
