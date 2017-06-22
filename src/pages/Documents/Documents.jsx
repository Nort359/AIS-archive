import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Popover, Modal } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import querystring from 'querystring';

import SideBar from '../../components/SideBar/SideBar';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Folder from '../../components/Folder/Folder';
import Document from '../../components/Document/Document';
import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';
import Notification from '../../components/Notification/Notification';

import ObjectHandler from '../../classes/ObjectHandler';
import Animation from '../../classes/Animation';

import './Documents.scss';

import { getDocuments, getDocumentsBySearch, getCurrentDocument, visibleDocs, getUserAndDocuments } from './actions';

class Documents extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            oderAlphabet:       false,
            oderDateBegin:      false,
            oderDateSignature:  false,
            oderDateEnd:        false,

            isShowContent:      false,
            isOpenSideBar:      false,
            visibleFolders:     this.props.visibleDocs,
            isReport:           false,
            numberReport:       0,
            isDelete:           false,
            isSearchDescription: false,
            isShowUsers:        false,
            headShow:           false,
            reportUsers:        false
        };

        if (this.props.document.hasOwnProperty('currentDocument'))
            delete this.props.document.currentDepartment;

        let intervalDocs = window.setInterval(
            () => {
                const user = this.props.userData;
                if ( typeof user === 'object' ) {
                    if ( parseInt( user.id ) > 0 ) {

                        if ( user.admin === '2' ) {
                            this.props.getUserAndDocuments({ userId: user.id });
                        }

                        this.props.getDocumentsDB({ userId: user.id });
                        clearInterval(intervalDocs);
                    }
                }
            },
            100
        );

        this.showOldDocuments   = this.showOldDocuments.bind(this);
        this.searchDocument     = this.searchDocument.bind(this);
        this.replaceDocument    = this.replaceDocument.bind(this);
        this.downloadDocument   = this.downloadDocument.bind(this);
        this.openSideBar        = this.openSideBar.bind(this);
        this.deleteDocument     = this.deleteDocument.bind(this);
    }

    deleteDocument(event, user) {
        if ( window.confirm( 'Вы действительно желаете удалить этот документ? Если у этого документа есть старые (неактуальные) аерсиии, то они удалятся вместе с ним.' ) ) {

            let id = event.currentTarget.getAttribute('data-document-id');

            let newSubStr = '';
            let pos = id.search( /-/ );

            if ( pos == 8 ) {
                id = id.substr(pos + 1);
            }

            const record = {
                id,
                userId: user.id
            };

            console.log( 'record = ', record );

            axios.post( 'http://ais-archive/api/document/document-delete.php', querystring.stringify(record) )
                .then(response => response.data)
                .then(answer => {
                    console.log( 'answer = ', answer );
                    if ( answer === 'Ok' ) {
                        this.setState({ isDelete: true });
                    }
                })
                .catch(error => console.error(error));

        }
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

    downloadDocument(event) {
        let id = event.currentTarget.getAttribute('data-document-id');

        let pos = id.search( /-/ );

        if ( pos == 8 ) {
            id = id.substr(pos + 1);
        }

        window.open( `/api/document/document-download.php?id=${id}` );
    }

    showOldDocuments(event, id) {
        const document = $(`#document-${id}`);

        const oldDocs = document.parents('.document-container');

        const siblings = oldDocs.find('.document-old');

        let isShow = document.attr( 'data-old-docs-open' );

        if ( isShow === 'true' ){
            siblings.hide();
            document.attr( 'data-old-docs-open', 'false' );
        } else {
            siblings.fadeIn(500);
            document.attr( 'data-old-docs-open', 'true' );
        }

        //Animation.toggleAnimateElement(this.state.isShowContent, document, 'hideMoreInformation', 'showMoreInformation', '500ms');
    }

    replaceDocument(event, deleteObject, callback, path) {
        if (deleteObject.hasOwnProperty('currentDocument')) delete deleteObject.currentDepartment;

        let id = event.currentTarget.getAttribute('data-document-id');

        let newSubStr = '';
        let pos = id.search( /-/ );

        if ( pos == 8 ) {
            id = id.substr(pos + 1);
        }

        const record = {
            id
        };

        callback(record, path);
    }

    searchDocument(event) {
        const inputSearch               = document.querySelector('#sidebar__search_document');
        const inputDateBeginFrom        = document.querySelector('#dateBeginFrom');
        const inputDateBeginTo          = document.querySelector('#dateBeginTo');
        const inputDateSignatureFrom    = document.querySelector('#dateSignatureFrom');
        const inputDateSignatureTo      = document.querySelector('#dateSignatureTo');
        const inputDateEndFrom          = document.querySelector('#dateEndFrom');
        const inputDateEndTo            = document.querySelector('#dateEndTo');

        const user                      = this.props.userData;

        const search = {
            userId: user.id,
            search: inputSearch.value,
            dateBeginFrom: inputDateBeginFrom.value,
            dateBeginTo: inputDateBeginTo.value,
            dateSignatureFrom: inputDateSignatureFrom.value,
            dateSignatureTo: inputDateSignatureTo.value,
            dateEndFrom: inputDateEndFrom.value,
            dateEndTo: inputDateEndTo.value
        };

        console.log('search = ', search);

        this.props.getDocumentsDBBySearch(search);
    }

    render() {
        if (this.props.document.length === 0 ) {
            const user = this.props.userData;
            this.props.getDocumentsDB({ userId: user.id });
        }

        const user = this.props.userData;

        if ( this.state.isDelete === true ) {
            this.props.getDocumentsDB({ userId: user.id });
            this.setState({ isDelete: false });
        }

        let documents           = ObjectHandler.getArrayFromObject(this.props.document),
            typeDocuments       = ObjectHandler.getArrayFromObject(this.props.typeDocument),
            userAndDocuments    = ObjectHandler.getArrayFromObject(this.props.userAndDocuments);

        let documentCountInFolder = {};

        typeDocuments.map( typeDocument => {
            documentCountInFolder[typeDocument.id] = 0;
        } );

        typeDocuments.map( typeDocument => {
            documents.map( document => {
                if ( document.type_id === typeDocument.id && document.document_old === '0' ) {
                    documentCountInFolder[typeDocument.id]++;
                }
            } )
        } );

        let oldDocs = [];

        moment.locale('ru');

        const popoverChange = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>перейдёте на форму изменения документа</strong>
            </Popover>
        );

        const popoverDelete = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>удалите документ</strong>
            </Popover>
        );

        const popoverReplace = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>перейдёте на форму замены документа на новую версию</strong>
            </Popover>
        );

        const popoverAdd = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>перейдёте на страницу добавления ответственного лица (пользователя) к данному документу</strong>
            </Popover>
        );

        const popoverDownLoad = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>скачаете документ на свой компьютер</strong>
            </Popover>
        );

        const popoverUsers = (
            <Popover
                id="popover-trigger-hover-focus"
                title="Подсказка"
            >
                Кликнув по этой иконке Вы <strong>перейдёте на страницу со списком всех ответственных пользователей за этот документ</strong>
            </Popover>
        );

        let docs = '';

        if ( this.state.numberReport === 0 ) {
            { documents.map(document => {
                if ( document.document_old !== '1' ) {
                    docs += document.id + '||';
                }
            } ) };
        } else if ( this.state.numberReport === 1 ) {
            { documents.map(document => {
                if ( document.document_old !== '1' && document.users.length == 3 ) {
                    docs += document.id + '||';
                }
            } ) };
        }

        let link = `../api/report/?docs=${docs}`;

        if ( this.state.reportUsers === true ) {
            link +='&user=';

            userAndDocuments.map(user => {
                link += user.id + '--';
            });

            link += '&userDocs=';

            console.log(link);

            userAndDocuments.map(user => {
                user.documents.map(doc => {
                    link += doc.id + '__';
                });
                link += '---';
            });
        }

        if ( typeof user === 'object' ) {
            if ( user.admin !== '2' ) {
                return (
                    <div>
                        {
                            parseInt(user.id) > 0 ?
                                <div>
                                    <h2 className='documents__header'>Мои документы</h2>

                                    <div className='documents__add-doc-btn_container'>
                                        <Link to={ '/documents/AddDocument' } className={ 'documents__add-doc-btn_link' }>
                                            <Button className={ 'documents__add-doc-btn' } >Добавить документ</Button>
                                        </Link>
                                    </div>

                                    <div className='search_container'>
                                        <h3 className='search'>Поиск</h3>
                                        <Input
                                            placeholder={ 'Название документа' }
                                            inputId={ 'sidebar__search_document' }
                                            onChange={ event => this.searchDocument(event) }
                                            inputClassName={ 'search_input' }
                                        />
                                        <Modal
                                            show={this.state.isReport}
                                            onHide={ () => this.setState({ isReport: false }) }
                                            container={this}
                                            aria-labelledby="contained-modal-title"
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title">Что вы хотите вывести?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p className="modal-par">
                                                    <label
                                                        onClick={ () => {
                                                            this.props.getVisibleDocs(true);
                                                            this.setState({ visibleFolders: this.props.visibleDocs });
                                                        } }
                                                    >
                                                        <input
                                                            name={ 'reportType' }
                                                            type='radio'
                                                            checked={ this.state.numberReport === 0 ? 'checked' : null }
                                                            onClick={ () => this.setState({ numberReport: 0 }) }
                                                        />
                                                        <span>Вывести все документы актуальные документы</span>
                                                    </label>
                                                </p>
                                                <p className="modal-par">
                                                    <label
                                                        onClick={ () => {
                                                            this.props.getVisibleDocs(true);
                                                            this.setState({ visibleFolders: this.props.visibleDocs });
                                                        } }
                                                    >
                                                        <input
                                                            name={ 'reportType' }
                                                            type='radio'
                                                            checked={ this.state.numberReport === 1 ? 'checked' : null }
                                                            onClick={ () => this.setState({ numberReport: 1 }) }
                                                        />
                                                        <span>Вывести документы, за которые ответсвеннен только я</span>
                                                    </label>
                                                </p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <a
                                                    href={ `../api/report/?docs=${docs}`  }
                                                    target='_blank'
                                                    className="documents__generate-report_link"
                                                >
                                                    <Button
                                                        onClick={ () => {
                                                            this.setState({ isReport: false });

                                                        } }
                                                        className={ 'btn-report my-office__btn-update_user-data' }
                                                    >
                                                        Вывести
                                                    </Button>
                                                </a>
                                                <Button
                                                    onClick={ () => this.setState({ isReport: false }) }
                                                    className={ 'my-office__btn-update_user-password' }
                                                >
                                                    Отмена
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Button
                                            className={ 'documents__generate-report' }
                                            onClick={ () => {
                                                this.setState({ isReport: true });
                                            } }
                                        >Сгенерировать отчёт</Button>
                                    </div>

                                    {
                                        this.state.visibleFolders ?
                                            <div>
                                                { typeDocuments.map( typeDocument => {
                                                    return <Folder
                                                        caption={ typeDocument.title + ` (${documentCountInFolder[typeDocument.id]})` }
                                                        key={ typeDocument.id }
                                                        folderId={ 'folder-' + typeDocument.id }>

                                                        { documents.map(document => {
                                                            if ( document.type_id === typeDocument.id ) {
                                                                oldDocs[document.id] = [];
                                                            }
                                                        } ) }

                                                        { documents.map(document => {
                                                            if ( document.type_id === typeDocument.id ) {
                                                                if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                                    if ( document.document_old === '1' ) {
                                                                        oldDocs[ document.old_id ][ document.id ] = document;
                                                                    } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                                        oldDocs[ document.id][ document.id ] = document;
                                                                    }

                                                                } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                                    let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение

                                                                    return (
                                                                        <div className='document-container'>
                                                                            <div className='document-active'>

                                                                                <Document
                                                                                    documentId={ document.id }
                                                                                    key={ document.id }
                                                                                    caption={ document.title + ` (${expansionFile})` }
                                                                                    isReplace={ true }
                                                                                    isAddUser={ true }
                                                                                    isDownload={ true }
                                                                                    isUsers={ true }
                                                                                    onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                    onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                    onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                    onDownload={ event => this.downloadDocument(event) }
                                                                                    onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                    onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                    popoverChange={ popoverChange }
                                                                                    popoverDelete={ popoverDelete }
                                                                                    popoverReplace={ popoverReplace }
                                                                                    popoverAdd={ popoverAdd }
                                                                                    popoverDownload={ popoverDownLoad }
                                                                                    popoverUsers={ popoverUsers }
                                                                                >
                                                                                    <p><span>Полное название документа:</span> { document.path }</p>
                                                                                    <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                    <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                    <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                    <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                    <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                    <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                </Document>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            }

                                                        } ) }

                                                        { documents.map(document => {
                                                            if ( document.type_id === typeDocument.id ) {
                                                                return (
                                                                    <div className='document-container'>
                                                                        {
                                                                            Array.isArray( oldDocs[document.id] ) ?
                                                                                <div className='document-container-for-old-doc'>
                                                                                    { oldDocs[document.id].map( (d, i, arr) => {
                                                                                        let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                                        if ( i !== arr.length - 1 ) {
                                                                                            return (
                                                                                                <div className='document-old'>
                                                                                                    <Document
                                                                                                        documentId={ d.id }
                                                                                                        key={ d.id }
                                                                                                        caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                                        isUpdate={ true }
                                                                                                        isDownload={ true }
                                                                                                        popoverChange={ popoverChange }
                                                                                                        popoverDelete={ popoverDelete }
                                                                                                        popoverReplace={ popoverReplace }
                                                                                                        onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                        popoverAdd={ popoverAdd }
                                                                                                        popoverDownload={ popoverDownLoad }
                                                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                                                    >
                                                                                                        <p><span>Полное название документа:</span> { d.path }</p>
                                                                                                        <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                        <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                                        <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                                        <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                                    </Document>
                                                                                                </div>
                                                                                            );
                                                                                        } else {
                                                                                            return (
                                                                                                <div>
                                                                                                    <div className='document-active'>
                                                                                                        <Document
                                                                                                            documentId={ document.id }
                                                                                                            key={ document.id }
                                                                                                            caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                                            isReplace={ true }
                                                                                                            linkForUpdate={ false }
                                                                                                            onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                            onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                            onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                            onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                                            onDownload={ event => this.downloadDocument(event) }
                                                                                                            onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                            onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                            oldDocsIsOpen={ false }
                                                                                                            isAddUser={ true }
                                                                                                            isDownload={ true }
                                                                                                            isUsers={ true }
                                                                                                            popoverChange={ popoverChange }
                                                                                                            popoverDelete={ popoverDelete }
                                                                                                            popoverReplace={ popoverReplace }
                                                                                                            popoverAdd={ popoverAdd }
                                                                                                            popoverDownload={ popoverDownLoad }
                                                                                                            popoverUsers={ popoverUsers }
                                                                                                        >
                                                                                                            <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                            <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                            <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                            <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                            <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                            <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                            <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                        </Document>
                                                                                                    </div>
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    } ) }
                                                                                </div>
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        } ) }
                                                    </Folder>
                                                } ) }

                                                { documents.map(document => {
                                                    if ( document.type_id === '0' ) {
                                                        oldDocs[document.id] = [];
                                                    }
                                                } ) }

                                                { documents.map(document => {
                                                    if ( document.type_id === '0' ) {
                                                        if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                            if ( document.document_old === '1' ) {
                                                                oldDocs[ document.old_id ][ document.id ] = document;
                                                            } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                                oldDocs[ document.id][ document.id ] = document;
                                                            }

                                                        } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                            let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение
                                                            return (
                                                                <div className='document-container'>
                                                                    <div className='document-active'>
                                                                        <Document
                                                                            documentId={ document.id }
                                                                            key={ document.id }
                                                                            caption={ document.title + ` (${expansionFile})` }
                                                                            isReplace={ true }
                                                                            isAddUser={ true }
                                                                            isDownload={ true }
                                                                            isUsers={ true }
                                                                            onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                            onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                            onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                            onDownload={ event => this.downloadDocument(event) }
                                                                            onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                            onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                            popoverChange={ popoverChange }
                                                                            popoverDelete={ popoverDelete }
                                                                            popoverReplace={ popoverReplace }
                                                                            popoverAdd={ popoverAdd }
                                                                            popoverDownload={ popoverDownLoad }
                                                                            popoverUsers={ popoverUsers }
                                                                        >
                                                                            <p><span>Полное название документа:</span> { document.path }</p>
                                                                            <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                            <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                            <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                            <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                            <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                            <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                        </Document>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                } ) }

                                                { documents.map(document => {
                                                    if ( document.type_id === '0' ) {
                                                        return (
                                                            <div className='document-container'>
                                                                {
                                                                    Array.isArray( oldDocs[document.id] ) ?
                                                                        <div className='document-container-for-old-doc'>
                                                                            { oldDocs[document.id].map( (d, i, arr) => {
                                                                                let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                                if ( i !== arr.length - 1 ) {
                                                                                    return (
                                                                                        <div className='document-old'>
                                                                                            <Document
                                                                                                documentId={ d.id }
                                                                                                key={ d.id }
                                                                                                caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                                isUpdate={ true }
                                                                                                isDownload={ true }
                                                                                                onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                popoverChange={ popoverChange }
                                                                                                popoverDelete={ popoverDelete }
                                                                                                popoverReplace={ popoverReplace }
                                                                                                popoverAdd={ popoverAdd }
                                                                                                popoverDownload={ popoverDownLoad }
                                                                                                onDownload={ event => this.downloadDocument(event) }
                                                                                            >
                                                                                                <p><span>Полное название документа:</span> { d.path }</p>
                                                                                                <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                                <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                                <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                                <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                            </Document>
                                                                                        </div>
                                                                                    );
                                                                                } else {
                                                                                    return (
                                                                                        <div className='document-active'>
                                                                                            <Document
                                                                                                documentId={ document.id }
                                                                                                key={ document.id }
                                                                                                caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                                isReplace={ true }
                                                                                                linkForUpdate={ false }
                                                                                                isUsers={ true }
                                                                                                onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                                onDownload={ event => this.downloadDocument(event) }
                                                                                                oldDocsIsOpen={ false }
                                                                                                onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                isAddUser={ true }
                                                                                                isDownload={ true }
                                                                                                popoverChange={ popoverChange }
                                                                                                popoverDelete={ popoverDelete }
                                                                                                popoverReplace={ popoverReplace }
                                                                                                popoverAdd={ popoverAdd }
                                                                                                popoverDownload={ popoverDownLoad }
                                                                                                popoverUsers={ popoverUsers }
                                                                                            >
                                                                                                <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                            </Document>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            } ) }
                                                                        </div>
                                                                        :
                                                                        null
                                                                }
                                                            </div>
                                                        );
                                                    }
                                                } ) }
                                            </div>
                                            :
                                            <div>
                                                { documents.map(document => {
                                                    oldDocs[document.id] = [];
                                                } ) }

                                                { documents.map(document => {
                                                    if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                        if ( document.document_old === '1' ) {
                                                            oldDocs[ document.old_id ][ document.id ] = document;
                                                        } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                            oldDocs[ document.id][ document.id ] = document;
                                                        }

                                                    } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                        let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение
                                                        return (
                                                            <div className='document-container'>
                                                                <div className='document-active'>
                                                                    <Document
                                                                        documentId={ document.id }
                                                                        key={ document.id }
                                                                        caption={ document.title + ` (${expansionFile})` }
                                                                        isReplace={ true }
                                                                        isAddUser={ true }
                                                                        isDownload={ true }
                                                                        isUsers={ true }
                                                                        onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                        onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                        onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                        onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                        onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                        popoverChange={ popoverChange }
                                                                        popoverDelete={ popoverDelete }
                                                                        popoverReplace={ popoverReplace }
                                                                        popoverAdd={ popoverAdd }
                                                                        popoverDownload={ popoverDownLoad }
                                                                        popoverUsers={ popoverUsers }
                                                                    >
                                                                        <p><span>Полное название документа:</span> { document.path }</p>
                                                                        <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                        <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                        <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                        <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                    </Document>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                } ) }

                                                { documents.map(document => {
                                                    return (
                                                        <div className='document-container'>
                                                            {
                                                                Array.isArray( oldDocs[document.id] ) ?
                                                                    <div className='document-container-for-old-doc'>
                                                                        { oldDocs[document.id].map( (d, i, arr) => {
                                                                            let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                            if ( i !== arr.length - 1 ) {
                                                                                return (
                                                                                    <div className='document-old'>
                                                                                        <Document
                                                                                            documentId={ d.id }
                                                                                            key={ d.id }
                                                                                            caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                            isUpdate={ true }
                                                                                            onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                            isDownload={ true }
                                                                                            popoverChange={ popoverChange }
                                                                                            popoverDelete={ popoverDelete }
                                                                                            popoverReplace={ popoverReplace }
                                                                                            popoverAdd={ popoverAdd }
                                                                                            popoverDownload={ popoverDownLoad }
                                                                                            onDownload={ event => this.downloadDocument(event) }
                                                                                        >
                                                                                            <p><span>Полное название документа:</span> { d.path }</p>
                                                                                            <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                            <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                            <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                            <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                            <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                            <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                        </Document>
                                                                                    </div>
                                                                                );
                                                                            } else {
                                                                                return (
                                                                                    <div className='document-active'>
                                                                                        <Document
                                                                                            documentId={ document.id }
                                                                                            key={ document.id }
                                                                                            caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                            isReplace={ true }
                                                                                            linkForUpdate={ false }
                                                                                            isUsers={ true }
                                                                                            onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                            onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                            onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                            onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                            onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                            onDownload={ event => this.downloadDocument(event) }
                                                                                            oldDocsIsOpen={ false }
                                                                                            onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                            isAddUser={ true }
                                                                                            isDownload={ true }
                                                                                            popoverChange={ popoverChange }
                                                                                            popoverDelete={ popoverDelete }
                                                                                            popoverReplace={ popoverReplace }
                                                                                            popoverAdd={ popoverAdd }
                                                                                            popoverDownload={ popoverDownLoad }
                                                                                            popoverUsers={ popoverUsers }
                                                                                        >
                                                                                            <p><span>Полное название документа:</span> { document.path }</p>
                                                                                            <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                            <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                            <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                            <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                            <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                            <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                        </Document>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        } ) }
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                    );
                                                } ) }
                                            </div>
                                    }

                                    <SideBar
                                        isOpen={ this.state.isOpenSideBar }
                                        onOpenSideBar={ this.openSideBar }
                                    >
                                        <h3 className='sidebar__caption'>Действия над документами</h3>

                                        <div className='sidebar__filter_container'>
                                            <h3 className='sidebar__caption sidebar__filter'>Отображение</h3>
                                            <i
                                                className='sidebar__filter_icon glyphicon glyphicon glyphicon-eye-open'
                                                onClick={ this.openSideBar }
                                            ></i>
                                        </div>

                                        <div className='sidebar__visiblity'>
                                            <p className="sidebar__visiblity_par">
                                                <label
                                                    onClick={ () => {
                                                        this.props.getVisibleDocs(true);
                                                        this.setState({ visibleFolders: this.props.visibleDocs });
                                                    } }
                                                >
                                                    <input
                                                        name={ 'visiblityType' }
                                                        type='radio'
                                                        checked={ this.state.visibleFolders ? 'checked' : null }

                                                    />
                                                    <span>Отображать типы документов</span>
                                                </label>
                                            </p>
                                            <p className="sidebar__visiblity_par">
                                                <label
                                                    onClick={ () => {
                                                        this.props.getVisibleDocs(false);
                                                        this.setState({ visibleFolders: this.props.visibleDocs });
                                                    } }
                                                >
                                                    <input
                                                        name={ 'visiblityType' }
                                                        type='radio'
                                                        checked={ this.state.visibleFolders ? null : 'checked' }
                                                    />
                                                    <span>Не отображать типы документов</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className='sidebar__filter_container'>
                                            <h3 className='sidebar__caption sidebar__filter'>Фильтрация</h3>
                                            <i
                                                className='sidebar__filter_icon glyphicon glyphicon-filter'
                                                onClick={ this.openSideBar }
                                            ></i>
                                        </div>
                                        <div className='sidebar__filter_item-container'>
                                            <div className='sidebar__filter-date'>
                                                <div className='sidebar__filter-date_container'>
                                                    <h4 className='sidebar__caption'>По дате добавления</h4>
                                                    <p>Начиная
                                                        с даты:</p>
                                                    <Input
                                                        inputId={ 'dateBeginFrom' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                    <p>Заканчивая датой:</p>
                                                    <Input
                                                        inputId={ 'dateBeginTo' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                </div>
                                                <div className='sidebar__filter-date_container'>
                                                    <h4 className='sidebar__caption'>По дате подписания</h4>
                                                    <p>Начиная с даты:</p>
                                                    <Input
                                                        inputId={ 'dateSignatureFrom' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                    <p>Заканчивая датой:</p>
                                                    <Input
                                                        inputId={ 'dateSignatureTo' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                </div>
                                                <div className='sidebar__filter-date_container'>
                                                    <h4 className='sidebar__caption'>По дате пересмотра</h4>
                                                    <p>Начиная с даты:</p>
                                                    <Input
                                                        inputId={ 'dateEndFrom' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                    <p>Заканчивая датой:</p>
                                                    <Input
                                                        inputId={ 'dateEndTo' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </SideBar>
                                </div>
                                :
                                <CenterScreenBlock>
                                    <h2>
                                        Вы ещё не были авторизированы в приложении.<br/>
                                        Если у Вас действительно имеется аккаунт,<br/>
                                        пожалуйста, авторизируйтесь.<br/>
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
            } else { // Начальник отдела
                return (
                    <div>
                        {
                            parseInt(user.id) > 0 ?
                                <div>
                                    <h2 className='documents__header'>Мои документы</h2>

                                    <div className='documents__add-doc-btn_container'>
                                        <Link to={ '/documents/AddDocument' } className={ 'documents__add-doc-btn_link' }>
                                            <Button className={ 'documents__add-doc-btn' } >Добавить документ</Button>
                                        </Link>
                                    </div>

                                    <div className='search_container'>
                                        <h3 className='search'>Поиск</h3>
                                        <Input
                                            placeholder={ 'Название документа' }
                                            inputId={ 'sidebar__search_document' }
                                            onChange={ event => this.searchDocument(event) }
                                            inputClassName={ 'search_input' }
                                        />
                                        <Modal
                                            show={this.state.isReport}
                                            onHide={ () => this.setState({ isReport: false }) }
                                            container={this}
                                            aria-labelledby="contained-modal-title"
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title">Что вы хотите вывести?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p className="modal-par">
                                                    <label
                                                        onClick={ () => {
                                                            this.props.getVisibleDocs(true);
                                                            this.setState({ visibleFolders: this.props.visibleDocs });
                                                        } }
                                                    >
                                                        <input
                                                            name={ 'reportType' }
                                                            type='radio'
                                                            checked={ this.state.numberReport === 0 ? 'checked' : null }
                                                            onClick={ () => this.setState({ numberReport: 0 }) }
                                                        />
                                                        <span>Вывести все документы актуальные документы</span>
                                                    </label>
                                                </p>
                                                <p className="modal-par">
                                                    <label
                                                        onClick={ () => {
                                                            this.props.getVisibleDocs(true);
                                                            this.setState({ visibleFolders: this.props.visibleDocs });
                                                        } }
                                                    >
                                                        <input
                                                            name={ 'reportType' }
                                                            type='radio'
                                                            checked={ this.state.numberReport === 1 ? 'checked' : null }
                                                            onClick={ () => this.setState({ numberReport: 1 }) }
                                                        />
                                                        <span>Вывести документы, за которые ответсвеннен только я</span>
                                                    </label>
                                                </p>

                                                <hr className="horiz-line"/>

                                                <p className="modal-par">
                                                    <label
                                                        onClick={ () => {
                                                            if ( this.state.reportUsers === false ) {
                                                                this.setState({ reportUsers: true });
                                                            } else {
                                                                this.setState({ reportUsers: false });
                                                            }
                                                        } }
                                                    >
                                                        <input
                                                            name={ 'reportUser' }
                                                            type='checkbox'
                                                            checked={ this.state.reportUsers === true ? 'checked' : null }
                                                            onClick={ () => {
                                                                if ( this.state.reportUsers === false ) {
                                                                    this.setState({ reportUsers: true });
                                                                } else {
                                                                    this.setState({ reportUsers: false });
                                                                }
                                                            } }
                                                        />
                                                        <span>Вывести документы сотрудников моего отдела</span>
                                                    </label>
                                                </p>

                                            </Modal.Body>
                                            <Modal.Footer>
                                                <a
                                                    href={ link }
                                                    target='_blank'
                                                    className="documents__generate-report_link"
                                                >
                                                    <Button
                                                        onClick={ () => {
                                                            this.setState({ isReport: false });

                                                        } }
                                                        className={ 'btn-report my-office__btn-update_user-data' }
                                                    >
                                                        Вывести
                                                    </Button>
                                                </a>
                                                <Button
                                                    onClick={ () => this.setState({ isReport: false }) }
                                                    className={ 'my-office__btn-update_user-password' }
                                                >
                                                    Отмена
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Button
                                            className={ 'documents__generate-report' }
                                            onClick={ () => {
                                                this.setState({ isReport: true });
                                            } }
                                        >Сгенерировать отчёт</Button>
                                    </div>

                                    {
                                        this.state.isShowUsers ?
                                            <div>
                                                {
                                                    this.state.visibleFolders ?
                                                        <div>
                                                            <div className="docs-caption">
                                                                <h3>Мои документы</h3>
                                                            </div>

                                                            { typeDocuments.map( typeDocument => {
                                                                return <Folder
                                                                    caption={ typeDocument.title + ` (${documentCountInFolder[typeDocument.id]})` }
                                                                    key={ typeDocument.id }
                                                                    folderId={ 'folder-' + typeDocument.id }>

                                                                    { documents.map(document => {
                                                                        if ( document.type_id === typeDocument.id ) {
                                                                            oldDocs[document.id] = [];
                                                                        }
                                                                    } ) }

                                                                    { documents.map(document => {
                                                                        if ( document.type_id === typeDocument.id ) {
                                                                            if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                                                if ( document.document_old === '1' ) {
                                                                                    oldDocs[ document.old_id ][ document.id ] = document;
                                                                                } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                                                    oldDocs[ document.id][ document.id ] = document;
                                                                                }

                                                                            } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                                                let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение

                                                                                return (
                                                                                    <div className='document-container'>
                                                                                        <div className='document-active'>

                                                                                            <Document
                                                                                                documentId={ document.id }
                                                                                                key={ document.id }
                                                                                                caption={ document.title + ` (${expansionFile})` }
                                                                                                isReplace={ true }
                                                                                                isAddUser={ true }
                                                                                                isDownload={ true }
                                                                                                isUsers={ true }
                                                                                                onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                onDownload={ event => this.downloadDocument(event) }
                                                                                                onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                popoverChange={ popoverChange }
                                                                                                popoverDelete={ popoverDelete }
                                                                                                popoverReplace={ popoverReplace }
                                                                                                popoverAdd={ popoverAdd }
                                                                                                popoverDownload={ popoverDownLoad }
                                                                                                popoverUsers={ popoverUsers }
                                                                                            >
                                                                                                <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                            </Document>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }

                                                                    } ) }

                                                                    { documents.map(document => {
                                                                        if ( document.type_id === typeDocument.id ) {
                                                                            return (
                                                                                <div className='document-container'>
                                                                                    {
                                                                                        Array.isArray( oldDocs[document.id] ) ?
                                                                                            <div className='document-container-for-old-doc'>
                                                                                                { oldDocs[document.id].map( (d, i, arr) => {
                                                                                                    let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                                                    if ( i !== arr.length - 1 ) {
                                                                                                        return (
                                                                                                            <div className='document-old'>
                                                                                                                <Document
                                                                                                                    documentId={ d.id }
                                                                                                                    key={ d.id }
                                                                                                                    caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                                                    isUpdate={ true }
                                                                                                                    isDownload={ true }
                                                                                                                    onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                                    popoverChange={ popoverChange }
                                                                                                                    popoverDelete={ popoverDelete }
                                                                                                                    popoverReplace={ popoverReplace }
                                                                                                                    popoverAdd={ popoverAdd }
                                                                                                                    popoverDownload={ popoverDownLoad }
                                                                                                                    onDownload={ event => this.downloadDocument(event) }
                                                                                                                >
                                                                                                                    <p><span>Полное название документа:</span> { d.path }</p>
                                                                                                                    <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                                                    <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                    <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                    <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                                                    <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                                                    <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                                                </Document>
                                                                                                            </div>
                                                                                                        );
                                                                                                    } else {
                                                                                                        return (
                                                                                                            <div>
                                                                                                                <div className='document-active'>
                                                                                                                    <Document
                                                                                                                        documentId={ document.id }
                                                                                                                        key={ document.id }
                                                                                                                        caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                                                        isReplace={ true }
                                                                                                                        linkForUpdate={ false }
                                                                                                                        onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                                        onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                                        onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                                        onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                                        onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                                                                        onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                                        oldDocsIsOpen={ false }
                                                                                                                        isAddUser={ true }
                                                                                                                        isDownload={ true }
                                                                                                                        isUsers={ true }
                                                                                                                        popoverChange={ popoverChange }
                                                                                                                        popoverDelete={ popoverDelete }
                                                                                                                        popoverReplace={ popoverReplace }
                                                                                                                        popoverAdd={ popoverAdd }
                                                                                                                        popoverDownload={ popoverDownLoad }
                                                                                                                        popoverUsers={ popoverUsers }
                                                                                                                    >
                                                                                                                        <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                                        <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                        <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                                        <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                                        <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                                    </Document>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        );
                                                                                                    }
                                                                                                } ) }
                                                                                            </div>
                                                                                            :
                                                                                            null
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    } ) }
                                                                </Folder>
                                                            } ) }

                                                            { documents.map(document => {
                                                                if ( document.type_id === '0' ) {
                                                                    oldDocs[document.id] = [];
                                                                }
                                                            } ) }

                                                            { documents.map(document => {
                                                                if ( document.type_id === '0' ) {
                                                                    if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                                        if ( document.document_old === '1' ) {
                                                                            oldDocs[ document.old_id ][ document.id ] = document;
                                                                        } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                                            oldDocs[ document.id][ document.id ] = document;
                                                                        }

                                                                    } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                                        let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение
                                                                        return (
                                                                            <div className='document-container'>
                                                                                <div className='document-active'>
                                                                                    <Document
                                                                                        documentId={ document.id }
                                                                                        key={ document.id }
                                                                                        caption={ document.title + ` (${expansionFile})` }
                                                                                        isReplace={ true }
                                                                                        isAddUser={ true }
                                                                                        isDownload={ true }
                                                                                        isUsers={ true }
                                                                                        onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                        onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                        onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                        onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                                        onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                        popoverChange={ popoverChange }
                                                                                        popoverDelete={ popoverDelete }
                                                                                        popoverReplace={ popoverReplace }
                                                                                        popoverAdd={ popoverAdd }
                                                                                        popoverDownload={ popoverDownLoad }
                                                                                        popoverUsers={ popoverUsers }
                                                                                    >
                                                                                        <p><span>Полное название документа:</span> { document.path }</p>
                                                                                        <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                        <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                        <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                        <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                    </Document>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                }
                                                            } ) }

                                                            { documents.map(document => {
                                                                if ( document.type_id === '0' ) {
                                                                    return (
                                                                        <div className='document-container'>
                                                                            {
                                                                                Array.isArray( oldDocs[document.id] ) ?
                                                                                    <div className='document-container-for-old-doc'>
                                                                                        { oldDocs[document.id].map( (d, i, arr) => {
                                                                                            let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                                            if ( i !== arr.length - 1 ) {
                                                                                                return (
                                                                                                    <div className='document-old'>
                                                                                                        <Document
                                                                                                            documentId={ d.id }
                                                                                                            key={ d.id }
                                                                                                            caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                                            isUpdate={ true }
                                                                                                            onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                            isDownload={ true }
                                                                                                            popoverChange={ popoverChange }
                                                                                                            popoverDelete={ popoverDelete }
                                                                                                            popoverReplace={ popoverReplace }
                                                                                                            popoverAdd={ popoverAdd }
                                                                                                            popoverDownload={ popoverDownLoad }
                                                                                                            onDownload={ event => this.downloadDocument(event) }
                                                                                                        >
                                                                                                            <p><span>Полное название документа:</span> { d.path }</p>
                                                                                                            <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                                            <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                            <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                            <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                                            <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                                            <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                                        </Document>
                                                                                                    </div>
                                                                                                );
                                                                                            } else {
                                                                                                return (
                                                                                                    <div className='document-active'>
                                                                                                        <Document
                                                                                                            documentId={ document.id }
                                                                                                            key={ document.id }
                                                                                                            caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                                            isReplace={ true }
                                                                                                            linkForUpdate={ false }
                                                                                                            isUsers={ true }
                                                                                                            onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                            onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                            onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                            onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                            onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                                            onDownload={ event => this.downloadDocument(event) }
                                                                                                            oldDocsIsOpen={ false }
                                                                                                            onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                            isAddUser={ true }
                                                                                                            isDownload={ true }
                                                                                                            popoverChange={ popoverChange }
                                                                                                            popoverDelete={ popoverDelete }
                                                                                                            popoverReplace={ popoverReplace }
                                                                                                            popoverAdd={ popoverAdd }
                                                                                                            popoverDownload={ popoverDownLoad }
                                                                                                            popoverUsers={ popoverUsers }
                                                                                                        >
                                                                                                            <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                            <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                            <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                            <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                            <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                            <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                            <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                        </Document>
                                                                                                    </div>
                                                                                                );
                                                                                            }
                                                                                        } ) }
                                                                                    </div>
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </div>
                                                                    );
                                                                }
                                                            } ) }
                                                        </div>
                                                        :
                                                        <div>
                                                            { documents.map(document => {
                                                                oldDocs[document.id] = [];
                                                            } ) }

                                                            { documents.map(document => {
                                                                if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                                    if ( document.document_old === '1' ) {
                                                                        oldDocs[ document.old_id ][ document.id ] = document;
                                                                    } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                                        oldDocs[ document.id][ document.id ] = document;
                                                                    }

                                                                } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                                    let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение
                                                                    return (
                                                                        <div className='document-container'>
                                                                            <div className='document-active'>
                                                                                <Document
                                                                                    documentId={ document.id }
                                                                                    key={ document.id }
                                                                                    caption={ document.title + ` (${expansionFile})` }
                                                                                    isReplace={ true }
                                                                                    isAddUser={ true }
                                                                                    isDownload={ true }
                                                                                    isUsers={ true }
                                                                                    onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                    onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                    onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                    onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                    onDownload={ event => this.downloadDocument(event) }
                                                                                    onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                    popoverChange={ popoverChange }
                                                                                    popoverDelete={ popoverDelete }
                                                                                    popoverReplace={ popoverReplace }
                                                                                    popoverAdd={ popoverAdd }
                                                                                    popoverDownload={ popoverDownLoad }
                                                                                    popoverUsers={ popoverUsers }
                                                                                >
                                                                                    <p><span>Полное название документа:</span> { document.path }</p>
                                                                                    <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                    <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                    <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                    <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                    <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                    <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                </Document>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            } ) }

                                                            { documents.map(document => {
                                                                return (
                                                                    <div className='document-container'>
                                                                        {
                                                                            Array.isArray( oldDocs[document.id] ) ?
                                                                                <div className='document-container-for-old-doc'>
                                                                                    { oldDocs[document.id].map( (d, i, arr) => {
                                                                                        let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                                        if ( i !== arr.length - 1 ) {
                                                                                            return (
                                                                                                <div className='document-old'>
                                                                                                    <Document
                                                                                                        documentId={ d.id }
                                                                                                        key={ d.id }
                                                                                                        caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                                        isUpdate={ true }
                                                                                                        isDownload={ true }
                                                                                                        onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                        popoverChange={ popoverChange }
                                                                                                        popoverDelete={ popoverDelete }
                                                                                                        popoverReplace={ popoverReplace }
                                                                                                        popoverAdd={ popoverAdd }
                                                                                                        popoverDownload={ popoverDownLoad }
                                                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                                                    >
                                                                                                        <p><span>Полное название документа:</span> { d.path }</p>
                                                                                                        <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                        <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                                        <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                                        <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                                    </Document>
                                                                                                </div>
                                                                                            );
                                                                                        } else {
                                                                                            return (
                                                                                                <div className='document-active'>
                                                                                                    <Document
                                                                                                        documentId={ document.id }
                                                                                                        key={ document.id }
                                                                                                        caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                                        isReplace={ true }
                                                                                                        linkForUpdate={ false }
                                                                                                        isUsers={ true }
                                                                                                        onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                        onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                        onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                        onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                        onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                                                        oldDocsIsOpen={ false }
                                                                                                        onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                        isAddUser={ true }
                                                                                                        isDownload={ true }
                                                                                                        popoverChange={ popoverChange }
                                                                                                        popoverDelete={ popoverDelete }
                                                                                                        popoverReplace={ popoverReplace }
                                                                                                        popoverAdd={ popoverAdd }
                                                                                                        popoverDownload={ popoverDownLoad }
                                                                                                        popoverUsers={ popoverUsers }
                                                                                                    >
                                                                                                        <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                        <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                        <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                        <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                        <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                    </Document>
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    } ) }
                                                                                </div>
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                );
                                                            } ) }
                                                        </div>
                                                }
                                            </div>
                                            :
                                            <div>
                                                {
                                                    this.state.visibleFolders ?
                                                        <div>
                                                            <div>
                                                                <div className="docs-caption">
                                                                    <h3>Документы пользователей из моего отдела</h3>
                                                                </div>
                                                                { userAndDocuments.map(userDoc => {
                                                                    if ( userDoc.id !== user.id ) {
                                                                        docs = ObjectHandler.getArrayFromObject(userDoc.documents);

                                                                        let documentCountInFolderUser = {};

                                                                        typeDocuments.map( typeDocument => {
                                                                            documentCountInFolderUser[typeDocument.id] = 0;
                                                                        } );

                                                                        typeDocuments.map( typeDocument => {
                                                                            docs.map( document => {
                                                                                if ( document.type_id === typeDocument.id && document.document_old === '0' ) {
                                                                                    documentCountInFolderUser[typeDocument.id]++;
                                                                                }
                                                                            } )
                                                                        } );
                                                                        return (
                                                                            <div className='user-list'>
                                                                                <div className='user-list__card'>
                                                                                    <Document
                                                                                        documentId={ 'user-' + userDoc.id }
                                                                                        key={ userDoc.id }
                                                                                        caption={ `${userDoc.surname} ${userDoc.name} ${userDoc.middlename}` }
                                                                                        isUpdate={ true }
                                                                                        isNotDelete={ true }
                                                                                        isUserIcon={ true }
                                                                                        userIcon={ <img src={ userDoc.photo }
                                                                                                        alt='Фото пользователя'
                                                                                                        className='user-list__card_photo'
                                                                                        /> }
                                                                                    >
                                                                                        <p><span>Email пользователя:</span> { userDoc.email }</p>
                                                                                        <p><span>Отдел пользователя:</span> { userDoc.department }</p>
                                                                                        <p><span>Должность пользователя:</span> { userDoc.position }</p>

                                                                                        { typeDocuments.map( typeDocument => {
                                                                                            return <Folder
                                                                                                caption={ typeDocument.title + ` (${documentCountInFolderUser[typeDocument.id]})` }
                                                                                                key={ typeDocument.id }
                                                                                                folderId={ 'folder-user' + typeDocument.id }>

                                                                                                { userDoc.documents.map(document => {
                                                                                                    if ( document.type_id === typeDocument.id ) {
                                                                                                        oldDocs[document.id] = [];
                                                                                                    }
                                                                                                } ) }

                                                                                                { userDoc.documents.map(document => {
                                                                                                    if ( document.type_id === typeDocument.id ) {
                                                                                                        if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                                                                            if ( document.document_old === '1' ) {
                                                                                                                oldDocs[ document.old_id ][ document.id ] = document;
                                                                                                            } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                                                                                oldDocs[ document.id][ document.id ] = document;
                                                                                                            }

                                                                                                        } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                                                                            let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение

                                                                                                            return (
                                                                                                                <div className='document-container'>
                                                                                                                    <div className='document-active'>

                                                                                                                        <Document
                                                                                                                            documentId={ 'document-' + document.id }
                                                                                                                            key={ document.id }
                                                                                                                            caption={ document.title + ` (${expansionFile})` }
                                                                                                                            isDownload={ true }
                                                                                                                            isUsers={ true }
                                                                                                                            isNotDelete={ true }
                                                                                                                            isUpdate={ true }
                                                                                                                            onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                                            onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                                            onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                                            onDownload={ event => this.downloadDocument(event) }
                                                                                                                            onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                                            popoverDownload={ popoverDownLoad }
                                                                                                                            popoverUsers={ popoverUsers }
                                                                                                                        >
                                                                                                                            <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                                            <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                                            <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                            <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                            <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                                            <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                                            <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                                        </Document>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            )
                                                                                                        }
                                                                                                    }

                                                                                                } ) }

                                                                                                { userDoc.documents.map(document => {
                                                                                                    if ( document.type_id === typeDocument.id ) {
                                                                                                        return (
                                                                                                            <div className='document-container'>
                                                                                                                {
                                                                                                                    Array.isArray( oldDocs[document.id] ) ?
                                                                                                                        <div className='document-container-for-old-doc'>
                                                                                                                            { oldDocs[document.id].map( (d, i, arr) => {
                                                                                                                                let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                                                                                if ( i !== arr.length - 1 ) {
                                                                                                                                    return (
                                                                                                                                        <div className='document-old'>
                                                                                                                                            <Document
                                                                                                                                                documentId={ 'document-' + d.id }
                                                                                                                                                key={ d.id }
                                                                                                                                                caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                                                                                isDownload={ true }
                                                                                                                                                isNotDelete={ true }
                                                                                                                                                isUpdate={ true }
                                                                                                                                                popoverDownload={ popoverDownLoad }
                                                                                                                                                onDownload={ event => this.downloadDocument(event) }
                                                                                                                                            >
                                                                                                                                                <p><span>Полное название документа:</span> { d.path }</p>
                                                                                                                                                <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                                                                                <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                                                <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                                                <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                                                                                <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                                                                                <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                                                                            </Document>
                                                                                                                                        </div>
                                                                                                                                    );
                                                                                                                                } else {
                                                                                                                                    return (
                                                                                                                                        <div>
                                                                                                                                            <div className='document-active'>
                                                                                                                                                <Document
                                                                                                                                                    documentId={ 'document-' + document.id }
                                                                                                                                                    key={ document.id }
                                                                                                                                                    caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                                                                                    onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                                                                    onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                                                                    onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                                                                    onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                                                                                    onDownload={ event => this.downloadDocument(event) }
                                                                                                                                                    onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                                                                    oldDocsIsOpen={ false }
                                                                                                                                                    isNotDelete={ true }
                                                                                                                                                    isUpdate={ true }
                                                                                                                                                    isUsers={ true }
                                                                                                                                                    popoverDownload={ popoverDownLoad }
                                                                                                                                                    popoverUsers={ popoverUsers }
                                                                                                                                                >
                                                                                                                                                    <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                                                                    <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                                                                    <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                                                    <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                                                    <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                                                                    <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                                                                    <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                                                                </Document>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    );
                                                                                                                                }
                                                                                                                            } ) }
                                                                                                                        </div>
                                                                                                                        :
                                                                                                                        null
                                                                                                                }
                                                                                                            </div>
                                                                                                        );
                                                                                                    }
                                                                                                } ) }
                                                                                            </Folder>
                                                                                        } ) }

                                                                                        { userDoc.documents.map(document => {
                                                                                            if ( document.type_id === '0' ) {
                                                                                                oldDocs[document.id] = [];
                                                                                            }
                                                                                        } ) }

                                                                                        { userDoc.documents.map(document => {
                                                                                            if ( document.type_id === '0' ) {
                                                                                                if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                                                                    if ( document.document_old === '1' ) {
                                                                                                        oldDocs[ document.old_id ][ document.id ] = document;
                                                                                                    } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                                                                        oldDocs[ document.id][ document.id ] = document;
                                                                                                    }

                                                                                                } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                                                                    let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение
                                                                                                    return (
                                                                                                        <div className='document-container'>
                                                                                                            <div className='document-active'>
                                                                                                                <Document
                                                                                                                    documentId={ 'document-' + document.id }
                                                                                                                    key={ document.id }
                                                                                                                    caption={ document.title + ` (${expansionFile})` }
                                                                                                                    isDownload={ true }
                                                                                                                    isUsers={ true }
                                                                                                                    isNotDelete={ true }
                                                                                                                    isUpdate={ true }
                                                                                                                    onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                                    onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                                    onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                                    onDownload={ event => this.downloadDocument(event) }
                                                                                                                    onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                                    popoverChange={ popoverChange }
                                                                                                                    popoverDelete={ popoverDelete }
                                                                                                                    popoverReplace={ popoverReplace }
                                                                                                                    popoverAdd={ popoverAdd }
                                                                                                                    popoverDownload={ popoverDownLoad }
                                                                                                                    popoverUsers={ popoverUsers }
                                                                                                                >
                                                                                                                    <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                                    <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                                    <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                    <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                    <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                                    <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                                    <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                                </Document>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                }
                                                                                            }
                                                                                        } ) }

                                                                                        { userDoc.documents.map(document => {
                                                                                            if ( document.type_id === '0' ) {
                                                                                                return (
                                                                                                    <div className='document-container'>
                                                                                                        {
                                                                                                            Array.isArray( oldDocs[document.id] ) ?
                                                                                                                <div className='document-container-for-old-doc'>
                                                                                                                    { oldDocs[document.id].map( (d, i, arr) => {
                                                                                                                        let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                                                                        if ( i !== arr.length - 1 ) {
                                                                                                                            return (
                                                                                                                                <div className='document-old'>
                                                                                                                                    <Document
                                                                                                                                        documentId={ 'document-' + d.id }
                                                                                                                                        key={ d.id }
                                                                                                                                        caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                                                                        isDownload={ true }
                                                                                                                                        isNotDelete={ true }
                                                                                                                                        isUpdate={ true }
                                                                                                                                        popoverChange={ popoverChange }
                                                                                                                                        popoverDelete={ popoverDelete }
                                                                                                                                        popoverReplace={ popoverReplace }
                                                                                                                                        popoverAdd={ popoverAdd }
                                                                                                                                        popoverDownload={ popoverDownLoad }
                                                                                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                                                                                    >
                                                                                                                                        <p><span>Полное название документа:</span> { d.path }</p>
                                                                                                                                        <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                                        <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                                                                        <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                                                                        <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                                                                    </Document>
                                                                                                                                </div>
                                                                                                                            );
                                                                                                                        } else {
                                                                                                                            return (
                                                                                                                                <div className='document-active'>
                                                                                                                                    <Document
                                                                                                                                        documentId={ 'document-' + document.id }
                                                                                                                                        key={ document.id }
                                                                                                                                        caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                                                                        isUsers={ true }
                                                                                                                                        isNotDelete={ true }
                                                                                                                                        isUpdate={ true }
                                                                                                                                        onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                                                        onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                                                        onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                                                        onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                                                                                        oldDocsIsOpen={ false }
                                                                                                                                        onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                                                        isDownload={ true }
                                                                                                                                        popoverChange={ popoverChange }
                                                                                                                                        popoverDelete={ popoverDelete }
                                                                                                                                        popoverReplace={ popoverReplace }
                                                                                                                                        popoverAdd={ popoverAdd }
                                                                                                                                        popoverDownload={ popoverDownLoad }
                                                                                                                                        popoverUsers={ popoverUsers }
                                                                                                                                    >
                                                                                                                                        <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                                                        <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                                        <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                                                        <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                                                        <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                                                    </Document>
                                                                                                                                </div>
                                                                                                                            );
                                                                                                                        }
                                                                                                                    } ) }
                                                                                                                </div>
                                                                                                                :
                                                                                                                null
                                                                                                        }
                                                                                                    </div>
                                                                                                );
                                                                                            }
                                                                                        } ) }
                                                                                    </Document>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                }) }
                                                            </div>

                                                            <div className="docs-caption">
                                                                <h3>Мои документы</h3>
                                                            </div>

                                                            { typeDocuments.map( typeDocument => {
                                                                return <Folder
                                                                    caption={ typeDocument.title + ` (${documentCountInFolder[typeDocument.id]})` }
                                                                    key={ typeDocument.id }
                                                                    folderId={ 'folder-' + typeDocument.id }>

                                                                    { documents.map(document => {
                                                                        if ( document.type_id === typeDocument.id ) {
                                                                            oldDocs[document.id] = [];
                                                                        }
                                                                    } ) }

                                                                    { documents.map(document => {
                                                                        if ( document.type_id === typeDocument.id ) {
                                                                            if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                                                if ( document.document_old === '1' ) {
                                                                                    oldDocs[ document.old_id ][ document.id ] = document;
                                                                                } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                                                    oldDocs[ document.id][ document.id ] = document;
                                                                                }

                                                                            } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                                                let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение

                                                                                return (
                                                                                    <div className='document-container'>
                                                                                        <div className='document-active'>

                                                                                            <Document
                                                                                                documentId={ document.id }
                                                                                                key={ document.id }
                                                                                                caption={ document.title + ` (${expansionFile})` }
                                                                                                isReplace={ true }
                                                                                                isAddUser={ true }
                                                                                                isDownload={ true }
                                                                                                isUsers={ true }
                                                                                                onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                onDownload={ event => this.downloadDocument(event) }
                                                                                                onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                popoverChange={ popoverChange }
                                                                                                popoverDelete={ popoverDelete }
                                                                                                popoverReplace={ popoverReplace }
                                                                                                popoverAdd={ popoverAdd }
                                                                                                popoverDownload={ popoverDownLoad }
                                                                                                popoverUsers={ popoverUsers }
                                                                                            >
                                                                                                <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                            </Document>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }

                                                                    } ) }

                                                                    { documents.map(document => {
                                                                        if ( document.type_id === typeDocument.id ) {
                                                                            return (
                                                                                <div className='document-container'>
                                                                                    {
                                                                                        Array.isArray( oldDocs[document.id] ) ?
                                                                                            <div className='document-container-for-old-doc'>
                                                                                                { oldDocs[document.id].map( (d, i, arr) => {
                                                                                                    let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                                                    if ( i !== arr.length - 1 ) {
                                                                                                        return (
                                                                                                            <div className='document-old'>
                                                                                                                <Document
                                                                                                                    documentId={ d.id }
                                                                                                                    key={ d.id }
                                                                                                                    caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                                                    isUpdate={ true }
                                                                                                                    isDownload={ true }
                                                                                                                    onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                                    popoverChange={ popoverChange }
                                                                                                                    popoverDelete={ popoverDelete }
                                                                                                                    popoverReplace={ popoverReplace }
                                                                                                                    popoverAdd={ popoverAdd }
                                                                                                                    popoverDownload={ popoverDownLoad }
                                                                                                                    onDownload={ event => this.downloadDocument(event) }
                                                                                                                >
                                                                                                                    <p><span>Полное название документа:</span> { d.path }</p>
                                                                                                                    <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                                                    <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                    <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                    <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                                                    <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                                                    <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                                                </Document>
                                                                                                            </div>
                                                                                                        );
                                                                                                    } else {
                                                                                                        return (
                                                                                                            <div>
                                                                                                                <div className='document-active'>
                                                                                                                    <Document
                                                                                                                        documentId={ document.id }
                                                                                                                        key={ document.id }
                                                                                                                        caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                                                        isReplace={ true }
                                                                                                                        linkForUpdate={ false }
                                                                                                                        onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                                        onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                                        onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                                        onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                                        onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                                                                        onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                                        oldDocsIsOpen={ false }
                                                                                                                        isAddUser={ true }
                                                                                                                        isDownload={ true }
                                                                                                                        isUsers={ true }
                                                                                                                        popoverChange={ popoverChange }
                                                                                                                        popoverDelete={ popoverDelete }
                                                                                                                        popoverReplace={ popoverReplace }
                                                                                                                        popoverAdd={ popoverAdd }
                                                                                                                        popoverDownload={ popoverDownLoad }
                                                                                                                        popoverUsers={ popoverUsers }
                                                                                                                    >
                                                                                                                        <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                                        <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                        <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                                        <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                                        <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                                    </Document>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        );
                                                                                                    }
                                                                                                } ) }
                                                                                            </div>
                                                                                            :
                                                                                            null
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    } ) }
                                                                </Folder>
                                                            } ) }

                                                            { documents.map(document => {
                                                                if ( document.type_id === '0' ) {
                                                                    oldDocs[document.id] = [];
                                                                }
                                                            } ) }

                                                            { documents.map(document => {
                                                                if ( document.type_id === '0' ) {
                                                                    if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                                        if ( document.document_old === '1' ) {
                                                                            oldDocs[ document.old_id ][ document.id ] = document;
                                                                        } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                                            oldDocs[ document.id][ document.id ] = document;
                                                                        }

                                                                    } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                                        let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение
                                                                        return (
                                                                            <div className='document-container'>
                                                                                <div className='document-active'>
                                                                                    <Document
                                                                                        documentId={ document.id }
                                                                                        key={ document.id }
                                                                                        caption={ document.title + ` (${expansionFile})` }
                                                                                        isReplace={ true }
                                                                                        isAddUser={ true }
                                                                                        isDownload={ true }
                                                                                        isUsers={ true }
                                                                                        onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                        onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                        onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                        onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                                        onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                        popoverChange={ popoverChange }
                                                                                        popoverDelete={ popoverDelete }
                                                                                        popoverReplace={ popoverReplace }
                                                                                        popoverAdd={ popoverAdd }
                                                                                        popoverDownload={ popoverDownLoad }
                                                                                        popoverUsers={ popoverUsers }
                                                                                    >
                                                                                        <p><span>Полное название документа:</span> { document.path }</p>
                                                                                        <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                        <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                        <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                        <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                    </Document>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                }
                                                            } ) }

                                                            { documents.map(document => {
                                                                if ( document.type_id === '0' ) {
                                                                    return (
                                                                        <div className='document-container'>
                                                                            {
                                                                                Array.isArray( oldDocs[document.id] ) ?
                                                                                    <div className='document-container-for-old-doc'>
                                                                                        { oldDocs[document.id].map( (d, i, arr) => {
                                                                                            let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                                            if ( i !== arr.length - 1 ) {
                                                                                                return (
                                                                                                    <div className='document-old'>
                                                                                                        <Document
                                                                                                            documentId={ d.id }
                                                                                                            key={ d.id }
                                                                                                            caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                                            isUpdate={ true }
                                                                                                            onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                            isDownload={ true }
                                                                                                            popoverChange={ popoverChange }
                                                                                                            popoverDelete={ popoverDelete }
                                                                                                            popoverReplace={ popoverReplace }
                                                                                                            popoverAdd={ popoverAdd }
                                                                                                            popoverDownload={ popoverDownLoad }
                                                                                                            onDownload={ event => this.downloadDocument(event) }
                                                                                                        >
                                                                                                            <p><span>Полное название документа:</span> { d.path }</p>
                                                                                                            <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                                            <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                            <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                            <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                                            <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                                            <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                                        </Document>
                                                                                                    </div>
                                                                                                );
                                                                                            } else {
                                                                                                return (
                                                                                                    <div className='document-active'>
                                                                                                        <Document
                                                                                                            documentId={ document.id }
                                                                                                            key={ document.id }
                                                                                                            caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                                            isReplace={ true }
                                                                                                            linkForUpdate={ false }
                                                                                                            isUsers={ true }
                                                                                                            onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                            onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                            onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                            onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                            onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                                            onDownload={ event => this.downloadDocument(event) }
                                                                                                            oldDocsIsOpen={ false }
                                                                                                            onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                            isAddUser={ true }
                                                                                                            isDownload={ true }
                                                                                                            popoverChange={ popoverChange }
                                                                                                            popoverDelete={ popoverDelete }
                                                                                                            popoverReplace={ popoverReplace }
                                                                                                            popoverAdd={ popoverAdd }
                                                                                                            popoverDownload={ popoverDownLoad }
                                                                                                            popoverUsers={ popoverUsers }
                                                                                                        >
                                                                                                            <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                            <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                            <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                            <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                            <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                            <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                            <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                        </Document>
                                                                                                    </div>
                                                                                                );
                                                                                            }
                                                                                        } ) }
                                                                                    </div>
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </div>
                                                                    );
                                                                }
                                                            } ) }
                                                        </div>
                                                        :
                                                        <div>
                                                            { userAndDocuments.map(userDoc => {
                                                                if ( userDoc.id !== user.id ) {
                                                                    docs = ObjectHandler.getArrayFromObject(userDoc.documents);

                                                                    let documentCountInFolderUser = {};

                                                                    typeDocuments.map( typeDocument => {
                                                                        documentCountInFolderUser[typeDocument.id] = 0;
                                                                    } );

                                                                    typeDocuments.map( typeDocument => {
                                                                        docs.map( document => {
                                                                            if ( document.type_id === typeDocument.id && document.document_old === '0' ) {
                                                                                documentCountInFolderUser[typeDocument.id]++;
                                                                            }
                                                                        } )
                                                                    } );
                                                                    return (
                                                                        <div className='user-list'>
                                                                            <div className='user-list__card'>
                                                                                <Document
                                                                                    documentId={ 'user-' + userDoc.id }
                                                                                    key={ userDoc.id }
                                                                                    caption={ `${userDoc.surname} ${userDoc.name} ${userDoc.middlename}` }
                                                                                    isUpdate={ true }
                                                                                    isNotDelete={ true }
                                                                                    isUserIcon={ true }
                                                                                    userIcon={ <img src={ userDoc.photo }
                                                                                                    alt='Фото пользователя'
                                                                                                    className='user-list__card_photo'
                                                                                    /> }
                                                                                >
                                                                                    <p><span>Email пользователя:</span> { userDoc.email }</p>
                                                                                    <p><span>Отдел пользователя:</span> { userDoc.department }</p>
                                                                                    <p><span>Должность пользователя:</span> { userDoc.position }</p>

                                                                                    { userDoc.documents.map(document => {
                                                                                        oldDocs[document.id] = [];
                                                                                    } ) }

                                                                                    { userDoc.documents.map(document => {
                                                                                        if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                                                            if ( document.document_old === '1' ) {
                                                                                                oldDocs[ document.old_id ][ document.id ] = document;
                                                                                            } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                                                                oldDocs[ document.id][ document.id ] = document;
                                                                                            }

                                                                                        } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                                                            let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение
                                                                                            return (
                                                                                                <div className='document-container'>
                                                                                                    <div className='document-active'>
                                                                                                        <Document
                                                                                                            documentId={ 'document-' + document.id }
                                                                                                            key={ document.id }
                                                                                                            caption={ document.title + ` (${expansionFile})` }
                                                                                                            isDownload={ true }
                                                                                                            isUsers={ true }
                                                                                                            isNotDelete={ true }
                                                                                                            isUpdate={ true }
                                                                                                            onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                            onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                            onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                            onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                            onDownload={ event => this.downloadDocument(event) }
                                                                                                            onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                            popoverChange={ popoverChange }
                                                                                                            popoverDelete={ popoverDelete }
                                                                                                            popoverReplace={ popoverReplace }
                                                                                                            popoverAdd={ popoverAdd }
                                                                                                            popoverDownload={ popoverDownLoad }
                                                                                                            popoverUsers={ popoverUsers }
                                                                                                        >
                                                                                                            <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                            <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                            <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                            <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                            <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                            <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                            <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                        </Document>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    } ) }

                                                                                    { userDoc.documents.map(document => {
                                                                                        return (
                                                                                            <div className='document-container'>
                                                                                                {
                                                                                                    Array.isArray( oldDocs[document.id] ) ?
                                                                                                        <div className='document-container-for-old-doc'>
                                                                                                            { oldDocs[document.id].map( (d, i, arr) => {
                                                                                                                let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                                                                if ( i !== arr.length - 1 ) {
                                                                                                                    return (
                                                                                                                        <div className='document-old'>
                                                                                                                            <Document
                                                                                                                                documentId={ 'document-' + d.id }
                                                                                                                                key={ d.id }
                                                                                                                                caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                                                                isDownload={ true }
                                                                                                                                isNotDelete={ true }
                                                                                                                                isUpdate={ true }
                                                                                                                                popoverChange={ popoverChange }
                                                                                                                                popoverDelete={ popoverDelete }
                                                                                                                                popoverReplace={ popoverReplace }
                                                                                                                                popoverAdd={ popoverAdd }
                                                                                                                                popoverDownload={ popoverDownLoad }
                                                                                                                                onDownload={ event => this.downloadDocument(event) }
                                                                                                                            >
                                                                                                                                <p><span>Полное название документа:</span> { d.path }</p>
                                                                                                                                <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                                                                <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                                <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                                <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                                                                <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                                                                <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                                                            </Document>
                                                                                                                        </div>
                                                                                                                    );
                                                                                                                } else {
                                                                                                                    return (
                                                                                                                        <div className='document-active'>
                                                                                                                            <Document
                                                                                                                                documentId={ 'document-' + document.id }
                                                                                                                                key={ document.id }
                                                                                                                                caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                                                                isUsers={ true }
                                                                                                                                isNotDelete={ true }
                                                                                                                                isUpdate={ true }
                                                                                                                                onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                                                onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                                                onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                                                onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                                                onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                                                                onDownload={ event => this.downloadDocument(event) }
                                                                                                                                oldDocsIsOpen={ false }
                                                                                                                                onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                                                isDownload={ true }
                                                                                                                                popoverChange={ popoverChange }
                                                                                                                                popoverDelete={ popoverDelete }
                                                                                                                                popoverReplace={ popoverReplace }
                                                                                                                                popoverAdd={ popoverAdd }
                                                                                                                                popoverDownload={ popoverDownLoad }
                                                                                                                                popoverUsers={ popoverUsers }
                                                                                                                            >
                                                                                                                                <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                                                <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                                                <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                                                <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                                                <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                                                <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                                                <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                                            </Document>
                                                                                                                        </div>
                                                                                                                    );
                                                                                                                }
                                                                                                            } ) }
                                                                                                        </div>
                                                                                                        :
                                                                                                        null
                                                                                                }
                                                                                            </div>
                                                                                        );
                                                                                    } ) }
                                                                                </Document>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            }) }

                                                            { documents.map(document => {
                                                                oldDocs[document.id] = [];
                                                            } ) }

                                                            { documents.map(document => {
                                                                if ( document.document_old === '1' || document.old_id !== '0' ) {

                                                                    if ( document.document_old === '1' ) {
                                                                        oldDocs[ document.old_id ][ document.id ] = document;
                                                                    } else if ( document.document_old === '0' && document.old_id !== '0' ) {
                                                                        oldDocs[ document.id][ document.id ] = document;
                                                                    }

                                                                } else if ( document.document_old === '0' && document.old_id === '0' ) {
                                                                    let expansionFile = /\.[^\.]*$/.exec(document.path); // расширение
                                                                    return (
                                                                        <div className='document-container'>
                                                                            <div className='document-active'>
                                                                                <Document
                                                                                    documentId={ document.id }
                                                                                    key={ document.id }
                                                                                    caption={ document.title + ` (${expansionFile})` }
                                                                                    isReplace={ true }
                                                                                    isAddUser={ true }
                                                                                    isDownload={ true }
                                                                                    isUsers={ true }
                                                                                    onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                    onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                    onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                    onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                    onDownload={ event => this.downloadDocument(event) }
                                                                                    onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                    popoverChange={ popoverChange }
                                                                                    popoverDelete={ popoverDelete }
                                                                                    popoverReplace={ popoverReplace }
                                                                                    popoverAdd={ popoverAdd }
                                                                                    popoverDownload={ popoverDownLoad }
                                                                                    popoverUsers={ popoverUsers }
                                                                                >
                                                                                    <p><span>Полное название документа:</span> { document.path }</p>
                                                                                    <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                    <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                    <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                    <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                    <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                    <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                </Document>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            } ) }

                                                            { documents.map(document => {
                                                                return (
                                                                    <div className='document-container'>
                                                                        {
                                                                            Array.isArray( oldDocs[document.id] ) ?
                                                                                <div className='document-container-for-old-doc'>
                                                                                    { oldDocs[document.id].map( (d, i, arr) => {
                                                                                        let expansionFile = /\.[^\.]*$/.exec(d.path); // расширение
                                                                                        if ( i !== arr.length - 1 ) {
                                                                                            return (
                                                                                                <div className='document-old'>
                                                                                                    <Document
                                                                                                        documentId={ d.id }
                                                                                                        key={ d.id }
                                                                                                        caption={ d.title + ` (${expansionFile})` + ' (не актуален)' }
                                                                                                        isUpdate={ true }
                                                                                                        isDownload={ true }
                                                                                                        onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                        popoverChange={ popoverChange }
                                                                                                        popoverDelete={ popoverDelete }
                                                                                                        popoverReplace={ popoverReplace }
                                                                                                        popoverAdd={ popoverAdd }
                                                                                                        popoverDownload={ popoverDownLoad }
                                                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                                                    >
                                                                                                        <p><span>Полное название документа:</span> { d.path }</p>
                                                                                                        <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                        <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                                        <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                                        <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                                                    </Document>
                                                                                                </div>
                                                                                            );
                                                                                        } else {
                                                                                            return (
                                                                                                <div className='document-active'>
                                                                                                    <Document
                                                                                                        documentId={ document.id }
                                                                                                        key={ document.id }
                                                                                                        caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                                        isReplace={ true }
                                                                                                        linkForUpdate={ false }
                                                                                                        isUsers={ true }
                                                                                                        onDeleteClick={ event => this.deleteDocument(event, user) }
                                                                                                        onReplace={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/ReplaceDocument') }
                                                                                                        onUpdateClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UpdateDocument') }
                                                                                                        onAddUser={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserList') }
                                                                                                        onClickDocument={ event => this.showOldDocuments(event, document.id) }
                                                                                                        onDownload={ event => this.downloadDocument(event) }
                                                                                                        oldDocsIsOpen={ false }
                                                                                                        onUsersClick={ event => this.replaceDocument(event, this.props.document, this.props.getCurrentDocumentDB, '/public/#/documents/UserListInDocument') }
                                                                                                        isAddUser={ true }
                                                                                                        isDownload={ true }
                                                                                                        popoverChange={ popoverChange }
                                                                                                        popoverDelete={ popoverDelete }
                                                                                                        popoverReplace={ popoverReplace }
                                                                                                        popoverAdd={ popoverAdd }
                                                                                                        popoverDownload={ popoverDownLoad }
                                                                                                        popoverUsers={ popoverUsers }
                                                                                                    >
                                                                                                        <p><span>Полное название документа:</span> { document.path }</p>
                                                                                                        <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                                                                                        <p><span>Создатель документа:</span> { document.creater_id === user.id ? 'Вы' : `${document.creater_surname} ${document.creater_name} ${document.creater_middlename}`}</p>
                                                                                                        <p><span>Количество пользователей отвечающих за документ:</span> { document.users_count }</p>
                                                                                                        <p><span>Дата добавления документа:</span> { moment( document.datebegin ).format('LL') }</p>
                                                                                                        <p><span>Дата подписания документа:</span> { moment( document.datesignature ).format('LL') }</p>
                                                                                                        <p><span>Дата пересмотра документа:</span> { moment( document.dateend ).format('LL') }</p>
                                                                                                    </Document>
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    } ) }
                                                                                </div>
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                );
                                                            } ) }
                                                        </div>
                                                }
                                            </div>
                                    }

                                    <SideBar
                                        isOpen={ this.state.isOpenSideBar }
                                        onOpenSideBar={ this.openSideBar }
                                    >
                                        <h3 className='sidebar__caption'>Действия над документами</h3>

                                        <div className='sidebar__filter_container'>
                                            <h3 className='sidebar__caption sidebar__filter'>Отображение</h3>
                                            <i
                                                className='sidebar__filter_icon glyphicon glyphicon glyphicon-eye-open'
                                                onClick={ this.openSideBar }
                                            ></i>
                                        </div>

                                        <div className='sidebar__visiblity'>
                                            <p className="sidebar__visiblity_par">
                                                <label
                                                    onClick={ () => {
                                                        this.props.getVisibleDocs(true);
                                                        this.setState({ visibleFolders: this.props.visibleDocs });
                                                    } }
                                                >
                                                    <input
                                                        name={ 'visiblityType' }
                                                        type='radio'
                                                        checked={ this.state.visibleFolders ? 'checked' : null }

                                                    />
                                                    <span>Отображать типы документов</span>
                                                </label>
                                            </p>
                                            <p className="sidebar__visiblity_par">
                                                <label
                                                    onClick={ () => {
                                                        this.props.getVisibleDocs(false);
                                                        this.setState({ visibleFolders: this.props.visibleDocs });
                                                    } }
                                                >
                                                    <input
                                                        name={ 'visiblityType' }
                                                        type='radio'
                                                        checked={ this.state.visibleFolders ? null : 'checked' }
                                                    />
                                                    <span>Не отображать типы документов</span>
                                                </label>
                                            </p>

                                            <hr/>

                                            <p className="sidebar__visiblity_par">
                                                <label
                                                    onClick={ () => {
                                                        this.props.getVisibleDocs(false);
                                                        this.setState({ isShowUsers: true });
                                                    } }
                                                >
                                                    <input
                                                        name={ 'visiblityUsers' }
                                                        type='radio'
                                                        checked={ this.state.isShowUsers ? 'checked' : null }
                                                    />
                                                    <span>Отображать сотрудников отдела</span>
                                                </label>
                                            </p>

                                            <p className="sidebar__visiblity_par">
                                                <label
                                                    onClick={ () => {
                                                        this.props.getVisibleDocs(false);
                                                        this.setState({ isShowUsers: false });
                                                    } }
                                                >
                                                    <input
                                                        name={ 'visiblityUsers' }
                                                        type='radio'
                                                        checked={ this.state.isShowUsers ? null : 'checked' }
                                                    />
                                                    <span>Не отображать сотрудников отдела</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className='sidebar__filter_container'>
                                            <h3 className='sidebar__caption sidebar__filter'>Фильтрация</h3>
                                            <i
                                                className='sidebar__filter_icon glyphicon glyphicon-filter'
                                                onClick={ this.openSideBar }
                                            ></i>
                                        </div>
                                        <div className='sidebar__filter_item-container'>
                                            <div className='sidebar__filter-date'>
                                                <div className='sidebar__filter-date_container'>
                                                    <h4 className='sidebar__caption'>По дате добавления</h4>
                                                    <p>Начиная
                                                        с даты:</p>
                                                    <Input
                                                        inputId={ 'dateBeginFrom' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                    <p>Заканчивая датой:</p>
                                                    <Input
                                                        inputId={ 'dateBeginTo' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                </div>
                                                <div className='sidebar__filter-date_container'>
                                                    <h4 className='sidebar__caption'>По дате подписания</h4>
                                                    <p>Начиная с даты:</p>
                                                    <Input
                                                        inputId={ 'dateSignatureFrom' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                    <p>Заканчивая датой:</p>
                                                    <Input
                                                        inputId={ 'dateSignatureTo' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                </div>
                                                <div className='sidebar__filter-date_container'>
                                                    <h4 className='sidebar__caption'>По дате пересмотра</h4>
                                                    <p>Начиная с даты:</p>
                                                    <Input
                                                        inputId={ 'dateEndFrom' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                    <p>Заканчивая датой:</p>
                                                    <Input
                                                        inputId={ 'dateEndTo' }
                                                        type='date'
                                                        onChange={ event => this.searchDocument(event) }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </SideBar>
                                </div>
                                :
                                <CenterScreenBlock>
                                    <h2>
                                        Вы ещё не были авторизированы в приложении.<br/>
                                        Если у Вас действительно имеется аккаунт,<br/>
                                        пожалуйста, авторизируйтесь.<br/>
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
    }

}

Documents.path = '/documents';

export default connect(
    state => ({
        document: state.document,
        userData: state.userData,
        typeDocument: state.typeDocument,
        visibleDocs: state.visibleDocs,
        userAndDocuments: state.userAndDocuments
    }),
    dispatch => ({
        getDocumentsDB: user => {
            dispatch(getDocuments(user));
        },
        getCurrentDocumentDB: (document, path) => {
            dispatch(getCurrentDocument(document, path));
        },
        getDocumentsDBBySearch: search => {
            dispatch(getDocumentsBySearch(search));
        },
        getVisibleDocs: value => {
            dispatch(visibleDocs(value));
        },
        getUserAndDocuments: user => {
            dispatch(getUserAndDocuments(user));
        }
    })
)(Documents);
