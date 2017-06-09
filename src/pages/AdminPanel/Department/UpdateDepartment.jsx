import React from 'react';
import { connect } from 'react-redux';

// Import components
import Updater from '../Updater/Updater';
import { department } from '../adminPanelData';
import Button from '../../../components/Button/Button'
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock'

import '../AdminPanel.scss';


class UpdateDepartment extends React.Component {

    render() {
        const currentDepartment = this.props.department.currentDepartment;

        if(typeof currentDepartment === 'object') {
            return (
                <div>
                    <Updater
                        headerForm={ 'Изменение отдела' }
                        pathCheck={ department.pathServerCheckExist }
                        pathUpdate={ department.pathServerUpdate }
                        adderData={ department.inputValid }
                        inputValue={ currentDepartment.title }
                        oldData={ currentDepartment }
                        user={ this.props.userData }
                    />
                </div>
            )
        } else {
            return (
                <CenterScreenBlock>
                    <h2>
                        Индификатор отдела был утерян,<br/>
                        возможно вы перезагрузили страницу, пожалуйста,<br/>
                        вернитесь к списку справочников и нажмите<br/>
                        на изменение необходимого отдела снова
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

UpdateDepartment.path = '/AdminPanel/UpdateDepartment';

export default connect(
    state => ({
        department: state.department,
        userData: state.userData
    }),
    dispatch => ({})
)(UpdateDepartment);
