import React from 'react';

// Import components
import CenterScreenBlock from '../../../components/CenterScreenBlock/CenterScreenBlock';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

class AddDepartment extends React.Component {

    render() {
        return (
            <CenterScreenBlock>
                <Form header={ 'Добавление отдела' }>
                    <Input placeholder={ 'Название отдела' } />
                    <Button>Создать</Button>
                </Form>
            </CenterScreenBlock>
        );
    }

}

AddDepartment.path = '/AdminPanel/AddDepartment';

export default AddDepartment;
