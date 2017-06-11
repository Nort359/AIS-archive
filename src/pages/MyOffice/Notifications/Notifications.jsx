import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';
import moment from 'moment';
import { Popover } from 'react-bootstrap';
import axios from 'axios';
import querystring from 'querystring';

import SideBar from '../../../components/SideBar/SideBar';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Folder from '../../../components/Folder/Folder';
import Document from '../../../components/Document/Document';
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock';

import ObjectHandler from '../../../classes/ObjectHandler';

import './Notifications.scss';

import { getNotifications } from '../actions';

class Notifications extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            oderAlphabet:       false,
            oderDateBegin:      false,
            oderDateSignature:  false,
            oderDateEnd:        false,

            isShowContent:      false
        };

        const userData = this.props.userData;

        const user = {
            userId: userData.id
        };

        this.props.getNotificationDB(user);

        this.acceptMessage = this.acceptMessage.bind(this);
    }

    acceptMessage(event, user) {
        const notificationId = event.currentTarget.getAttribute('data-document-id');

        const data = {
            notificationId,
            userId: user.id
        };

        axios.post('/api/notification/notification-accept.php', querystring.stringify(data))
            .then(response => response.data)
            .then(answer => {
                if ( answer !== 'Error' ) {
                    const userData = {
                        userId: answer
                    };

                    this.props.getNotificationDB(userData);
                }
            })
            .catch(error => console.error(error));
    }

    render() {
        let notifications = ObjectHandler.getArrayFromObject(this.props.notification);
        moment.locale('ru');

        const user = this.props.userData;

        const popoverDelete = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>удалите это уведомление</strong>
            </Popover>
        );

        const popoverOk = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>примите запрос от пользователя и станите ответственным за этот документ</strong>
            </Popover>
        );

        const popoverReject = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>отклоните запрос от пользователя</strong>
            </Popover>
        );

        return (
            <div>
                <h2 className='documents__header'>Мои уведомления</h2>

                { notifications.map(notification => {
                    if ( notification.readed === '0' ) {
                        return (
                            <div className='user-list'>
                                <div className='user-list__card'>
                                    <Document
                                        documentId={ notification.id }
                                        key={ notification.id }
                                        caption={ notification.title }
                                        isUpdate={ true }
                                        isUserIcon={ true }
                                        isOk={ true }
                                        isRejected={ true }
                                        popoverOk={ popoverOk }
                                        onOk={ event => this.acceptMessage(event, user) }
                                        popoverRejected={ popoverReject }
                                        popoverDelete={ popoverDelete }
                                        userIcon={ <i className="notification__icon glyphicon glyphicon-bell"></i> }
                                    >
                                        <p><span>Полное сообщение:</span> { notification.text }</p>
                                        <p><span>От кого:</span> { `${notification.user_from_surname} ${notification.user_from_name} ${notification.user_from_middlename}` }</p>
                                        <p><span>Email пользователя:</span> { notification.user_from_email }</p>
                                        <p><span>Дата создания уведомления:</span> { moment( notification.date_sended ).format('LL') }</p>
                                    </Document>
                                </div>
                            </div>
                        );
                    } else if ( notification.readed === '1' ) {
                        return (
                            <div className='user-list'>
                                <div className='user-list__card document-old'>
                                    <Document
                                        documentId={ notification.id }
                                        key={ notification.id }
                                        caption={ notification.title }
                                        isUpdate={ true }
                                        isUserIcon={ true }
                                        popoverDelete={ popoverDelete }
                                        userIcon={ <i className="notification__icon glyphicon glyphicon-ok"></i> }
                                    >
                                        <p><span>Полное сообщение:</span> { notification.text }</p>
                                        <p><span>От кого:</span> { `${notification.user_from_surname} ${notification.user_from_name} ${notification.user_from_middlename}` }</p>
                                        <p><span>Email пользователя:</span> { notification.user_from_email }</p>
                                        <p><span>Дата создания уведомления:</span> { moment( notification.date_sended ).format('LL') }</p>
                                    </Document>
                                </div>
                            </div>
                        );
                    }
                }) }
            </div>
        );
    }

}

Notifications.path = '/my-office/Notifications';

export default connect(
    state => ({
        userData: state.userData,
        document: state.document,
        notification: state.notification
    }),
    dispatch => ({
        getNotificationDB: user => {
            dispatch(getNotifications(user));
        }
    })
)(Notifications);
