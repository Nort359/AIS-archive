import React from 'react';
import { Link } from 'react-router';

import SideBar from '../../components/SideBar/SideBar';
import List from '../../components/List/List';

import './AdminPanel.scss';

class AdminPanel extends React.Component {

    render() {
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
                { this.props.children }
            </div>
        );
    }

}

AdminPanel.path = '/AdminPanel';

export default AdminPanel;
