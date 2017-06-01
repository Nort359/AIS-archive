import React from 'react';
import { Link } from 'react-router';

import SideBar from '../../components/SideBar/SideBar';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Folder from '../../components/Folder/Folder';
import Document from '../../components/Document/Document';

import './Documents.scss';

class Documents extends React.Component {

    render() {
        return (
            <div>
                <h2 className='documents__header'>Мои документы</h2>

                <div className='documents__add-doc-btn_container'>
                    <Link to={ '/documents/AddDocument' }>
                        <Button className={ 'documents__add-doc-btn' } >Добавить документ</Button>
                    </Link>
                </div>

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
                            Начиная с числа:
                            <Input
                                type='date'
                            />
                            Заканчивая числом:
                            <Input
                                type='date'
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

export default connect(
    state => ({
        document: state.document
    }),
    dispatch => ({

    })
)(Documents);
