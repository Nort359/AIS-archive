import React from 'react';

export default class AForm extends React.Component {
    constructor(props) {
        super(props);

        this._changeUnderline = this._changeUnderline.bind(this);
        this._showIcon = this._showIcon.bind(this);
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
    _changeUnderline(event, color = '#00b5ff', scale = 0) {
        const underline = document.querySelector('#' + event.target.id + ' ~ .input-animated__underline').style;

        underline.backgroundColor = color;
        underline.transform = 'scale(' + scale + ')';
    }

    /**
     * Показывает icon, изменяя его текст и стили
     * @param event — Объект, на котором происходит событие
     * @param classIcon — Класс, который будет в icon
     * @param colorIcon — Цвет icon
     */
    _showIcon(event, classIcon, colorIcon) {
        const icon = document.querySelector('#' + event.target.id + ' ~ .input-animated__icon-status');
        const iconStyle = icon.style;

        icon.classList.remove('glyphicon-remove');
        icon.classList.remove('glyphicon-ok');
        icon.classList.remove('glyphicon-warning-sign');

        icon.classList.add(classIcon);

        iconStyle.color = colorIcon;
        iconStyle.display = 'block';
    }

    /**
     * Скрывает icon
     * @param event — Объект, на котором происходит событие
     */
    _hideIcon(event) {
        const icon = document.querySelector('#' + event.target.id + ' ~ .input-animated__icon-status').style;

        icon.display = 'none';
    }

    /**
     * Показывает placeholder, изменяя его текст и стили
     * @param event — Объект, на котором происходит событие
     * @param placeholderText — Сообщение, которое следует поместить в placeholder
     * @param colorPlaceholder — Цвет placeholder
     */
    _showPlaceholder(event, placeholderText, colorPlaceholder) {
        const placeholder = document.querySelector('#' + event.target.id + ' ~ .input-animated__placeholder');
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
    _hidePlaceholder(event, placeholderText, colorPlaceholder) {
        const placeholder = document.querySelector('#' + event.target.id + ' ~ .input-animated__placeholder');
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
    _acceptInput(event, message) {
        const colorOk = '#53B73F';

        this._changeUnderline(event, colorOk, 1);
        this._showPlaceholder(event, message, colorOk);
        this._showIcon(event, 'glyphicon-ok', colorOk);
    }

    /**
     * Метод переводит поле input в состояние предупреждения
     * @param event — Объект, на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     */
    _warnInput(event, message) {
        const colorWarning = '#EBBD32';

        this._changeUnderline(event, colorWarning, 1);
        this._showPlaceholder(event, message, colorWarning);
        this._showIcon(event, 'glyphicon-warning-sign', colorWarning);
    }

    /**
     * Метод переводит поле input в состояние ошибки
     * @param event — Объект, на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     */
    _rejectInput(event, message) {
        const colorError = '#e23838';

        this._changeUnderline(event, colorError, 1);
        this._showPlaceholder(event, message, colorError);
        this._showIcon(event, 'glyphicon-remove', colorError);
    }

    /**
     * Метод переводит поле input в состояние по-умолчанию
     * @param event — Объект, на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     */
    _defaultInput(event, message) {
        const colorDefault = '#00b5ff';

        this._changeUnderline(event, colorDefault, 0);
        this._hidePlaceholder(event, message, colorDefault);
        this._hideIcon(event);
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
        // Проверка на совпадение с шаблоном
        if(pattern.test(event.target.value)) {
            // Поле заполненно верно. Совпадает с шаблоном
            this._acceptInput(event, messageOk);
        } else if(event.target.value === '') {
            // Поле не заполненно.
            this._defaultInput(event, messageDefault);
        } else {
            // Поле заполненно неверно. Не совпадает с шаблоном
            this._rejectInput(event, messageError);
        }
    }

    /**
     * Проверяет пароль input на валидность и перекрашивае underline в соответствующий цвет
     * @param event — Объект, на котором происходит событие
     * @param patternOk — Регулярное выражение, на основе которого проверяется валидность сильного пароля поля input
     * @param patternWarning — Регулярное выражение, на основе которого проверяется валидность сильного слабого поля input
     * @param messageOk —
     * @param messageWarning —
     * @param messageError —
     * @param messageDefault —
     */
    checkValidPasswordInput(event, patternOk, patternWarning, messageOk = 'Сильный пароль', messageWarning = 'Слабый пароль', messageError = 'Пароль слишком короткий', messageDefault = 'Введите пароль') {
        // Проверка пароля на совпадение с шаблонами
        if(patternOk.test(event.target.value)) {
            // Сильный пароль. Совпадает с шаблоном
            this._acceptInput(event, messageOk);
        } else if(patternWarning.test(event.target.value)) {
            // Слабый пароль
            this._warnInput(event, messageWarning);
        } else if(event.target.value === '') {
            // Поле не заполненно.
            this._defaultInput(event, messageDefault);
        } else {
            // Поле заполненно неверно. Не совпадает с шаблоном
            this._rejectInput(event, messageError);
        }
    }

    /**
     * Обработчик события onFocus на елементе input
     * Устанавливает стили по-умолчанию
     * @param event — Объект, на котором происходит событие
     * @param message — Сообщение, которое следует поместить в placeholder
     */
    focusInput(event, message) {
        const colorDefault = '#00b5ff';

        this._changeUnderline(event, colorDefault, 1);
        this._showPlaceholder(event, message, colorDefault);
    }
}
