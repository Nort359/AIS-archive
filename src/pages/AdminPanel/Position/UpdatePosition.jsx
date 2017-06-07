import React from 'react';
import { connect } from 'react-redux';

// Import components
import Updater from '../Updater/Updater';
import { position } from '../adminPanelData';

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
            return null;
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
