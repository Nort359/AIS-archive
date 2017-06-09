/**
 * Created by Nort359@gmail.com on 13.05.2017.
 */
export const inputsData = {
    email: {
        id: 'userEmail',
        type: 'email',
        icon: 'glyphicon-user',
        patternOk: /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,
        messageOk: 'Email введён корректно',
        messageError: 'Email введён неккоректно',
        messageDefault: 'Ваш Email'
    },
    password: {
        id: 'userPassword',
        type: 'password',
        icon: 'glyphicon-lock',
        patternOk: /^.{6,}$/,
        patternOk: /^.{6,}$/,
        messageDefault: 'Введите пароль',
        messageOk: '',
        messageError: 'Пароль слишком короткий'
    }
};
