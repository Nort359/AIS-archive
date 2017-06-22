import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import querystring from 'querystring';
import { Popover } from 'react-bootstrap';

import SideBar from '../../components/SideBar/SideBar';
import List from '../../components/List/List';
import Folder from '../../components/Folder/Folder';
import Document from '../../components/Document/Document';
import Button from '../../components/Button/Button';
import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';

import './AdminPanel.scss';

import { getDepartment, deleteDepartment, getCurrentDepartment } from './Department/actions';
import { getPosition, getCurrentPosition, deletePosition } from './Position/actions';
import { getTypeDocument, deleteTypeDocument, getCurrentTypeDocument } from './TypeDocument/actions';
import { getExpansion, getCurrentExpansion, deleteExpansion } from './Expansion/actions';
import { getAllUsers } from '../Documents/UserList/actions';

import ObjectHandler from '../../classes/ObjectHandler';
import Animation from '../../classes/Animation';

class AdminPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenSideBar: false
        };

        this.props.getDepartmentDB();
        this.props.getPositionDB();
        this.props.getTypeDocumentDB();
        this.props.getExpansionDB();

        this.updateRecord       = this.updateRecord.bind(this);
        this.putDumpDataBase    = this.putDumpDataBase.bind(this);
        this.deleteDepartment   = this.deleteDepartment.bind(this);
        this.deletePosition     = this.deletePosition.bind(this);
        this.deleteTypeDocument = this.deleteTypeDocument.bind(this);
        this.deleteExpansion    = this.deleteExpansion.bind(this);
        this.openSideBar        = this.openSideBar.bind(this);
        this.makeUserHeader     = this.makeUserHeader.bind(this);
        this.makeHeadToUser     = this.makeHeadToUser.bind(this);

        if (this.props.department.hasOwnProperty('currentDepartment')) delete this.props.department.currentDepartment;
        else if (this.props.position.hasOwnProperty('currentPosition')) delete this.props.position.currentPosition;
        else if (this.props.typeDocument.hasOwnProperty('currentTypeDocument')) delete this.props.typeDocument.currentTypeDocument;
    }

    makeUserHeader(event) {
        const id = event.currentTarget.getAttribute('data-document-id'),
              user = {
                  userId: id
              };

        axios.post( '/api/user/user-make-header.php', querystring.stringify(user) )
            .then(response => response.data)
            .then(() => {
                this.props.getAllUsersDB();
            })
            .catch(error => console.error(error));
    }

    makeHeadToUser(event) {
        const id = event.currentTarget.getAttribute('data-document-id'),
            user = {
                userId: id
            };

        axios.post( '/api/user/user-make-user.php', querystring.stringify(user) )
            .then(response => response.data)
            .then(() => {
                this.props.getAllUsersDB();
            })
            .catch(error => console.error(error));
    }

    openSideBar() {
        const sideBar = document.querySelector('.sidebar').style;
        const captions = document.getElementsByClassName('sidebar__caption');

        Animation.toggleAnimateElement(this.state.isOpenSideBar, sideBar, 'slideRightSideBar', 'slideLeftSideBar', '500ms');

        let delay = this.state.isOpenSideBar ? 0 : 100;

        Array.prototype.forEach.call(captions, caption => {
            Animation.toggleAnimateElement(this.state.isOpenSideBar, caption.style, 'slideLeftSideBarElement', 'slideRightSideBarElement', '300ms', `${delay}ms`);
            delay += this.state.isOpenSideBar ? 0 : 100;
        });

        this.setState({ isOpenSideBar: !this.state.isOpenSideBar });
    }

    putDumpDataBase() {
        axios.get('/api/backup/db-get-dump.php')
            .then(response => response.data)
            .then(answer => {
                if ( answer === 'Ok' ) {
                    alert( 'Резервная копия базы данных успешно создана' );
                }
            })
            .catch(error => console.error(error));
    }

    updateRecord(event, deleteObject, callback) {
        if (deleteObject.hasOwnProperty('currentDepartment')) delete deleteObject.currentDepartment;
        else if (deleteObject.hasOwnProperty('currentPosition')) delete deleteObject.currentPosition;
        else if (deleteObject.hasOwnProperty('currentTypeDocument')) delete deleteObject.currentTypeDocument;

        const id = event.currentTarget.getAttribute('data-document-id'),
              position = {
                  id
              };

        callback(position);
    }

    deleteDepartment(event) {
        if ( window.confirm('Вы действительно желаете удалить этот отдел?') ) {
            const departmentId = event.currentTarget.getAttribute('data-document-id'),
                department = {
                    departmentId
                };

            this.props.deleteDepartmentDB(department);
        }
    }

    deletePosition(event) {
        if ( window.confirm('Вы действительно желаете удалить эту должность?') ) {
            const positionId = event.currentTarget.getAttribute('data-document-id'),
                position = {
                    positionId
                };

            this.props.deletePositionDB(position);
        }
    }

    deleteTypeDocument(event) {
        if ( window.confirm('Вы действительно желаете удалить этот тип документа?') ) {
            const typeDocumentId = event.currentTarget.getAttribute('data-document-id'),
                typeDocument = {
                    typeDocumentId
                };

            this.props.deleteTypeDocumentDB(typeDocument);
        }
    }

    deleteExpansion(event) {
        if ( window.confirm('Вы действительно желаете удалить это расширения для документа?') ) {
            const expansionId = event.currentTarget.getAttribute('data-document-id'),
                  expansion = {
                      expansionId
                  };

            this.props.deleteExpansionFromDB(expansion);
        }
    }

    render() {
        let departments     = ObjectHandler.getArrayFromObject(this.props.department),
            positions       = ObjectHandler.getArrayFromObject(this.props.position),
            typeDocuments   = ObjectHandler.getArrayFromObject(this.props.typeDocument),
            expansion       = ObjectHandler.getArrayFromObject(this.props.expansion),
            userList        = ObjectHandler.getArrayFromObject(this.props.userList);

        const user = this.props.userData;

        const popoverChangeDepartment = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>перейдёте на форму изменение этого отдела</strong>
            </Popover>
        );

        const popoverDeleteDepartment = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>удалите этот отдел <i>(если за ним ещё не были закреплены пользователи)</i></strong>
            </Popover>
        );

        const popoverChangePosition = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>перейдёте на форму изменение этой должности</strong>
            </Popover>
        );

        const popoverDeletePosition = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>удалите эту должность <i>(если за ней ещё не были закреплены пользователи)</i></strong>
            </Popover>
        );

        const popoverChangeTypeDocument = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>перейдёте на форму изменение этого типа документа</strong>
            </Popover>
        );

        const popoverDeleteTypeDocument = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>удалите этот тип документа <i>(если ни один пользователь ещё не закрепил за ним свои документы)</i></strong>
            </Popover>
        );

        const popoverChangeExpansion = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>перейдёте на форму изменение этого расширения документа</strong>
            </Popover>
        );

        const popoverDeleteExpansion = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>удалите это расширение документа</strong>
            </Popover>
        );

        const popoverAddHeadMan = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>сделаете этого пользователя начальником отдела</strong>
            </Popover>
        );

        const popoverAddHeadToUser = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>сделаете этого пользователя из начальником отдела в обычного пользователя</strong>
            </Popover>
        );

        let countUsers = 0;

        userList.map(user => {
            if ( user.admin !== '1' ) {
                countUsers++;
            }
        });

        return (
            <div>
                {
                    user.admin === '1' ?
                        <div>
                            <SideBar
                                isOpen={ this.state.isOpenSideBar }
                                onOpenSideBar={ this.openSideBar }
                            >
                                <h3 className='sidebar__caption'>Добавить данные</h3>
                                <List className={ 'sidebar__add_data' }>
                                    <Link to='/AdminPanel/AddDepartment'><li className='sidebar__caption sidebar__list_element'>Отделы</li></Link>
                                    <Link to='/AdminPanel/AddPosition'><li className='sidebar__caption sidebar__list_element'>Должности</li></Link>
                                    <Link to='/AdminPanel/TypeDocument'><li className='sidebar__caption sidebar__list_element'>Типы документов</li></Link>
                                    <Link to='/AdminPanel/AddExpansion'><li className='sidebar__caption sidebar__list_element'>Расширения документов</li></Link>
                                </List>
                            </SideBar>

                            <div className="admin-buttons__container">
                                <Button onClick={ this.putDumpDataBase }>Создать резервную копию базы даненых</Button>
                            </div>

                            <Folder caption={ `Отделы (${departments.length})` } folderId={ 'departmentsList' }>
                                { departments.map(department => {
                                    return <Document
                                        documentId={ department.id }
                                        key={ department.id }
                                        caption={ department.title }
                                        pathUpdate={ '/AdminPanel/UpdateDepartment' }
                                        onUpdateClick={ event => this.updateRecord(event, this.props.department, this.props.getCurrentDepartmentDB) }
                                        onDeleteClick={ this.deleteDepartment }
                                        isNotOpen={ true }
                                        isNotArraw={ true }
                                        popoverChange={ popoverChangeDepartment }
                                        popoverDelete={ popoverDeleteDepartment }
                                    />
                                }) }
                            </Folder>

                            <Folder caption={ `Должности (${positions.length})` } folderId={ 'positionsList' }>
                                { positions.map(position => {
                                    return <Document
                                        documentId={ position.id }
                                        key={ position.id }
                                        caption={ position.title }
                                        pathUpdate={ '/AdminPanel/UpdatePosition' }
                                        onUpdateClick={ event => this.updateRecord(event, this.props.position, this.props.getCurrentPositionDB) }
                                        onDeleteClick={ this.deletePosition }
                                        isNotOpen={ true }
                                        isNotArraw={ true }
                                        popoverChange={ popoverChangePosition }
                                        popoverDelete={ popoverDeletePosition }
                                    />
                                }) }
                            </Folder>

                            <Folder caption={ `Типы документов (${typeDocuments.length})` } folderId={ 'typeDocumentsList' }>
                                { typeDocuments.map(typeDocument => {
                                    return <Document
                                        documentId={ typeDocument.id }
                                        key={ typeDocument.id }
                                        caption={ typeDocument.title }
                                        pathUpdate={ '/AdminPanel/UpdateTypeDocument' }
                                        onUpdateClick={ event => this.updateRecord(event, this.props.typeDocument, this.props.getCurrentTypeDocumentDB) }
                                        onDeleteClick={ this.deleteTypeDocument }
                                        isNotOpen={ true }
                                        isNotArraw={ true }
                                        popoverChange={ popoverChangeTypeDocument }
                                        popoverDelete={ popoverDeleteTypeDocument }
                                    />
                                }) }
                            </Folder>
                            <Folder caption={ `Расширения документов (${expansion.length})` } folderId={ 'expansionsList' }>
                                { expansion.map(expansion => {
                                    return <Document
                                        documentId={ expansion.id }
                                        key={ expansion.id }
                                        caption={ expansion.title }
                                        pathUpdate={ '/AdminPanel/UpdateExpansion' }
                                        onUpdateClick={ event => this.updateRecord(event, this.props.expansion, this.props.getCurrentExpansionDB) }
                                        onDeleteClick={ this.deleteExpansion }
                                        isNotOpen={ true }
                                        isNotArraw={ true }
                                        popoverChange={ popoverChangeExpansion }
                                        popoverDelete={ popoverDeleteExpansion }
                                    />
                                }) }
                            </Folder>
                            <Folder caption={ `Пользователи (${countUsers})` } folderId={ 'usersList' }>
                                { userList.map(user => {
                                    if ( user.admin !== '1' ) {
                                        let userName = user.middlename != null ? user.middlename : '';

                                        if ( user.admin === '2' ) {
                                            return (
                                                <Document
                                                    documentId={ user.id }
                                                    key={ user.id }
                                                    caption={ `${user.surname} ${user.name} ${userName}` }
                                                    isUpdate={ true }
                                                    isNotDelete={ true }
                                                    isNotArraw={ true }
                                                    isUserIcon={ true }
                                                    userIcon={ <img src={ user.photo }
                                                                    alt='Фото пользователя'
                                                                    className='user-list__card_photo'
                                                    /> }
                                                    popoverPosition={ 'right' }
                                                    isNotOpen={ false }
                                                    isOk={ true }
                                                    onOk={ this.makeHeadToUser }
                                                    popoverOk={ popoverAddHeadToUser }
                                                >
                                                    <p><span>Email пользователя:</span> { user.email }</p>
                                                    <p><span>Отдел пользователя:</span> { user.department }</p>
                                                    <p><span>Должность пользователя:</span> { user.position }</p>
                                                </Document>
                                            );
                                        } else {
                                            return (
                                                <Document
                                                    documentId={ user.id }
                                                    key={ user.id }
                                                    caption={ `${user.surname} ${user.name} ${userName}` }
                                                    isUpdate={ true }
                                                    isNotDelete={ true }
                                                    isNotArraw={ true }
                                                    isUserIcon={ true }
                                                    userIcon={ <img src={ user.photo }
                                                                    alt='Фото пользователя'
                                                                    className='user-list__card_photo'
                                                    /> }
                                                    popoverPosition={ 'right' }
                                                    isNotOpen={ false }
                                                    isAddUser={ true }
                                                    onAddUser={ this.makeUserHeader }
                                                    popoverAdd={ popoverAddHeadMan }
                                                >
                                                    <p><span>Email пользователя:</span> { user.email }</p>
                                                    <p><span>Отдел пользователя:</span> { user.department }</p>
                                                    <p><span>Должность пользователя:</span> { user.position }</p>
                                                </Document>
                                            );
                                        }
                                    }
                                }) }
                            </Folder>
                        </div>
                        :
                        <CenterScreenBlock>
                            <h2>
                                Вы не были авторизированы как администратор.<br/>
                                Если Вы действительно являетесь администратором,<br/>
                                пожалуйста, авторизируйтесь под своим аккаунтом<br/>
                            </h2>
                            <Link to={ '/authorization' }>
                                <Button className={ 'button-back' } >
                                    <i className="glyphicon glyphicon-hand-left"></i>
                                    Авторизоваться
                                </Button>
                            </Link>
                        </CenterScreenBlock>
                }
            </div>
        );
    }

}

AdminPanel.path = '/AdminPanel';

export default connect(
    state => ({
        department: state.department,
        position: state.position,
        typeDocument: state.typeDocument,
        expansion: state.expansion,
        userData: state.userData,
        userList: state.userList
    }),
    dispatch => ({
        getDepartmentDB: () => {
            dispatch(getDepartment());
        },

        getCurrentDepartmentDB: department => {
            dispatch(getCurrentDepartment(department));
        },

        deleteDepartmentDB: (department) => {
            dispatch(deleteDepartment(department));
        },

        getPositionDB: () => {
            dispatch(getPosition());
        },

        getCurrentPositionDB(position) {
            dispatch(getCurrentPosition(position));
        },

        deletePositionDB: (position) => {
            dispatch(deletePosition(position));
        },

        getTypeDocumentDB: () => {
            dispatch(getTypeDocument());
        },

        deleteTypeDocumentDB: (typeDocument) => {
            dispatch(deleteTypeDocument(typeDocument));
        },

        getCurrentTypeDocumentDB: typeDocument => {
            dispatch(getCurrentTypeDocument(typeDocument));
        },

        getExpansionDB: () => {
            dispatch(getExpansion());
        },

        getCurrentExpansionDB: department => {
            dispatch(getCurrentExpansion(department));
        },

        deleteExpansionFromDB: department => {
            dispatch(deleteExpansion(department));
        },
        getAllUsersDB: () => {
            dispatch(getAllUsers());
        }
    })
)(AdminPanel);
