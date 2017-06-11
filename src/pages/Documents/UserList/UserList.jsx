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

import './UserList.scss';

import { getAllUsers } from './actions';
import { getNotificationForDocument } from '../../MyOffice/actions';

class UserList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowContent: false,
            isGetNotification: false
        };

        if (this.props.document.hasOwnProperty('currentDocument'))
            delete this.props.document.currentDepartment;

        this.props.getAllUsersDB();

        this.searchDocument = this.searchDocument.bind(this);
        this.addUserToDocument = this.addUserToDocument.bind(this);
        this.resetNotification = this.resetNotification.bind(this);
    }

    resetNotification(event, currentDocument, user) {
        const idChosenUser = event.currentTarget.getAttribute('data-document-id');

        const data = {
            documentId: currentDocument,
            userFromId: user.id,
            userToId: idChosenUser
        };

        axios.post( '/api/document/document-reset-user.php', querystring.stringify( data ) )
            .then(response => response.data)
            .then(answer => {
                console.log('answer = ', answer);

                if ( answer !== 'Error' ) {
                    const doc = {
                        documentId: answer
                    };
                    console.log('doc = ', doc);

                    this.props.getNotificationForDocumentDB(doc);
                }
            } )
            .catch(error => console.error(error));
    }

    addUserToDocument(event, currentDocument, user) {
        const idChosenUser = event.currentTarget.getAttribute('data-document-id');

        const data = {
            documentId: currentDocument,
            userFromId: user.id,
            userToId: idChosenUser
        };

        axios.post( '/api/document/document-add-user.php', querystring.stringify( data ) )
            .then(response => response.data)
            .then(answer => {
                console.log('answer', answer);

                if ( answer !== 'Error' ) {
                    const doc = {
                        documentId: answer
                    };

                    this.props.getNotificationForDocumentDB(doc);
                }
            } )
            .catch(error => console.error(error));
    }

    searchDocument(event) {
        const inputSearch               = document.querySelector('#sidebar__search_document');
        const inputDateBeginFrom        = document.querySelector('#dateBeginFrom');
        const inputDateBeginTo          = document.querySelector('#dateBeginTo');
        const inputDateSignatureFrom    = document.querySelector('#dateSignatureFrom');
        const inputDateSignatureTo      = document.querySelector('#dateSignatureTo');
        const inputDateEndFrom          = document.querySelector('#dateEndFrom');
        const inputDateEndTo            = document.querySelector('#dateEndTo');

        const oderAlphabet              = this.state.oderAlphabet;
        const oderDateBegin             = this.state.oderDateBegin;
        const oderDateSignature         = this.state.oderDateSignature;
        const oderDateEnd               = this.state.oderDateEnd;

        const user                      = this.props.userData;

        const search = {
            userId: user.id,
            search: inputSearch.value,
            dateBeginFrom: inputDateBeginFrom.value,
            dateBeginTo: inputDateBeginTo.value,
            dateSignatureFrom: inputDateSignatureFrom.value,
            dateSignatureTo: inputDateSignatureTo.value,
            dateEndFrom: inputDateEndFrom.value,
            dateEndTo: inputDateEndTo.value,
            oderAlphabet, oderDateBegin, oderDateSignature, oderDateEnd
        };

        this.props.getUserListDBBySearch(search);
    }

    render() {
        let users = ObjectHandler.getArrayFromObject(this.props.userList),
            departments = ObjectHandler.getArrayFromObject(this.props.department),
            notifications = ObjectHandler.getArrayFromObject(this.props.notification);

        const currentUser = this.props.userData;

        let usersInDepartment = {};

        const currentDocument = this.props.document.currentDocument;

        if ( typeof currentDocument === 'object' ) {
            if ( this.state.isGetNotification === false ) {

                const data = {
                    documentId: currentDocument.id
                };

                this.props.getNotificationForDocumentDB(data);
                this.setState({ isGetNotification: true });
            }
        }

        departments.map( department => {
            usersInDepartment[department.id] = 0;
        } );

        departments.map( department => {
            users.map( user => {
                if ( user.department_id === department.id && user.id !== currentUser.id ) {
                    usersInDepartment[department.id]++;
                }
            } )
        } );

        moment.locale('ru');

        const popoverAdd = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке, Вы отправите данному пользователю
                <strong> запрос о разделении ответсвенности на данный документ</strong>
                <i> (пользователь сможет принять или отклонить Ваш запрос)</i>
            </Popover>
        );

        const popoverOk = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке, Вы отмените заявку, отправлнную Вами ранее
            </Popover>
        );

        return (
            <div>
                {
                    typeof currentDocument === 'object' ?
                        <div>

                            { departments.map( department => {
                                return <Folder
                                    caption={ department.title + ` (${usersInDepartment[department.id]})` }
                                    key={ department.id }
                                    folderId={ 'folder-' + department.id }>

                                    { users.map(user => {
                                        if ( user.department_id === department.id && user.id !== currentUser.id ) {
                                            let isAdded = false;

                                            for ( let i = 0; i < notifications.length; i++ ) {
                                                if (notifications[i].user_to_id === user.id) {
                                                    isAdded = true;
                                                    break;
                                                }
                                            }

                                            if ( isAdded === true ) {
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
                                                                isOk={ true }
                                                                userIcon={ <img src={ user.photo }
                                                                                alt='Фото пользователя'
                                                                                className='user-list__card_photo'
                                                                /> }
                                                                popoverOk={ popoverOk }
                                                                popoverPosition={ 'right' }
                                                                onOk={ event => this.resetNotification(event, currentDocument.id, currentUser) }
                                                            >
                                                                <p><span>Email пользователя:</span> { user.email }</p>
                                                                <p><span>Отдел пользователя:</span> { user.department }</p>
                                                                <p><span>Должность пользователя:</span> { user.position }</p>
                                                            </Document>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
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
                                                                isAddUser={ true }
                                                                userIcon={ <img src={ user.photo }
                                                                                alt='Фото пользователя'
                                                                                className='user-list__card_photo'
                                                                /> }
                                                                popoverAdd={ popoverAdd }
                                                                popoverPosition={ 'right' }
                                                                onAddUser={ event => this.addUserToDocument(event, currentDocument.id, currentUser) }
                                                            >
                                                                <p><span>Email пользователя:</span> { user.email }</p>
                                                                <p><span>Отдел пользователя:</span> { user.department }</p>
                                                                <p><span>Должность пользователя:</span> { user.position }</p>
                                                            </Document>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        }
                                    }) }
                                    
                                </Folder>
                            } ) }
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

UserList.path = '/documents/UserList';

export default connect(
    state => ({
        userList: state.userList,
        userData: state.userData,
        department: state.department,
        document: state.document,
        notification: state.notification
    }),
    dispatch => ({
        getAllUsersDB: () => {
            dispatch(getAllUsers());
        },
        getNotificationForDocumentDB: data => {
            dispatch(getNotificationForDocument(data));
        }
    })
)(UserList);
