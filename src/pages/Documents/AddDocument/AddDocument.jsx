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

import './AddDocument.scss';

class AddDocument extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            userData: {},
            userAddDocument: false
        };

        this.inputsData = inputsData;

        this.addDocument = this.addDocument.bind(this);
        this.checkFile = this.checkFile.bind(this);
    }

    checkFile() {
        const file = this.inputsData.documentFile;

        let $input = $(`#${file.id}`);
        let fileData = $input.prop('files')[0];

        if (typeof fileData === 'object') {
            let expansionFile = /\.[^\.]*$/.exec(fileData.name);

            const expansions = [
                '.jpg', '.jpeg', '.docx', '.psd'
            ];

            let expansionExist = false;

            for(let i = 0; i < expansions.length; i++) {
                if ( expansions[i] == expansionFile ) {
                    expansionExist = true;
                    break;
                }
            }

            if ( expansionExist === false ) {
                this._rejectInput(file.id, file.messageError);
                return 'Уточните возможные расширения файлов в разделе "Помощь"';
            } else {
                this._acceptInput(file.id, file.messageOk);
                return true;
            }
        } else {
            return 'Пожалуйста, добавьте файл в соответствующее поле';
        }
    }

    addDocument(event, user) {
        event.preventDefault();

        const eventBlur             = new Event('blur'),

              title                 = this.inputsData.documentTitle,
              description           = this.inputsData.documentDescription,
              file                  = this.inputsData.documentFile,
              dateEnd               = this.inputsData.documentDateEnd,
              dateSignature         = this.inputsData.documentDateSignature,
              type                  = this.inputsData.documentType,

              // Inputs
              inputTitle            = document.querySelector(`#${title.id}`),
              inputDescription      = document.querySelector(`#${description.id}`),
              inputType             = document.querySelector(`#${type.id}`),
              inputDateEnd          = document.querySelector(`#${dateEnd.id}`),
              inputDateSignature    = document.querySelector(`#${dateSignature.id}`);

        let $input = $(`#${file.id}`);
        let fd = new FormData;
        let fileData = $input.prop('files')[0];

        let messageFromCheckFile = this.checkFile();

        if ( messageFromCheckFile !== true ) {
            let messageBox = $('.message-box');
            let messageBoxText = $('.message-box__text span');

            messageBox.css('display', 'inline-block');
            messageBoxText.text(messageFromCheckFile);

            setTimeout(() => {
                let messageBox = $('.message-box');
                messageBox.css('display', 'none');
            }, 5000);

            return false;
        }

        if (!title.patternOk.test(inputTitle.value))
            return inputTitle.dispatchEvent(eventBlur);

        if (inputDateEnd.value === '')
            return inputDateEnd.dispatchEvent(eventBlur);

        if (inputDateSignature.value === '')
            return inputDateSignature.dispatchEvent(eventBlur);

        const buttonSpinner  = document.getElementsByClassName('registration__button_spinner')[0];
        buttonSpinner.classList.add('mk-spinner-ring');

        const buttonSpinnerStyle = buttonSpinner.style;
        buttonSpinnerStyle.display = 'block';

        fd.append('user', user.id);
        fd.append('description', inputDescription.value);
        fd.append('file', fileData);
        fd.append('title', inputTitle.value);
        fd.append('dateEnd', inputDateEnd.value);
        fd.append('dateSignature', inputDateSignature.value);
        fd.append('type', inputType.value);

        const dateEndDoc = inputDateEnd.value;

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
        const lastDate = new Date(dateEndDoc).valueOf();

        if (lastDate < today) {
            // отображаем notification
            let messageBox = $('.message-box');
            let messageBoxText = $('.message-box__text span');

            messageBox.css('display', 'inline-block');

            messageBoxText.text('Дата пересмотра меньше сегодняшней');

            setTimeout(() => {
                let messageBox = $('.message-box');
                messageBox.css('display', 'none');
            }, 5000);

            // Останавливаем спинер
            const buttonSpinner  = document.getElementsByClassName('registration__button_spinner')[0];
            buttonSpinner.classList.add('mk-spinner-ring');

            const buttonSpinnerStyle = buttonSpinner.style;
            buttonSpinnerStyle.display = 'none';

            return false;
        }

        axios.post('/api/document/document-title-check.php', querystring.stringify(
            {
                title: inputTitle.value,
                userId: user.id
            }))
            .then(response => response.data)
            .then(answer => {
                if ( answer !== 'Ok' ) {
                    // отображаем notification
                    let messageBox = $('.message-box');
                    let messageBoxText = $('.message-box__text span');

                    messageBox.css('display', 'inline-block');

                    messageBoxText.text('Документ с таким названием уже был добавлен ранее');

                    setTimeout(() => {
                        let messageBox = $('.message-box');
                        messageBox.css('display', 'none');
                    }, 5000);

                    // Останавливаем спинер
                    const buttonSpinner  = document.getElementsByClassName('registration__button_spinner')[0];
                    buttonSpinner.classList.add('mk-spinner-ring');

                    const buttonSpinnerStyle = buttonSpinner.style;
                    buttonSpinnerStyle.display = 'none';

                    return false;
                }

                $.ajax({
                    url: '/api/document/document-add.php',
                    data: fd,
                    processData: false,
                    contentType: false,
                    type: 'POST'
                })
                    .done(data => {
                        // Останавливаем спинер
                        const buttonSpinner  = document.getElementsByClassName('registration__button_spinner')[0];
                        buttonSpinner.classList.add('mk-spinner-ring');

                        const buttonSpinnerStyle = buttonSpinner.style;
                        buttonSpinnerStyle.display = 'none';

                        // отображаем notification
                        let messageBox = $('.message-box');
                        let messageBoxText = $('.message-box__text span');

                        messageBox.css('display', 'inline-block');

                        if ( data === 'Ok' ) {
                            messageBoxText.text('Документ успешно добавлен');
                        } else {
                            messageBoxText.text(data);
                        }

                        console.log('data = ', data);

                        setTimeout(() => {
                            let messageBox = $('.message-box');
                            messageBox.css('display', 'none');
                        }, 5000);
                    })
                    .fail(error => {
                        console.error(error);
                    });
            })
            .catch(error => console.error(error));
    }

    /**
     * Вспомогательная функция, возвращает jsx объект
     * @returns {XML} — Форма регистрации
     * @private
     */
    _renderForm() {
        const user = this.props.userData;

        const title         = this.inputsData.documentTitle,
              description   = this.inputsData.documentDescription,
              file          = this.inputsData.documentFile,
              dateEnd       = this.inputsData.documentDateEnd,
              dateSignature = this.inputsData.documentDateSignature,
              type          = this.inputsData.documentType;

        let typeDocuments = ObjectHandler.getArrayFromObject(this.props.typeDocument);

        return (
            <CenterScreenBlock>
                <div className='form_container'>
                    <Form header={ 'Добавление документа' }>
                        <Input
                            placeholder={ title.messageDefault }
                            inputId={ title.id }
                            icon={ title.icon }
                            onBlur={ event => this.checkValidTextInput(event, title.patternOk, title.messageOk, title.messageError, title.messageDefault)}
                            onFocus={ event => this.focusInput(event, title.messageDefault) }
                        />
                        <textarea
                            name={ description.id }
                            id={ description.id }
                            className='document__description'
                            placeholder={ description.placeholder }
                        ></textarea>
                        <Input
                            placeholder={ file.messageDefault }
                            inputId={ file.id }
                            type={ file.type }
                            icon={ file.icon }
                            onBlur={ this.checkFile }
                            onFocus={ event => this.focusInput(event, file.messageDefault) }
                        />
                        <p className="form-after-input-text">Введите дату пересмотра:</p>
                        <Input
                            placeholder={ dateEnd.messageDefault }
                            inputId={ dateEnd.id }
                            type={ dateEnd.type }
                            icon={ dateEnd.icon }
                            onBlur={ event => {
                                if (event.target.value === '') {
                                    // отображаем notification
                                    let messageBox = $('.message-box');
                                    let messageBoxText = $('.message-box__text span');

                                    messageBox.css('display', 'inline-block');

                                    messageBoxText.text('Дата пересмотра не установлена');

                                    setTimeout(() => {
                                        let messageBox = $('.message-box');
                                        messageBox.css('display', 'none');
                                    }, 5000);
                                }
                            } }
                        />
                        <p className="form-after-input-text">Введите дату подписания:</p>
                        <Input
                            placeholder={ dateSignature.messageDefault }
                            inputId={ dateSignature.id }
                            type={ dateSignature.type }
                            icon={ dateSignature.icon }
                            onBlur={ event => {
                                if (event.target.value === '') {
                                    // отображаем notification
                                    let messageBox = $('.message-box');
                                    let messageBoxText = $('.message-box__text span');

                                    messageBox.css('display', 'inline-block');

                                    messageBoxText.text('Дата подписания не установлена');

                                    setTimeout(() => {
                                        let messageBox = $('.message-box');
                                        messageBox.css('display', 'none');
                                    }, 5000);
                                }
                            } }
                        />
                        <SelectInput
                            selectId={ type.id }
                            placeholder={ type.placeholder }
                            isNotDisabled={ true }
                        >
                            { typeDocuments.map(typeDocument => {
                                return <option key={ typeDocument.id } value={ typeDocument.id }>{ typeDocument.title }</option>
                            }) }
                        </SelectInput>


                        <div className='registration__button_container'>
                            <div className='registration__button_spinner'></div>
                            <Button type='button' onClick={ event => this.addDocument(event, user) }>Добавть</Button>
                        </div>
                        <Link to='/documents'>К списку документов</Link>
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
                            window.location = '/public/#/'; // TODO Убрать хэш, когда в роутах его не будет
                        }, 1000);
                    } }
                >
                    Документ успешно добавлен
                </Notification>
            </CenterScreenBlock>
        );
    }

    render() {
        return (
            <main>
                {
                    this.state.userAddDocument ?
                        this._renderNotification()
                        :
                        this._renderForm()
                }
            </main>
        );
    }

}

AddDocument.path = '/documents/AddDocument';

export default connect(
    state => ({
        userData: state.userData,
        typeDocument: state.typeDocument
    }),
    dispatch => ({
        addUserDataBase: (userData) => {
            dispatch(addDocumentDB(userData));
        }
    })
)(AddDocument);
