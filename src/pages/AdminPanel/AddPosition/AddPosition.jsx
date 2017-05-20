import React from 'react';

// Import components
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

class AddPosition extends React.Component {

    render() {
        return (
            <CenterScreenBlock>
                <Form header={ 'Добавление должности' }>
                    <Input placeholder={ 'Название должности' } />
                    <Button>Создать</Button>
                </Form>
            </CenterScreenBlock>
        );
    }

}

AddPosition.path = '/AdminPanel/AddPosition';

export default AddPosition;
