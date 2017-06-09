import React from 'react';
import { connect } from 'react-redux';

// Import components
import Updater from '../Updater/Updater';
import { typeDocument } from '../adminPanelData';
import Button from '../../../components/Button/Button'
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock'

import '../AdminPanel.scss';

class UpdateTypeDocument extends React.Component {

    render() {
        const currentTypeDocument = this.props.typeDocument.currentTypeDocument;

        console.log('currentTypeDocument', currentTypeDocument);

        if(typeof currentTypeDocument === 'object') {
            return (
                <div>
                    <Updater
                        headerForm={ 'Изменение типа документа' }
                        pathCheck={ typeDocument.pathServerCheckExist }
                        pathUpdate={ typeDocument.pathServerUpdate }
                        adderData={ typeDocument.inputValid }
                        inputValue={ currentTypeDocument.title }
                        oldData={ currentTypeDocument }
                        user={ this.props.userData }
                    />
                </div>
            )
        } else {
            return (
                <CenterScreenBlock>
                    <h2>
                        Индификатор типа документа был утерян,<br/>
                        возможно вы перезагрузили страницу, пожалуйста,<br/>
                        вернитесь к списку справочников и нажмите<br/>
                        на изменение необходимого типа документа снова
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

UpdateTypeDocument.path = '/AdminPanel/UpdateTypeDocument';

export default connect(
    state => ({
        typeDocument: state.typeDocument,
        userData: state.userData
    }),
    dispatch => ({})
)(UpdateTypeDocument);
