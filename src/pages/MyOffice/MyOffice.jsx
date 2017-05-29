import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';
import Button from '../../components/Button/Button';

import './MyOffice.scss';

import { getUserFromSession } from './../../actions';

class MyOffice extends React.Component {

    constructor(props) {
        super(props);

        this.props.getUserSession();
    }

    render() {
        const user = this.props.userData;

        return (
            <div className='my-office__container'>
                    <CenterScreenBlock>
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
                                <p><span>Отчество: </span>{ user.middlename }</p>
                            </div>
                            <div className='my-office__data_department'>
                                <span>Отдел: </span>{ user.department }
                            </div>
                            <div className='my-office__data_position'>
                                <span>Должность: </span>{ user.position }
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
                    </CenterScreenBlock>
            </div>
        );
    }

}

MyOffice.path = '/my-office';

export default connect(
    state => ({
        userData: state.userData
    }),
    dispatch => ({
        getUserSession: () => {
            dispatch(getUserFromSession());
        },
    })
)(MyOffice);
