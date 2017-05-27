import React from 'react';
import { connect } from 'react-redux';

// Import components
import Updater from '../Updater/Updater';
import { position } from '../adminPanelData';

class UpdatePosition extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPosition: this.props.position.currentPosition
        };
    }

    render() {
        const currentPosition = this.props.position.currentPosition;

        console.log('currentPosition', currentPosition);

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
        position: state.position
    }),
    dispatch => ({})
)(UpdatePosition);
