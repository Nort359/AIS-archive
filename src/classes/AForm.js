import React from 'react';
import axios from 'axios';
import querystring from 'querystring';

export default class AForm extends React.Component {
    constructor(props) {
        super(props);

        this._changeUnderline = this._changeUnderline.bind(this);
        this._showIcon = this._showIcon.bind(this);
        this._getIconSpinner = this._getIconSpinner.bind(this);
        this._hideIcon = this._hideIcon.bind(this);
        this._showPlaceholder = this._showPlaceholder.bind(this);
        this._hidePlaceholder = this._hidePlaceholder.bind(this);
        this._acceptInput = this._acceptInput.bind(this);
        this._rejectInput = this._rejectInput.bind(this);
        this._defaultInput = this._defaultInput.bind(this);
        this.checkValidTextInput = this.checkValidTextInput.bind(this);
        this.focusInput = this.focusInput.bind(this);
        this.checkValidPasswordInput = this.checkValidPasswordInput.bind(this);
    }

    /**
     * Вложенная функция, перекрашивающая underline
     * @param elementId — ID input,на котором происходит событие
     * @param color — Цвет, в который перекрасится underline
     * @param scale — 1 – если нужно показать underline или 0 – если скрыть
     * @protected
     */
    _changeUnderline(elementId, color = '#00b5ff', scale = 0) {
        const underline = document.querySelector(`#${elementId} ~ .input-animated__underline`).style;

        underline.backgroundColor = color;
        underline.transform = 'scale(' + scale + ')';
    }

    /**
     * Показывает icon, изменяя его текст и стили
     * @param elementId — ID input,на котором происходит событие
     * @param classIcon — Класс, который будет в icon
     * @param colorIcon — Цвет icon
     * @protected
     */
    _showIcon(elementId, classIcon, colorIcon) {
        const icon = document.querySelector(`#${elementId} ~ .input-animated__icon-status`);
        const iconStyle = icon.style;

        icon.classList.remove('glyphicon-remove');
        icon.classList.remove('glyphicon-ok');
        icon.classList.remove('glyphicon-warning-sign');

        icon.classList.add(classIcon);

        iconStyle.color = colorIcon;
        iconStyle.display = 'block';
    }

    /**
     * Показывает icon, преобразуя его в спинер
     * @param elementId — ID input,на котором происходит событие
     * @param classIcon — Класс, который будет в icon
     * @param isShow — Флаг, true – показывать, false – не показывать
     * @protected
     */
    _getIconSpinner(elementId, classIcon, isShow = false) {
        const icon = document.querySelector(`#${elementId} ~ .input-animated__icon-status`);
        const iconStyle = icon.style;

        icon.classList.remove('glyphicon-remove');
        icon.classList.remove('glyphicon-ok');
        icon.classList.remove('glyphicon-warning-sign');
        icon.classList.remove(classIcon);

        if(isShow) {
            icon.classList.add(classIcon);
        }

        let isDisplay = isShow ? 'block' : 'none';

        iconStyle.display = isDisplay;
    }

    /**
     * Скрывает icon
     * @param elementId — ID input,на котором происходит событие
     * @protected
     */
    _hideIcon(elementId) {
        const icon = document.querySelector(`#${elementId} ~ .input-animated__icon-status`).style;

        icon.display = 'none';
    }

    /**
     * Показывает placeholder, изменяя его текст и стили
     * @param elementId — ID input,на котором происходит событие
     * @param placeholderText — Сообщение, которое следует поместить в placeholder
     * @param colorPlaceholder — Цвет placeholder
     * @protected
     */
    _showPlaceholder(elementId, placeholderText, colorPlaceholder) {
        const placeholder = document.querySelector(`#${elementId} ~ .input-animated__placeholder`);
        const placeholderStyle = placeholder.style;

        placeholder.innerText = placeholderText;

        placeholderStyle.color = colorPlaceholder;
        placeholderStyle.display = 'block';
        placeholderStyle.bottom = '20px';
        placeholderStyle.fontSize = '14px';
        placeholderStyle.fontStyle = 'italic';
    }

    /**
     * Прячет placeholder, применяя к нему стили по-умолчанию
     * @param elementId — ID input,на котором происходит событие
     * @param placeholderText — Сообщение, которое следует поместить в placeholder
     * @param colorPlaceholder — Цвет placeholder
     * @protected
     */
    _hidePlaceholder(elementId, placeholderText, colorPlaceholder) {
        const placeholder = document.querySelector(`#${elementId} ~ .input-animated__placeholder`);
        const placeholderStyle = placeholder.style;

        placeholder.innerText = placeholderText;

        placeholderStyle.color = colorPlaceholder;
        placeholderStyle.display = 'none';
        placeholderStyle.bottom = '-5px';
        placeholderStyle.fontSize = '18px';
        placeholderStyle.fontStyle = 'normal';
    }

    /**
     * Метод переводит поле input в состояние успеха
     * @param elementId — ID input,на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     * @protected
     */
    _acceptInput(elementId, message) {
        const colorOk = '#53B73F';

        this._changeUnderline(elementId, colorOk, 1);
        this._showPlaceholder(elementId, message, colorOk);
        this._showIcon(elementId, 'glyphicon-ok', colorOk);
    }

    /**
     * Метод переводит поле input в состояние предупреждения
     * @param elementId — ID input,на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     * @protected
     */
    _warnInput(elementId, message) {
        const colorWarning = '#EBBD32';

        this._changeUnderline(elementId, colorWarning, 1);
        this._showPlaceholder(elementId, message, colorWarning);
        this._showIcon(elementId, 'glyphicon-warning-sign', colorWarning);
    }

    /**
     * Метод переводит поле input в состояние ошибки
     * @param elementId — ID input,на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     * @protected
     */
    _rejectInput(elementId, message) {
        const colorError = '#e23838';

        this._changeUnderline(elementId, colorError, 1);
        this._showPlaceholder(elementId, message, colorError);
        this._showIcon(elementId, 'glyphicon-remove', colorError);
    }

    /**
     * Метод переводит поле input в состояние по-умолчанию
     * @param elementId — ID input,на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     * @protected
     */
    _defaultInput(elementId, message) {
        const colorDefault = '#00b5ff';

        this._changeUnderline(elementId, colorDefault, 0);
        this._hidePlaceholder(elementId, message, colorDefault);
        this._hideIcon(elementId);
    }

    /**
     * Проверяет input на валидность и перекрашивае underline в соответствующий цвет
     * @param event — Объект, на котором происходит событие
     * @param pattern — Регулярное выражение, на основе которого проверяется валидность поля input
     * @param messageOk — Сообщение placeholder при успехе
     * @param messageError — Сообщение placeholder при ошибке
     * @param messageDefault — Сообщение placeholder при пустом значении
     */
    checkValidTextInput(event, pattern, messageOk = 'Данные заполнены верно', messageError = 'Данные неккоректны', messageDefault = 'Введите свои данные') {
        const elementId = event.target.id;

        // Проверка на совпадение с шаблоном
        if(pattern.test(event.target.value)) {
            // Поле заполненно верно. Совпадает с шаблоном
            this._acceptInput(elementId, messageOk);
        } else if(event.target.value === '') {
            // Поле не заполненно.
            this._rejectInput(elementId, 'Пожалуйста, заполните поле');

            setTimeout(() => {
                this._defaultInput(elementId, messageDefault);
            }, 1000);
        } else {
            // Поле заполненно неверно. Не совпадает с шаблоном
            this._rejectInput(elementId, messageError);
        }
    }

    /**
     * Проверяет поле email на существование введённого email в БД
     * @param idEmailInput — ID input email
     * @param messageOk — Сообщение об успехе(Email свободен)
     */
    checkAJAXEmail(idEmailInput, messageOk) {
        const emailInput = document.querySelector(`#${idEmailInput}`);
        let emailExist = false;

        this._getIconSpinner(idEmailInput, 'mk-spinner-ring', true);

        return axios.post('http://ais-archive/api/check-email.php', querystring.stringify({
            checkEmail: emailInput.value
        }))
            .then(answer => {
                if (answer.data === 'Ok') {
                    emailExist = true;
                }

                this._getIconSpinner(idEmailInput, 'mk-spinner-ring', false);

                if (emailExist === true) {
                    this._acceptInput(idEmailInput, messageOk);
                    return true;
                } else {
                    this._rejectInput(idEmailInput, 'Такой Email уже зарегистрирован');
                    return false;
                }

                /*
                setTimeout(() => {
                    // TODO есть возможность сделать прокрутку спинера на 500ms но тогда не успевают прогрузится стили, вылетает ошибка в консоли, проблема в асинхронности setTimeout, при возможности, подумать как исправить это
                    //this._getIconSpinner(idEmailInput, 'mk-spinner-ring', false);

                    if (emailExist === true) {
                        this._acceptInput(idEmailInput, messageOk);
                    } else {
                        this._rejectInput(idEmailInput, 'Такой Email уже зарегистрирован');
                    }
                }, 500);

                if (emailExist === true) {
                    return true;
                } else {
                    return false;
                }
                */
            })
            .catch(error => console.error(error));
    }

    /**
     * Проверяет input на валидность и перекрашивае underline в соответствующий цвет
     * @param event — Объект, на котором происходит событие
     * @param pattern — Регулярное выражение, на основе которого проверяется валидность поля input
     * @param messageOk — Сообщение placeholder при успехе
     * @param messageError — Сообщение placeholder при ошибке
     * @param messageDefault — Сообщение placeholder при пустом значении
     */
    checkValidEmailInput(event, pattern, messageOk = 'Данные заполнены верно', messageError = 'Данные неккоректны', messageDefault = 'Введите свои данные') {
        const elementId = event.target.id;

        // Проверка на совпадение с шаблоном
        if(pattern.test(event.target.value)) {
            this.checkAJAXEmail(elementId, messageOk);
        } else if(event.target.value === '') {
            // Поле не заполненно.
            this._rejectInput(elementId, 'Пожалуйста, укажите Email');

            setTimeout(() => {
                this._defaultInput(elementId, messageDefault);
            }, 1000);
        } else {
            // Поле заполненно неверно. Не совпадает с шаблоном
            this._rejectInput(elementId, messageError);
        }
    }

    /**
     * Проверяет пароль input на валидность и перекрашивае underline в соответствующий цвет
     * @param event — Объект, на котором происходит событие
     * @param patternOk — Регулярное выражение, на основе которого проверяется валидность сильного пароля поля input
     * @param patternWarning — Регулярное выражение, на основе которого проверяется валидность сильного слабого поля input
     * @param messageOk — Сообщение placeholder при успехе
     * @param messageWarning — Сообщение placeholder при предупреждении
     * @param messageError — Сообщение placeholder при ошибке
     * @param messageDefault — Сообщение placeholder по умолчанию
     */
    checkValidPasswordInput(event, patternOk, patternWarning = /^.{6,}$/, messageOk = 'Сильный пароль', messageWarning = 'Слабый пароль', messageError = 'Пароль слишком короткий', messageDefault = 'Введите пароль') {
        const elementId = event.target.id;

        // Проверка пароля на совпадение с шаблонами
        if(patternOk.test(event.target.value)) {
            // Сильный пароль. Совпадает с шаблоном
            this._acceptInput(elementId, messageOk);
        } else if(patternWarning.test(event.target.value)) {
            // Слабый пароль
            this._warnInput(elementId, messageWarning);
        } else if(event.target.value === '') {
            // Поле не заполненно.
            this._rejectInput(elementId, 'Пожалуйста, укажите пароль');

            setTimeout(() => {
                this._defaultInput(elementId, messageDefault);
            }, 1000);
        } else {
            // Поле заполненно неверно. Не совпадает с шаблоном
            this._rejectInput(elementId, messageError);
        }
    }

    /**
     * Проверяет Input повторения пароля на совпадение с предыдущим паролем
     * @param elementId — ID input, который нужно сравнивать
     * @param idCheckInput — ID input, с которым нужно сравнивать
     * @param messageOk — сообщение при совпадении полей
     * @param messageError — сообщение при не совпадении полей
     */
    checkEqualsInputs(elementId, idCheckInput, messageOk = 'Пароли совпадают', messageError = 'Пароли не совпадают') {
        const input = document.querySelector(`#${elementId}`);
        const checkInput = document.querySelector(`#${idCheckInput}`);

        if (input.value === checkInput.value) {
            // Совпадают
            this._acceptInput(elementId, messageOk);
        } else {
            // Не совпадают
            this._rejectInput(elementId, messageError);
        }
    }

    /**
     * Обработчик события onFocus на елементе input
     * Устанавливает стили по-умолчанию
     * @param event — Объект, на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     */
    focusInput(event, message) {
        const elementId = event.target.id;
        const colorDefault = '#00b5ff';

        this._changeUnderline(elementId, colorDefault, 1);
        this._showPlaceholder(elementId, message, colorDefault);
    }
}
