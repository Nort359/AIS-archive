import React from 'react';

import SideBar from '../../components/SideBar/SideBar';
import Input from '../../components/Input/Input';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import Folder from '../../components/Folder/Folder';
import Document from '../../components/Document/Document';

import './Documents.scss';

class Documents extends React.Component {

    render() {
        return (
            <div>
                <h2 className='documents__header'>Мои документы</h2>
                <Folder>
                    <Document/>
                </Folder>
                <SideBar>
                    <h3 className='sidebar__caption'>Действия над документами</h3>

                    <h3 className='sidebar__caption sidebar__search'>Поиск</h3>
                    <div className='sidebar__search_container'>
                        <Input placeholder={ 'Название документа' } />
                        <i className='sidebar__search_icon glyphicon glyphicon-search'></i>
                    </div>

                    <div className='sidebar__filter_container'>
                        <h3 className='sidebar__caption sidebar__filter'>Фильтрация</h3>
                        <i className='sidebar__filter_icon glyphicon glyphicon-filter'></i>
                    </div>
                    <div className='sidebar__filter_item-container'>
                        <div className='sidebar__filter-date'>
                            <h4>По дате</h4>
                            <DateTimePicker
                                onSave={ val => console.log(val) }
                                placeholder={ 'Начиная с:' }
                            />
                            <DateTimePicker
                                onSave={ val => console.log(val) }
                                placeholder={ 'До:' }
                            />
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

export default Documents;
