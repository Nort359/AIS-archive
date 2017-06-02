import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import SideBar from '../../components/SideBar/SideBar';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Folder from '../../components/Folder/Folder';
import Document from '../../components/Document/Document';

import ObjectHandler from '../../classes/ObjectHandler';

import './Documents.scss';

import { getDocuments, getDocumentsBySearch } from './actions';

class Documents extends React.Component {

    constructor(props) {
        super(props);

        for (let i = 0; i < 5000; i += 1000) {
            setTimeout(() => {
                const user = this.props.userData;
                this.props.getDocumentsDB({ userId: user.id });
            }, i);
        }

        this.searchDocument = this.searchDocument.bind(this);
    }

    searchDocument(event) {
        const inputSearch = document.querySelector(`#${event.target.id}`);
        const user = this.props.userData;

        const search = {
            userId: user.id,
            search: inputSearch.value
        };

        this.props.getDocumentsDBBySearch(search);
    }

    render() {
        let documents = ObjectHandler.getArrayFromObject(this.props.document),
            typeDocuments = ObjectHandler.getArrayFromObject(this.props.typeDocument);

        let documentCountInFolder = {};

        typeDocuments.map( typeDocument => {
            documentCountInFolder[typeDocument.id] = 0;
        } );

        typeDocuments.map( typeDocument => {
            documents.map( document => {
                if ( document.type_id === typeDocument.id ) {
                    documentCountInFolder[typeDocument.id]++;
                }
            } )
        } );

        return (
            <div>
                <h2 className='documents__header'>Мои документы</h2>

                <div className='documents__add-doc-btn_container'>
                    <Link to={ '/documents/AddDocument' }>
                        <Button className={ 'documents__add-doc-btn' } >Добавить документ</Button>
                    </Link>
                </div>

                { typeDocuments.map( typeDocument => {
                    return <Folder
                        caption={ typeDocument.title + ` (${documentCountInFolder[typeDocument.id]})` }
                        key={ typeDocument.id }
                        folderId={ 'folder-' + typeDocument.id }>
                    { documents.map(document => {
                        if ( document.type_id === typeDocument.id ) {
                            return (
                                    <Document
                                        documentId={ document.id }
                                        key={ document.id }
                                        caption={ document.title }
                                    >
                                        <p><span>Полное название документа:</span> { document.path }</p>
                                        <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                        <p><span>Дата добавления документа:</span> { document.datebegin }</p>
                                        <p><span>Дата подписания документа:</span> { document.datesignature }</p>
                                        <p><span>Дата пересмотра документа:</span> { document.dateend }</p>
                                    </Document>
                            )
                        }
                    } ) }
                    </Folder>
                } ) }

                { documents.map(document => {
                    if ( document.type_id === '0') {
                        return (
                            <Document
                                documentId={ document.id }
                                key={ document.id }
                                caption={ document.title }
                            >
                                <p><span>Полное название документа:</span> { document.path }</p>
                                <p><span>Краткое описание документа:</span> { document.description !== '' ? document.description : '[Описание отсутствует]'  }</p>
                                <p><span>Дата добавления документа:</span> { document.datebegin }</p>
                                <p><span>Дата подписания документа:</span> { document.datesignature }</p>
                                <p><span>Дата пересмотра документа:</span> { document.dateend }</p>
                            </Document>
                        )
                    }
                } ) }

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
                                <h4>По дате добавления</h4>
                                <p>Начиная с даты:</p>
                                <Input
                                    inputId={ 'dateBeginFrom' }
                                    type='date'
                                />
                                <p>Заканчивая датой:</p>
                                <Input
                                    inputId={ 'dateBeginTo' }
                                    type='date'
                                />
                            </div>
                            <div className='sidebar__filter-date_container'>
                                <h4>По дате подписания</h4>
                                <p>Начиная с даты:</p>
                                <Input
                                    inputId={ 'dateSignatureFrom' }
                                    type='date'
                                />
                                <p>Заканчивая датой:</p>
                                <Input
                                    inputId={ 'dateSignatureFrom' }
                                    type='date'
                                />
                            </div>
                            <div className='sidebar__filter-date_container'>
                                <h4>По дате окончания срока годности</h4>
                                <p>Начиная с даты:</p>
                                <Input
                                    inputId={ 'dateEndFrom' }
                                    type='date'
                                />
                                <p>Заканчивая датой:</p>
                                <Input
                                    inputId={ 'dateEndTo' }
                                    type='date'
                                />
                            </div>
                        </div>
                        <div className='sidebar__filter-alphabed'>
                            <h4>По алфавиту</h4>
                        </div>
                    </div>
                </SideBar>
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
        getDocumentsDBBySearch: search => {
            dispatch(getDocumentsBySearch(search));
        },
    })
)(Documents);
