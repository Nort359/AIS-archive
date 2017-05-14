import React from 'react';

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
                        <Button className={ 'start-page__btn-get-started' }>Начать</Button>
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
