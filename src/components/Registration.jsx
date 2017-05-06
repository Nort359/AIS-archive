import React from 'react';
import axios from 'axios';
import querystring from 'querystring';

import Input from './Form/Input';
import Button from './Button';
import Form from './Form/Form';

export default class Registration extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            answerServer: ''
        };

        this.registrationUser = this.registrationUser.bind(this);
    }

    /**
     * Метод отправляет AJAX запрос и регистрирует пользоватея в базе данных
     * @param event — объект события клика по кнопке
     */
    registrationUser(event) {
        event.preventDefault();

        axios.post('http://ais-archive/api/registration-user.php',
            querystring.stringify({
                userFirstName: document.getElementById('userFirstName').value,
                userMiddleName: document.getElementById('userMiddleName').value,
                userLastName: document.getElementById('userLastName').value,
                userEmail: document.getElementById('userEmail').value,
                userPassword: document.getElementById('userPassword').value
            }))
            .then(user => { this.setState({ answerServer: user.data }) })
            .catch(error => console.error(error));

    }

    render() {
        return (
            <main>
                <Form header={ 'Регистрация' }>
                    <Input placeholder={ 'Ваша фамилия' } inputId={ 'userLastName' } icon='glyphicon glyphicon-user'  />
                    <Input placeholder={ 'Ваше имя' } inputId={ 'userFirstName' } />
                    <Input placeholder={ 'Ваше отчество' } inputId={ 'userMiddleName' } />
                    <Input type={ 'email' } placeholder={ 'Ваш Email' } inputId={ 'userEmail' } />
                    <Input type={ 'password' } placeholder={ 'Придумайте пароль' } inputId={ 'userPassword' } icon='glyphicon glyphicon-lock' />
                    <Input type={ 'password' } placeholder={ 'Повторите пароль' } icon='glyphicon glyphicon-lock' />

                    <Button type="button" onClick={ this.registrationUser }>Зарегистрироваться</Button>
                </Form>
                {
                    this.state.answerServer === '' ?
                        <h2>{ this.state.answerServer }</h2>
                    :
                        this.state.answerServer
                }
            </main>
        );
    }

}
