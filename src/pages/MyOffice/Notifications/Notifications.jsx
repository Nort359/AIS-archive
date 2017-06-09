import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';
import moment from 'moment';

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
    }

    render() {
        let notifications = ObjectHandler.getArrayFromObject(this.props.notification);

        moment.locale('ru');

        return (
            <div>
                { notifications.map(notification => {
                    return (
                        <div className='user-list'>
                            <div className='user-list__card'>
                                <Document
                                    documentId={ notification.id }
                                    key={ notification.id }
                                    caption={ notification.text }
                                    isUpdate={ true }
                                    isNotDelete={ true }
                                    isUserIcon={ true }
                                    isAddUser={ true }
                                >
                                    <p><span>От кого:</span> { notification.user_from_name }</p>
                                </Document>
                            </div>
                        </div>
                    );
                }) }


                <SideBar>
                    <h3 className='sidebar__caption'>Действия над документами</h3>

                    <h3 className='sidebar__caption sidebar__search'>Поиск</h3>
                    <div className='sidebar__search_container'>
                        <Input
                            placeholder={ 'Название документа' }
                            inputId={ 'sidebar__search_document' }
                            onChange={ event => this.searchDocument(event) }
                        />
                        <i className='sidebar__search_icon glyphicon glyphicon-search'></i>
                    </div>
                </SideBar>
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
