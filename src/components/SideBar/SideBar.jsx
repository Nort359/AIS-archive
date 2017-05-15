import React from 'react';

import Input from '../Input/Input';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';

import './SideBar.scss';

import Animation from '../../classes/Animation';

class SideBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenCalendarBegin: false,
            isOpenCalendarEnd: false,
        };

        this.isOpenSideBar = false;

        this.openSideBar = this.openSideBar.bind(this);
    }

    openSideBar() {
        const sideBar = document.querySelector('.sidebar').style;
        const captions = document.getElementsByClassName('sidebar__caption');

        console.log('captions', captions);
        console.log('typeof captions', typeof captions);

        Animation.toggleAnimateElement(this.isOpenSideBar, sideBar, 'slideRightSideBar', 'slideLeftSideBar', '500ms');

        let delay = this.isOpenSideBar ? 0 : 200;

        Array.prototype.forEach.call(captions, caption => {
            Animation.toggleAnimateElement(this.isOpenSideBar, caption.style, 'slideLeftSideBarElement', 'slideRightSideBarElement', '300ms', `${delay}ms`);
            delay += this.isOpenSideBar ? 0 : 200;
        });

        this.isOpenSideBar = !this.isOpenSideBar;
    }

    toggleDateTime(isBegin, isEnd) {
        this.setState({ isOpenCalendarBegin: isBegin });
        this.setState({ isOpenCalendarEnd: isEnd });
    }

    render() {
        return (
            <div>
                <div className={ 'sidebar' }>
                    <div className='sidebar__hamburger_container'>
                        <i
                            className='sidebar__hamburger_icon glyphicon glyphicon-menu-hamburger'
                            onClick={ this.openSideBar }
                        ></i>
                    </div>
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

                </div>
            </div>
        );
    }

}

SideBar.propTypes = {

};

export default SideBar;
