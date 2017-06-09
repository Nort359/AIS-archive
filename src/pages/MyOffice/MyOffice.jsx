import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';
import Button from '../../components/Button/Button';

import Animation from '../../classes/Animation';
import ObjectHandler from '../../classes/ObjectHandler';

import './MyOffice.scss';

import { getUserFromSession } from './../../actions';
import { getNotifications } from './actions';

class MyOffice extends React.Component {

    constructor(props) {
        super(props);

        this.props.getUserSession();

        const userData = this.props.userData;

        const user = {
            userId: userData.id
        };

        this.props.getNotificationDB(user);
    }

    render() {
        const user = this.props.userData;

        let notifications = ObjectHandler.getArrayFromObject(this.props.notification);

        return (
            <div className='my-office__container'>
                {
                    parseInt(user.id) > 0 ?
                        <div className='my-office'>
                            <div className='my-office__photo_container'>
                                <img src={ user.photo } alt='Моя фотография' className='my-office__photo' />
                            </div>

                            <div className='my-office__data'>
                                <div className='my-office__data_email'>
                                    { user.email }
                                    <hr/>
                                </div>

                                <div className='my-office__data_fio'>
                                    <p><span>Имя: </span>{ user.name }</p>
                                    <p><span>Фамилия: </span>{ user.surname }</p>
                                    <p><span>Отчество: </span>{ user.middlename ? user.middlename : '[отчество отсутствует]' }</p>
                                </div>
                                <div className='my-office__data_department'>
                                    <span>Отдел: </span>{ user.department }
                                </div>
                                <div className='my-office__data_position'>
                                    <span>Должность: </span>{ user.position }
                                </div>

                                <div className='my-office__data_notification_container'>
                                    <Link to="/my-office/Notifications">
                                        <div className='my-office__data_notification'>
                                            <i className='my-office__data_notification_icon  glyphicon glyphicon-bell'></i>
                                            <h2 className="my-office__data_notification_count">{ notifications.length } новых уведомлений</h2>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className='my-office__btn-update_container'>
                                <Link to={ '/my-office/ChangeUserData' }><Button className={ 'my-office__btn-update_user-data' }>
                                    Изменить данные
                                </Button></Link>
                                <Link to={ '/my-office/ChangePassword' }><Button className={ 'my-office__btn-update_user-password' }>
                                    Изменить пароль
                                </Button></Link>
                            </div>
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

MyOffice.path = '/my-office';

export default connect(
    state => ({
        userData: state.userData,
        notification: state.notification
    }),
    dispatch => ({
        getUserSession: () => {
            dispatch(getUserFromSession());
        },
        getNotificationDB: user => {
            dispatch(getNotifications(user));
        }
    })
)(MyOffice);
