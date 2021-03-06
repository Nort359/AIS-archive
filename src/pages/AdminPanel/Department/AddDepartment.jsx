import React, { Component } from 'react';

// Import components
import Adder from '../Adder/Adder';
import { department } from '../adminPanelData';

class AddDepartment extends Component {

    render() {
        return (
            <div>
                <Adder
                    headerForm={ 'Добавление отдела' }
                    pathCheck={ department.pathServerCheckExist }
                    pathAdd={ department.pathServerAdd }
                    adderData={ department.inputValid }
                    messageByAdd={ 'Новый отдел успешно добавлен' }
                />
            </div>
        );
    }

}

AddDepartment.path = '/AdminPanel/AddDepartment';

export default AddDepartment;
