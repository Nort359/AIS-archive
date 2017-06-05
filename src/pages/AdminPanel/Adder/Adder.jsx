import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
// Import components
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Spinner from '../../../components/Spinner/Spinner';
import '../AdminPanel.scss';

import AForm from '../../../classes/AForm';
import Async from '../../../classes/Async';

class Adder extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            isAdding: false
        };

        this.checkDepartmentOnExist = this.checkDepartmentOnExist.bind(this);
        this.addDepartment = this.addDepartment.bind(this);
    }

    checkDepartmentOnExist(adder, pathCheck) {
        const adderData = adder;
        this.checkValidTextInput(event, adderData.patternOk, adderData.messageOk, adderData.messageError, adderData.messageDefault);

        Promise.all([
            Async.checkInputValueOnExist(adderData.id, pathCheck)
        ])
            .then(answer => {
                if (answer[0] !== 'Ok')
                    this._rejectInput(adderData.id, adderData.messageExist);
                else
                    this._acceptInput(adderData.id, adderData.messageOk);
            })
            .catch(error => console.error(error));
    }

    showMessageBox(message) {
        // отображаем notification
        let messageBox = $('.message-box');
        let messageBoxText = $('.message-box__text span');

        messageBox.css('display', 'inline-block');

        messageBoxText.text(message);

        setTimeout(() => {
            let messageBox = $('.message-box');
            messageBox.css('display', 'none');
        }, 3000);
    }

    addDepartment(event, adder, pathCheck, pathAdd) {
        event.preventDefault();
        // TODO не работают стили для спинера ( должна появляться галочка после успешнйо проверки )
        const eventBlur = new Event('blur');
        const inputDepartment = document.getElementById(adder.id);

        inputDepartment.dispatchEvent(eventBlur);

        if (!adder.patternOk.test(inputDepartment.value)) return false;

        Promise.all([
            Async.checkInputValueOnExist(adder.id, pathCheck)
        ])
            .then(answer => {
                if (answer[0] !== 'Ok') {
                    this.showMessageBox('Такой отдел существует');
                    this._rejectInput(adder.id, 'Такой отдел существует');
                    return false;
                }

                const buttonSpinner  = document.getElementsByClassName('registration__button_spinner')[0];
                buttonSpinner.classList.add('mk-spinner-ring');

                const buttonSpinnerStyle = buttonSpinner.style;
                buttonSpinnerStyle.display = 'block';

                Promise.all([ Async.addInputValueDB(adder.id, pathAdd) ])
                    .then(answer => {
                        if (answer[0] !== 'Ok') {
                            const buttonSpinner  = document.getElementsByClassName('registration__button_spinner')[0];
                            buttonSpinner.classList.add('mk-spinner-ring');

                            const buttonSpinnerStyle = buttonSpinner.style;
                            buttonSpinnerStyle.display = 'none';
                            this.showMessageBox(answer[0]);
                            return false;
                        }

                        this.setState({ isAdding: true });

                        setTimeout(() => {
                            const buttonSpinner  = document.getElementsByClassName('registration__button_spinner')[0];
                            buttonSpinner.classList.add('mk-spinner-ring');

                            const buttonSpinnerStyle = buttonSpinner.style;
                            buttonSpinnerStyle.display = 'none';
                        }, 1000);

                        const inputDepartment = document.getElementById(adder.id);

                        inputDepartment.value = '';
                        inputDepartment.focus();

                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }

    render() {
        const adderData = this.props.adderData;

        return (
            <CenterScreenBlock>
                <Form header={ this.props.headerForm }>
                    <Input
                        inputId={ adderData.id }
                        placeholder={ adderData.messageDefault }
                        icon={ adderData.icon }
                        onBlur={ event => {
                            this.checkDepartmentOnExist(adderData, this.props.pathCheck);
                        } }
                        onFocus={ event => this.focusInput(event, adderData.messageDefault) }
                    />
                    <div className='add-button__container'>
                        <div className='registration__button_container'>
                            <div className='registration__button_spinner'></div>
                            <Button type={ 'button' } onClick={ event => this.addDepartment(event, adderData, this.props.pathCheck, this.props.pathAdd) }>Создать</Button>
                        </div>
                        <Link to='/AdminPanel'>К списку справочников</Link>
                    </div>
                </Form>
            </CenterScreenBlock>
        );
    }

}

Adder.propTypes = {
    pathCheck: PropTypes.string.isRequired,
    pathAdd: PropTypes.string.isRequired,
    adderData: PropTypes.object.isRequired,
    headerForm: PropTypes.string.isRequired
};

export default Adder;
