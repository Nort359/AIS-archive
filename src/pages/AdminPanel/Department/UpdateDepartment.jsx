import React from 'react';
import { connect } from 'react-redux';

// Import components
import Updater from '../Updater/Updater';
import { department } from '../adminPanelData';

class UpdateDepartment extends React.Component {

    render() {
        const currentDepartment = this.props.department.currentDepartment;

        console.log('currentDepartment', currentDepartment);

        if(typeof currentDepartment === 'object') {
            return (
                <div>
                    <Updater
                        headerForm={ 'Изменение должности' }
                        pathCheck={ department.pathServerCheckExist }
                        pathUpdate={ department.pathServerUpdate }
                        adderData={ department.inputValid }
                        inputValue={ currentDepartment.title }
                        oldData={ currentDepartment }
                    />
                </div>
            )
        } else {
            return null;
        }
    }

}

UpdateDepartment.path = '/AdminPanel/UpdateDepartment';

export default connect(
    state => ({
        department: state.department
    }),
    dispatch => ({})
)(UpdateDepartment);
