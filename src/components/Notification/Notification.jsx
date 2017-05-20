import React from 'react';

import Button from '../Button/Button';

import './Notification.scss';

import Animation from '../../classes/Animation';

class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.closeNotification = this.closeNotification.bind(this);
    }

    /**
     * Метод, закрывающий уведомление (notification)
     * @param event — Объект елемента, на котором происходит событие
     */
    closeNotification(event) {
        event.preventDefault();

        const notification = document.querySelector('.notification').style;
        const background = document.querySelector('.center-screen-block__table').style;

        Animation.addAnimateElement(notification, 'notification_right', '1s');
        Animation.addAnimateElement(background, 'background_light', '1s');
    }

    render() {
        return (
            <div className='notification'>
                <h4 className='notification__caption'>{ this.props.header }</h4>
                { this.props.children }
                <Button onClick={ event => {
                    this.closeNotification(event);
                    { this.props.btnEvent() }
                } }>{ this.props.btnText }</Button>
            </div>
        );
    }
}

Notification.propTypes = {
    header: React.PropTypes.string.isRequired,
    btnText: React.PropTypes.string.isRequired,
    btnEvent: React.PropTypes.func,
    children: React.PropTypes.any.isRequired,
};

export default Notification;
