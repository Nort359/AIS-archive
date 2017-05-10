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
     * @param event — Объект события
     * @param color — Цвет, в который перекрасится underline
     * @param scale — 1 – если нужно показать underline или 0 – если скрыть
     */
    _changeUnderline(elementId, color = '#00b5ff', scale = 0) {
        const underline = document.querySelector('#' + elementId + ' ~ .input-animated__underline').style;

        underline.backgroundColor = color;
        underline.transform = 'scale(' + scale + ')';
    }

    /**
     * Показывает icon, изменяя его текст и стили
     * @param event — Объект, на котором происходит событие
     * @param classIcon — Класс, который будет в icon
     * @param colorIcon — Цвет icon
     */
    _showIcon(elementId, classIcon, colorIcon) {
        const icon = document.querySelector('#' + elementId + ' ~ .input-animated__icon-status');
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
     * @param event — Объект, на котором происходит событие
     * @param classIcon — Класс, который будет в icon
     * @param isShow — Флаг, true – показывать, false – не показывать
     */
    _getIconSpinner(elementId, classIcon, isShow = false) {
        const icon = document.querySelector('#' + elementId + ' ~ .input-animated__icon-status');
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
     * @param event — Объект, на котором происходит событие
     */
    _hideIcon(elementId) {
        const icon = document.querySelector('#' + elementId + ' ~ .input-animated__icon-status').style;

        icon.display = 'none';
    }

    /**
     * Показывает placeholder, изменяя его текст и стили
     * @param event — Объект, на котором происходит событие
     * @param placeholderText — Сообщение, которое следует поместить в placeholder
     * @param colorPlaceholder — Цвет placeholder
     */
    _showPlaceholder(elementId, placeholderText, colorPlaceholder) {
        const placeholder = document.querySelector('#' + elementId + ' ~ .input-animated__placeholder');
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
     * @param event — Объект, на котором происходит событие
     * @param placeholderText — Сообщение, которое следует поместить в placeholder
     * @param colorPlaceholder — Цвет placeholder
     */
    _hidePlaceholder(elementId, placeholderText, colorPlaceholder) {
        const placeholder = document.querySelector('#' + elementId + ' ~ .input-animated__placeholder');
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
     * @param event — Объект, на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     */
    _acceptInput(elementId, message) {
        const colorOk = '#53B73F';

        this._changeUnderline(elementId, colorOk, 1);
        this._showPlaceholder(elementId, message, colorOk);
        this._showIcon(elementId, 'glyphicon-ok', colorOk);
    }

    /**
     * Метод переводит поле input в состояние предупреждения
     * @param event — Объект, на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     */
    _warnInput(elementId, message) {
        const colorWarning = '#EBBD32';

        this._changeUnderline(elementId, colorWarning, 1);
        this._showPlaceholder(elementId, message, colorWarning);
        this._showIcon(elementId, 'glyphicon-warning-sign', colorWarning);
    }

    /**
     * Метод переводит поле input в состояние ошибки
     * @param event — Объект, на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     */
    _rejectInput(elementId, message) {
        const colorError = '#e23838';

        this._changeUnderline(elementId, colorError, 1);
        this._showPlaceholder(elementId, message, colorError);
        this._showIcon(elementId, 'glyphicon-remove', colorError);
    }

    /**
     * Метод переводит поле input в состояние по-умолчанию
     * @param event — Объект, на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
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
            this._defaultInput(elementId, messageDefault);
        } else {
            // Поле заполненно неверно. Не совпадает с шаблоном
            this._rejectInput(elementId, messageError);
        }
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
            // Поле заполненно верно. Совпадает с шаблоном
            let emailExist = false;

            this._getIconSpinner(elementId, 'mk-spinner-ring', true);

            axios.post('http://ais-archive/api/check_email.php', querystring.stringify({
                checkEmail: event.target.value
            }))
                .then(res => {
                    if (res.data === 'Ok') {
                        emailExist = true;
                    }
                    setTimeout(() => {
                        this._getIconSpinner(elementId, 'mk-spinner-ring', false);

                        if(emailExist === true) {
                            this._acceptInput(elementId, messageOk);
                        } else {
                            this._rejectInput(elementId, 'Такой Email уже зарегистрирован');
                        }
                    }, 500);
                })
                .catch(error => console.error(error));
        } else if(event.target.value === '') {
            // Поле не заполненно.
            this._defaultInput(elementId, messageDefault);
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
    checkValidPasswordInput(event, patternOk, patternWarning, messageOk = 'Сильный пароль', messageWarning = 'Слабый пароль', messageError = 'Пароль слишком короткий', messageDefault = 'Введите пароль') {
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
            this._defaultInput(elementId, messageDefault);
        } else {
            // Поле заполненно неверно. Не совпадает с шаблоном
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
