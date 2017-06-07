import React from 'react';
import { connect } from 'react-redux';

// Import components
import Updater from '../Updater/Updater';
import { typeDocument } from '../adminPanelData';

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
            return null;
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
