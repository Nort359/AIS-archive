import React from 'react';

import Button from '../Button/Button';
import './Notification.scss';

class Notification extends React.Component {

    constructor(props) {
        super(props);

        this._addAnimateElement = this._addAnimateElement.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
    }

    /**
     * Вспомогательный метод, добавляющий анимацию переданному элементу
     * @param elementStyle — Стиль элемента в DOM дереве
     * @param name — Имя @keyframe, который будет использоваться в качестве анимации
     * @param duration — Время продолжительности анимации
     * @param delay — Время задержки анимации
     * @param timingFunction — Временная функция анимации
     * @param fillMode — fillMode анимации
     * @private
     */
    _addAnimateElement(elementStyle, name, duration = '1s', delay = '0', timingFunction = 'ease-in-out', fillMode = 'forwards') {
        elementStyle.animationName = name;
        elementStyle.animationTimingFunction = timingFunction;
        elementStyle.animationDelay = delay;
        elementStyle.animationFillMode = fillMode;
        elementStyle.animationDuration = duration;
    }

    /**
     * Метод, закрывающий уведомление (notification)
     * @param event — Объект елемента, на котором происходит событие
     */
    closeNotification(event) {
        event.preventDefault();

        const notification = document.querySelector('.notification').style;
        const background = document.querySelector('.notification-section__table').style;

        this._addAnimateElement(notification, 'notification_right', '1s');
        this._addAnimateElement(background, 'background_light', '1s');
    }

    render() {
        return (
            <div className='notification'>
                <h4 className='notification__caption'>{ this.props.header }</h4>
                { this.props.children }
                <Button onClick={ this.closeNotification }>{ this.props.btnText }</Button>
            </div>
        );
    }
}

Notification.propTypes = {
    header: React.PropTypes.string.isRequired,
    btnText: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired
};

export default Notification;
