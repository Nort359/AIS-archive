import React, { Component } from 'react';

// Import components
import Adder from '../Adder/Adder';
import { expansion } from '../adminPanelData';

class AddExpansion extends Component {

    render() {
        return (
            <div>
                <Adder
                    headerForm={ 'Добавление расширения для документа' }
                    pathCheck={ expansion.pathServerCheckExist }
                    pathAdd={ expansion.pathServerAdd }
                    adderData={ expansion.inputValid }
                    messageByAdd={ 'Новое расширение для документа успешно добавлено' }
                />
            </div>
        );
    }

}

AddExpansion.path = '/AdminPanel/AddExpansion';

export default AddExpansion;
