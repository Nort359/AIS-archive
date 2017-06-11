import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Popover } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import querystring from 'querystring';

import SideBar from '../../components/SideBar/SideBar';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Folder from '../../components/Folder/Folder';
import Document from '../../components/Document/Document';
import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';

import ObjectHandler from '../../classes/ObjectHandler';

import './Documents.scss';

import { getDocuments, getDocumentsBySearch, getCurrentDocument } from './actions';

class Documents extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            oderAlphabet:       false,
            oderDateBegin:      false,
            oderDateSignature:  false,
            oderDateEnd:        false,

            isShowContent:      false
        };

        if (this.props.document.hasOwnProperty('currentDocument'))
            delete this.props.document.currentDepartment;

        const user = this.props.userData;
        this.props.getDocumentsDB({ userId: user.id });

        this.showOldDocuments = this.showOldDocuments.bind(this);
        this.searchDocument = this.searchDocument.bind(this);
        this.replaceDocument = this.replaceDocument.bind(this);
        this.downloadDocument = this.downloadDocument.bind(this);
    }

    downloadDocument(event) {
        const id = event.currentTarget.getAttribute('data-document-id');
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

        const id = event.currentTarget.getAttribute('data-document-id'),
              record = {
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

        this.props.getDocumentsDBBySearch(search);
    }

    render() {
        if (this.props.document.length === 0 ) {
            const user = this.props.userData;
            this.props.getDocumentsDB({ userId: user.id });
        }
        const user = this.props.userData;

        let documents       = ObjectHandler.getArrayFromObject(this.props.document),
            typeDocuments   = ObjectHandler.getArrayFromObject(this.props.typeDocument);

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
                                                                                    popoverAdd={ popoverAdd }
                                                                                    popoverDownload={ popoverDownLoad }
                                                                                    onDownload={ event => this.downloadDocument(event) }
                                                                                >
                                                                                    <p><span>Полное название документа:</span> { d.path }</p>
                                                                                    <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
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
                                    if ( document.document_old === '1' ) {
                                        oldDocs[ document.old_id ][ document.id ] = document;
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
                                                        popoverChange={ popoverChange }
                                                        popoverDelete={ popoverDelete }
                                                        popoverReplace={ popoverReplace }
                                                        popoverAdd={ popoverAdd }
                                                        popoverDownload={ popoverDownLoad }
                                                        popoverUsers={ popoverUsers }
                                                    >
                                                        <p><span>Полное название документа:</span> { document.path }</p>
                                                        <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
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
                                                                            popoverChange={ popoverChange }
                                                                            popoverDelete={ popoverDelete }
                                                                            popoverReplace={ popoverReplace }
                                                                            popoverAdd={ popoverAdd }
                                                                            popoverDownload={ popoverDownLoad }
                                                                            onDownload={ event => this.downloadDocument(event) }
                                                                        >
                                                                            <p><span>Полное название документа:</span> { d.path }</p>
                                                                            <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                            <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                            <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                            <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                        </Document>
                                                                    </div>
                                                                );
                                                            } else {
                                                                return (
                                                                    <div>
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
                                                                                popoverAdd={ popoverAdd }
                                                                                popoverDownload={ popoverDownLoad }
                                                                                onDownload={ event => this.downloadDocument(event) }
                                                                            >
                                                                                <p><span>Полное название документа:</span> { d.path }</p>
                                                                                <p><span>Краткое описание документа:</span> { d.description !== '' ? d.description : '[Описание отсутствует]'  }</p>
                                                                                <p><span>Дата добавления документа:</span> { moment( d.datebegin ).format('LL') }</p>
                                                                                <p><span>Дата подписания документа:</span> { moment( d.datesignature ).format('LL') }</p>
                                                                                <p><span>Дата пересмотра документа:</span> { moment( d.dateend ).format('LL') }</p>
                                                                            </Document>
                                                                        </div>
                                                                        <div className='document-active'>
                                                                            <Document
                                                                                documentId={ document.id }
                                                                                key={ document.id }
                                                                                caption={ document.title + ` (${expansionFile = /\.[^\.]*$/.exec(document.path)})` }
                                                                                isReplace={ true }
                                                                                linkForUpdate={ false }
                                                                                isUsers={ true }
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

                            <SideBar>
                                <h3 className='sidebar__caption'>Действия над документами</h3>

                                <div className='sidebar__filter_container'>
                                    <h3 className='sidebar__caption sidebar__filter'>Фильтрация</h3>
                                    <i className='sidebar__filter_icon glyphicon glyphicon-filter'></i>
                                </div>
                                <div className='sidebar__filter_item-container'>
                                    <div className='sidebar__filter-date'>
                                        <div className='sidebar__filter-date_container'>
                                            <h4 className='sidebar__caption'>По дате добавления</h4>
                                            <p>Начиная с даты:</p>
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
                                            <h4 className='sidebar__caption'>По дате окончания срока годности</h4>
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

Documents.path = '/documents';

export default connect(
    state => ({
        document: state.document,
        userData: state.userData,
        typeDocument: state.typeDocument
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
        }
    })
)(Documents);
