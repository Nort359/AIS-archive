import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// Import components
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Spinner from '../../../components/Spinner/Spinner';
import '../AdminPanel.scss';

import AForm from '../../../classes/AForm';
import Async from '../../../classes/Async';

class Adder extends AForm {

    constructor(props) {
        super(props);

        this.state = {
            isAdding: false
        };

        this.checkDepartmentOnExist = this.checkDepartmentOnExist.bind(this);
        this.addDepartment = this.addDepartment.bind(this);
    }

    checkDepartmentOnExist(adder, pathCheck) {
        const adderData = adder;
        this.checkValidTextInput(event, adderData.patternOk, adderData.messageOk, adderData.messageError, adderData.messageDefault);

        Promise.all([
            Async.checkInputValueOnExist(adderData.id, pathCheck)
        ])
            .then(answer => {
                if (answer[0] !== 'Ok')
                    this._rejectInput(adderData.id, adderData.messageExist);
                else
                    this._acceptInput(adderData.id, adderData.messageOk);
            })
            .catch(error => console.error(error));
    }

    addDepartment(adder, pathCheck, pathAdd) {
        const eventBlur = new Event('blur');
        const inputDepartment = document.getElementById(adder.id);

        inputDepartment.dispatchEvent(eventBlur);

        if (!adder.patternOk.test(inputDepartment.value)) return false;

        Promise.all([
            Async.checkInputValueOnExist(adder.id, pathCheck)
        ])
            .then(answer => {
                if (answer[0] !== 'Ok') {
                    this._rejectInput(adder.id, 'Такой отдел существует');
                    return false;
                }
                const spinner = document.getElementsByClassName('add-button__spinner')[0];
                const spinnerStyle = spinner.style;

                this.setState({ isAdding: false });

                spinnerStyle.display = 'block';

                Promise.all([ Async.addInputValueDB(adder.id, pathAdd) ])
                    .then(answer => {
                        if (answer[0] !== 'Ok') return false;

                        this.setState({ isAdding: true });

                        setTimeout(() => {
                            const spinner = document.getElementsByClassName('add-button__spinner')[0];
                            const spinnerStyle = spinner.style;

                            spinnerStyle.display = 'none';
                        }, 2000);

                        const inputDepartment = document.getElementById(adder.id);

                        inputDepartment.value = '';
                        inputDepartment.focus();

                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }

    render() {
        const adderData = this.props.adderData;

        return (
            <CenterScreenBlock>
                <Form header={ 'Добавление отдела' }>
                    <Input
                        inputId={ adderData.id }
                        placeholder={ adderData.messageDefault }
                        icon={ adderData.icon }
                        onBlur={ event => {
                            this.checkDepartmentOnExist(adderData, this.props.pathCheck);
                        } }
                        onFocus={ event => this.focusInput(event, adderData.messageDefault) }
                    />
                    <div className='add-button__container'>
                        {
                            this.state.isAdding ?
                                <div className='add-button__spinner glyphicon glyphicon-ok'></div>
                                :
                                <Spinner className='add-button__spinner'></Spinner>
                        }
                        <Button onClick={ event => {
                            this.addDepartment(adderData, this.props.pathCheck, this.props.pathAdd);
                        } }>Создать</Button>
                        <Link to='/AdminPanel'>К списку справочников</Link>
                    </div>
                </Form>
            </CenterScreenBlock>
        );
    }

}

Adder.propTypes = {
    pathCheck: PropTypes.string.isRequired,
    pathAdd: PropTypes.string.isRequired,
    adderData: PropTypes.object.isRequired
};

export default Adder;
