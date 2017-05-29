import React from 'react';

// Import components
import Adder from '../Adder/Adder';
import { typeDocument } from '../adminPanelData';

class AddType extends React.Component {

    render() {
        // TODO: Проблема с добавлением типа документа
        return (
            <div>
                <Adder
                    headerForm={ 'Добавление типа документов' }
                    pathCheck={ typeDocument.pathServerCheckExist }
                    pathAdd={ typeDocument.pathServerAdd }
                    adderData={ typeDocument.inputValid }
                />
            </div>
        );
    }

}

AddType.path = '/AdminPanel/TypeDocument';

export default AddType;
