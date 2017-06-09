import React from 'react';

// Import components
import Adder from '../Adder/Adder';
import { typeDocument } from '../adminPanelData';

class AddType extends React.Component {

    render() {
        return (
            <div>
                <Adder
                    headerForm={ 'Добавление типа документов' }
                    pathCheck={ typeDocument.pathServerCheckExist }
                    pathAdd={ typeDocument.pathServerAdd }
                    adderData={ typeDocument.inputValid }
                    messageByAdd={ 'Новый тип документа успешно добавлен' }
                />
            </div>
        );
    }

}

AddType.path = '/AdminPanel/TypeDocument';

export default AddType;
