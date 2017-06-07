import React from 'react';
import { Link } from 'react-router';

import CenterScreenBlock from '../../components/CenterScreenBlock/CenterScreenBlock';
import Button from '../../components/Button/Button';
import { connect } from 'react-redux';

import './StartPage.scss';

class StartPage extends React.Component {

    render() {
        return (
            <main className='start-page'>

                <div className="start-page__banner">

                </div>

                <CenterScreenBlock bgImage={ 'img/startBackground3.jpeg' }>
                    <div className='start-page__center-block'>
                        {
                            this.props.userData.authorization ?
                                <Link to={ '/documents' }><Button className={ 'start-page__btn-get-started' }>Начать</Button></Link>
                                :
                                <Link to={ '/authorization' }><Button className={ 'start-page__btn-get-started' }>Начать</Button></Link>
                        }

                    </div>
                </CenterScreenBlock>
            </main>
        );
    }

}

StartPage.path = '/';

export default connect(
    state => ({
        userData: state.userData
    }),
    dispatch => ({
    })
)(StartPage);
