import React from 'react';

import Input from './Form/Input';
import Button from './Button';
import Form from './Form/Form';

export default class Authorization extends React.Component {

    render() {
        return (
            <Form header={ 'Авторизация' }>
                <Input placeholder={ 'Ваш Email' } />
                <Input placeholder={ 'Ваш пароль' } />
                <Button type="button">Авторизоваться</Button>
            </Form>
        );
    }

}
