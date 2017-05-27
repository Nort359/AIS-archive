import React from 'react';

// Import components
import Adder from '../Adder/Adder';
import { position } from '../adminPanelData';

class AddPosition extends React.Component {

    render() {
        return (
            <div>
                <Adder
                    headerForm={ 'Добавление должности' }
                    pathCheck={ position.pathServerCheckExist }
                    pathAdd={ position.pathServerAdd }
                    adderData={ position.inputValid }
                />
            </div>
        );
    }

}

AddPosition.path = '/AdminPanel/AddPosition';

export default AddPosition;
