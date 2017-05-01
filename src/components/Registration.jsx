import React from 'react';

import Input from './Form/Input';
import Button from './Button';
import Form from './Form/Form';

export default class Registration extends React.Component {

    render() {
        return (
            <Form header={ 'Регистрация' }>
                <Input placeholder={ 'Ваше имя' } />
                <Input placeholder={ 'Ваша фамилия' } />
                <Input placeholder={ 'Ваше отчество' } />
                <Input placeholder={ 'Ваш Email' } />
                <Input placeholder={ 'Придумайте пароль' } />
                <Input placeholder={ 'Повторите пароль' } />
                <Button type="button">Зарегистрироваться</Button>
            </Form>
        );
    }

}
