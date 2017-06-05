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

import ObjectHandler from '../../../classes/ObjectHandler';

import './UserList.scss';

import {  } from './actions';

class UserList extends React.Component {

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
        this.props.getUserListDB({ userId: user.id });

        this.showOldUserList = this.showOldUserList.bind(this);
        this.searchDocument = this.searchDocument.bind(this);
        this.replaceDocument = this.replaceDocument.bind(this);
    }

    showOldUserList(event, id) {
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

        this.props.getUserListDBBySearch(search);
    }

    render() {
        if (this.props.document.length === 0 ) {
            const user = this.props.userData;
            this.props.getUserListDB({ userId: user.id });
        }


        let documents = ObjectHandler.getArrayFromObject(this.props.document),
            typeUserList = ObjectHandler.getArrayFromObject(this.props.typeDocument);

        let documentCountInFolder = {};

        typeUserList.map( typeDocument => {
            documentCountInFolder[typeDocument.id] = 0;
        } );

        typeUserList.map( typeDocument => {
            documents.map( document => {
                if ( document.type_id === typeDocument.id && document.document_old === '0' ) {
                    documentCountInFolder[typeDocument.id]++;
                }
            } )
        } );

        moment.locale('ru');

        return (
            <div>

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
                        <div className='sidebar__filter-alphabet'>
                            <h4 className='sidebar__caption'>Сортировка</h4>
                            <p
                                id={ 'oderAlphabet' }
                                onClick={ event => {
                                    this.setState({ oderAlphabet: !this.state.oderAlphabet });
                                    this.searchDocument(event);
                                } }
                            >
                                По алфавиту От А до Я
                                <span className='glyphicon glyphicon-sort-by-alphabet'></span>
                            </p>
                        </div>
                    </div>
                </SideBar>
            </div>
        );
    }

}

UserList.path = '/documents';

export default connect(
    state => ({
        document: state.document,
        userData: state.userData,
        typeDocument: state.typeDocument
    }),
    dispatch => ({
        getUserListDB: user => {
            dispatch(getUserList(user));
        },
        getCurrentDocumentDB: (document, path) => {
            dispatch(getCurrentDocument(document, path));
        },
        getUserListDBBySearch: search => {
            dispatch(getUserListBySearch(search));
        }
    })
)(UserList);
