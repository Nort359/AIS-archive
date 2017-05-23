import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import querystring from 'querystring';

import SideBar from '../../components/SideBar/SideBar';
import List from '../../components/List/List';
import Folder from '../../components/Folder/Folder';
import Document from '../../components/Document/Document';

import './AdminPanel.scss';

import { getDepartment } from './AddDepartment/actions';

class AdminPanel extends React.Component {

    constructor(props) {
        super(props);

        this.props.getDepartmentDB();
    }

    render() {
        let departments = [];

        for(let department in this.props.department) {
            if (this.props.department.hasOwnProperty(department)) {
                departments.push(this.props.department[department]);
            }
        }



        return (
            <div>
                <SideBar>
                    <h3 className='sidebar__caption'>Добавить данные</h3>
                    <List className={ 'sidebar__add_data' }>
                        <Link to='/AdminPanel/AddDepartment'><li className='sidebar__caption sidebar__list_element'>Отделы</li></Link>
                        <Link to='/AdminPanel/AddPosition'><li className='sidebar__caption sidebar__list_element'>Доожности</li></Link>
                        <Link to='/AdminPanel/AddType'><li className='sidebar__caption sidebar__list_element'>Типы документов</li></Link>
                    </List>
                </SideBar>

                <Folder caption={ 'Отделы' }>
                    { departments.map(department => {
                        return <Document key={ department.id } caption={ department.title } />
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
        getPositionDB: () => {
            dispatch(getDepartment());
        },
        getTypeDocumentDB: () => {
            dispatch(getDepartment());
        }
    })
)(AdminPanel);
