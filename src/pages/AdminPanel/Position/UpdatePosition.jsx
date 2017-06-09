import React from 'react';
import { connect } from 'react-redux';

// Import components
import Updater from '../Updater/Updater';
import { position } from '../adminPanelData';
import Button from '../../../components/Button/Button'
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock'

import '../AdminPanel.scss';

class UpdatePosition extends React.Component {

    render() {
        const currentPosition = this.props.position.currentPosition;

        if(typeof currentPosition === 'object') {
            return (
                <div>
                    <Updater
                        headerForm={ 'Изменение должности' }
                        pathCheck={ position.pathServerCheckExist }
                        pathUpdate={ position.pathServerUpdate }
                        adderData={ position.inputValid }
                        inputValue={ currentPosition.title }
                        oldData={ currentPosition }
                        user={ this.props.userData }
                    />
                </div>
            )
        } else {
            return (
                <CenterScreenBlock>
                    <h2>
                        Индификатор должности был утерян,<br/>
                        возможно вы перезагрузили страницу, пожалуйста,<br/>
                        вернитесь к списку справочников и нажмите<br/>
                        на изменение необходимоой должности снова
                    </h2>
                    <Button onClick={ event => window.history.back() } className={ 'button-back' } >
                        <i className="glyphicon glyphicon-hand-left"></i>
                        Назад
                    </Button>
                </CenterScreenBlock>
            );
        }
    }

}

UpdatePosition.path = '/AdminPanel/UpdatePosition';

export default connect(
    state => ({
        position: state.position,
        userData: state.userData
    }),
    dispatch => ({})
)(UpdatePosition);
