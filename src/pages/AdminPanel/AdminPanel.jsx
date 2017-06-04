import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import SideBar from '../../components/SideBar/SideBar';
import List from '../../components/List/List';
import Folder from '../../components/Folder/Folder';
import Document from '../../components/Document/Document';

import './AdminPanel.scss';

import { getDepartment, deleteDepartment, getCurrentDepartment } from './Department/actions';
import { getPosition, getCurrentPosition, deletePosition } from './Position/actions';
import { getTypeDocument, deleteTypeDocument, getCurrentTypeDocument } from './TypeDocument/actions';

import ObjectHandler from '../../classes/ObjectHandler';

class AdminPanel extends React.Component {

    constructor(props) {
        super(props);

        this.props.getDepartmentDB();
        this.props.getPositionDB();
        this.props.getTypeDocumentDB();

        this.updateRecord = this.updateRecord.bind(this);

        this.deleteDepartment   = this.deleteDepartment.bind(this);
        this.deletePosition     = this.deletePosition.bind(this);
        this.deleteTypeDocument = this.deleteTypeDocument.bind(this);
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
        const departmentId = event.currentTarget.getAttribute('data-document-id'),
              department = {
                  departmentId
              };

        this.props.deleteDepartmentDB(department);
    }

    deletePosition(event) {
        const positionId = event.currentTarget.getAttribute('data-document-id'),
            position = {
                positionId
            };

        this.props.deletePositionDB(position);
    }

    deleteTypeDocument(event) {
        const typeDocumentId = event.currentTarget.getAttribute('data-document-id'),
            typeDocument = {
                typeDocumentId
            };

        this.props.deleteTypeDocumentDB(typeDocument);
    }

    render() {
        let departments     = ObjectHandler.getArrayFromObject(this.props.department),
            positions       = ObjectHandler.getArrayFromObject(this.props.position),
            typeDocuments   = ObjectHandler.getArrayFromObject(this.props.typeDocument);

        return (
            <div>
                <SideBar>
                    <h3 className='sidebar__caption'>Добавить данные</h3>
                    <List className={ 'sidebar__add_data' }>
                        <Link to='/AdminPanel/AddDepartment'><li className='sidebar__caption sidebar__list_element'>Отделы</li></Link>
                        <Link to='/AdminPanel/AddPosition'><li className='sidebar__caption sidebar__list_element'>Доожности</li></Link>
                        <Link to='/AdminPanel/TypeDocument'><li className='sidebar__caption sidebar__list_element'>Типы документов</li></Link>
                    </List>
                </SideBar>

                <Folder caption={ 'Отделы' } folderId={ 'departmentsList' }>
                    { departments.map(department => {
                        return <Document
                            documentId={ department.id }
                            key={ department.id }
                            caption={ department.title }
                            pathUpdate={ '/AdminPanel/UpdateDepartment' }
                            onUpdateClick={ event => this.updateRecord(event, this.props.department, this.props.getCurrentDepartmentDB) }
                            onDeleteClick={ this.deleteDepartment }
                        />
                    }) }
                </Folder>

                <Folder caption={ 'Должности' } folderId={ 'positionsList' }>
                    { positions.map(position => {
                        return <Document
                            documentId={ position.id }
                            key={ position.id }
                            caption={ position.title }
                            pathUpdate={ '/AdminPanel/UpdatePosition' }
                            onUpdateClick={ event => this.updateRecord(event, this.props.position, this.props.getCurrentPositionDB) }
                            onDeleteClick={ this.deletePosition }
                        />
                    }) }
                </Folder>

                <Folder caption={ 'Типы документов' } folderId={ 'typeDocumentsList' }>
                    { typeDocuments.map(typeDocument => {
                        return <Document
                            documentId={ typeDocument.id }
                            key={ typeDocument.id }
                            caption={ typeDocument.title }
                            pathUpdate={ '/AdminPanel/UpdateTypeDocument' }
                            onUpdateClick={ event => this.updateRecord(event, this.props.typeDocument, this.props.getCurrentTypeDocumentDB) }
                            onDeleteClick={ this.deleteTypeDocument }
                        />
                    }) }
                </Folder>
            </div>
        );
    }

}

AdminPanel.path = '/AdminPanel';

export default connect(
    state => ({
        department: state.department,
        position: state.position,
        typeDocument: state.typeDocument
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
    })
)(AdminPanel);
