import React from 'react';
import { connect } from 'react-redux';

// Import components
import Updater from '../Updater/Updater';
import { expansion } from '../adminPanelData';
import Button from '../../../components/Button/Button'
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock'

import '../AdminPanel.scss';


class UpdateExpansion extends React.Component {

    render() {
        const currentExpansion = this.props.expansion.currentExpansion;

        if(typeof currentExpansion === 'object') {
            return (
                <div>
                    <Updater
                        headerForm={ 'Изменение расширения для документа' }
                        pathCheck={ expansion.pathServerCheckExist }
                        pathUpdate={ expansion.pathServerUpdate }
                        adderData={ expansion.inputValid }
                        inputValue={ currentExpansion.title }
                        oldData={ currentExpansion }
                        user={ this.props.userData }
                    />
                </div>
            )
        } else {
            return (
                <CenterScreenBlock>
                    <h2>
                        Индификатор расширения документа был утерян,<br/>
                        возможно вы перезагрузили страницу, пожалуйста,<br/>
                        вернитесь к списку справочников и нажмите<br/>
                        на изменение необходимогорасширения документа снова
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

UpdateExpansion.path = '/AdminPanel/UpdateExpansion';

export default connect(
    state => ({
        expansion: state.expansion,
        userData: state.userData
    }),
    dispatch => ({})
)(UpdateExpansion);
