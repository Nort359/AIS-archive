import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Header from './components/Header/Header';
import Button from './components/Button/Button';
import Notification from './components/Notification/Notification';
import CenterScreenBlock from './components/CenterScreenBlock/CenterScreenBlock';
import DevTools from './utils/DevTools';

import { getUserFromSession } from './actions';
import { getDepartment } from './pages/AdminPanel/Department/actions';
import { getPosition } from './pages/AdminPanel/Position/actions';
import { getTypeDocument } from './pages/AdminPanel/TypeDocument/actions';
import { getExpansion } from './pages/AdminPanel/Expansion/actions';
import { getDocuments } from './pages/Documents/actions';
import { getAllUsers } from './pages/Documents/UserList/actions';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            noDataBase: false,
            isGetDocs: false
        };

        window.setInterval(
            () => {
                // check exists data base
                axios.get("/api/backup/db-check-exist.php")
                    .then(response => response.data)
                    .then(answer => {
                        if ( answer === 'Error' ) {
                            this.setState({ noDataBase: true });
                        }
                    })
                    .catch(error => console.error(error));
            },
            10000
        );

        axios.get( '/api/notification/notification-email.php' )
            .then(response => response.data)
            .catch(error => console.error(error));

        this.props.getUserSession();
        this.props.getDepartmentDB();
        this.props.getPositionDB();
        this.props.getTypeDocumentDB();
        this.props.getAllUsersDB();
        this.props.getExpansionDB();

        this.getDataBase = this.getDataBase.bind(this);
    }

    getDataBase() {
        // Восстановить БД
        axios.get('http://ais-archive/api/backup/db-import.php')
            .then(response => response.data)
            .then(answer => {
                if ( answer === 'Ok' ) {
                    alert( 'База данных успешно восстановленна. Пожалуйста, для корректной работы приложения обновите страницу с помощью комбинации клавиш Ctrl+F5' );
                }
            })
            .catch(error => console.error(error));
    }

    /**
     * Вспомогательная функция, возвращает jsx объект
     * @returns {XML} — Уведомление о отстутствии базы данных
     * @private
     */
    _renderNotification() {
        const user = this.props.userData;
        if ( typeof user === 'object' ) {
            if ( parseInt(user.id) > 0 ) {
                if ( this.state.isGetDocs === false ) {
                    this.props.getDocumentsDB( { userId: user.id } );
                    this.setState({ isGetDocs: true });
                }
            }
        }

        return (
            <CenterScreenBlock>
                <Notification
                    header={ 'База данных не найдена' }
                    btnText={ 'Ок' }
                    isNotButton={ true }
                    btnEvent={ () => {
                        setTimeout(() => {
                            window.location = '/public/#/'; // TODO Убрать хэш, когда в роутах его не будет
                        }, 1000);
                    } }
                >
                    <img className='notification__img' src={ 'img/no-connect.jpg' } alt='Нет базы данных'/>
                    <p><span className='notification__userData'>
                        База данных отсутствует! Пожалуйста восстановите её из последней сохранённой резервной копии
                    </span></p>
                    <Button onClick={ this.getDataBase }>Восстановить</Button>
                </Notification>
            </CenterScreenBlock>
        );
    }

    render() {


        return (
            <div>
                <Header />
                {
                    this.state.noDataBase ?
                        this._renderNotification()
                        :
                        <div>
                            { this.props.children }
                        </div>
                }
            </div>
        );
    }

}

App.path = '/';

export default connect(
    state => ({
        userData: state.userData,
        department: state.department,
        position: state.position,
        document: state.document
    }),
    dispatch => ({
        getUserSession: () => {
            dispatch(getUserFromSession());
        },
        getDepartmentDB: () => {
            dispatch(getDepartment());
        },
        getPositionDB: () => {
            dispatch(getPosition());
        },
        getTypeDocumentDB: () => {
            dispatch(getTypeDocument());
        },
        getDocumentsDB: user => {
            dispatch(getDocuments(user));
        },
        getAllUsersDB: () => {
            dispatch(getAllUsers());
        },
        getExpansionDB: () => {
            dispatch(getExpansion());
        }
    })
)(App);
