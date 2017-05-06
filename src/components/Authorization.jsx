import React from 'react';

import Input from './Form/Input';
import Button from './Button';
import Form from './Form/Form';

export default class Authorization extends React.Component {

    render() {
        return (
            <Form header={ 'Авторизация' }>
                <Input type={ 'email' } placeholder={ 'Ваш Email' } icon='glyphicon glyphicon-user' />
                <Input type={ 'password' } placeholder={ 'Ваш пароль' } icon='glyphicon glyphicon-lock' />
                <Button type="button">Авторизоваться</Button>
            </Form>
        );
    }

}
