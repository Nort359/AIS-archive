import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';
import moment from 'moment';
import { Popover } from 'react-bootstrap';
import axios from 'axios';
import querystring from 'querystring';

import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Folder from '../../../components/Folder/Folder';
import Document from '../../../components/Document/Document';
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock';

import ObjectHandler from '../../../classes/ObjectHandler';

import '../UserList/UserList.scss';

import { getAllUsersInDocument } from './actions';
import { getNotificationForDocument } from '../../MyOffice/actions';

class UserListInDocument extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowContent: false,
            isGetUser: false
        };

    }

    render() {
        let users = ObjectHandler.getArrayFromObject(this.props.userListInDocument);

        const currentDocument = this.props.document.currentDocument;

        if ( typeof currentDocument === 'object' ) {
            if ( parseInt( currentDocument.id ) > 0 ) {
                if ( this.state.isGetUser === false ) {

                    const data = {
                        documentId: currentDocument.id
                    };

                    this.props.getAllUsersInDocumentDB(data);
                    this.setState({ isGetUser: true });
                }
            }
        }

        moment.locale('ru');

        return (
            <div>
                {
                    typeof currentDocument === 'object' ?
                        <div>

                            <h2 className='documents__header'>Ответственные пользователи за документ: "{ currentDocument.title }"</h2>

                            { users.map(user => {
                                return (
                                    <div className='user-list'>
                                        <div className='user-list__card'>
                                            <Document
                                                documentId={ user.id }
                                                key={ user.id }
                                                caption={ `${user.surname} ${user.name} ${user.middlename}` }
                                                isUpdate={ true }
                                                isNotDelete={ true }
                                                isUserIcon={ true }
                                                userIcon={ <img src={ user.photo }
                                                                alt='Фото пользователя'
                                                                className='user-list__card_photo'
                                                /> }
                                            >
                                                <p><span>Email пользователя:</span> { user.email }</p>
                                                <p><span>Отдел пользователя:</span> { user.department }</p>
                                                <p><span>Должность пользователя:</span> { user.position }</p>
                                            </Document>
                                        </div>
                                    </div>
                                );
                            }) }
                        </div>
                        :
                        <CenterScreenBlock>
                            <h2>
                                Индификатор документа был утерян,<br/>
                                возможно вы перезагрузили страницу, пожалуйста,<br/>
                                вернитесь к списку документов и нажмите<br/>
                                на добавление пользователя к необходимому документу снова
                            </h2>
                            <Button onClick={ event => window.history.back() } className={ 'button-back' } >
                                <i className="glyphicon glyphicon-hand-left"></i>
                                Назад
                            </Button>
                        </CenterScreenBlock>
                }
            </div>
        );
    }

}

UserListInDocument.path = '/documents/UserListInDocument';

export default connect(
    state => ({
        userListInDocument: state.userListInDocument,
        userData: state.userData,
        department: state.department,
        document: state.document,
        notification: state.notification
    }),
    dispatch => ({
        getAllUsersInDocumentDB: data => {
            dispatch(getAllUsersInDocument(data));
        },
        getNotificationForDocumentDB: data => {
            dispatch(getNotificationForDocument(data));
        }
    })
)(UserListInDocument);
