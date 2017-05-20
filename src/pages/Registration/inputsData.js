/**
 * Created by Nort359@gmail.com on 11.05.2017.
 */
export const inputsData = {
    lastName: {
        id: 'userLastName',
        icon: 'glyphicon-user',
        patternOk: /^[a-zA-Zа-яА-Я]{3,}$/i,
        messageDefault: 'Ваша фамилия',
        messageOk: 'Фамилия введёна корректно',
        messageError: 'Фамилия введёна неккоректно'
    },
    firstName: {
        id: 'userFirstName',
        patternOk: /^[a-zA-Zа-яА-Я]{3,}$/i,
        messageDefault: 'Ваше имя',
        messageOk: 'Имя введёно корректно',
        messageError: 'Имя введёно неккоректно'
    },
    middleName:{
        id: 'userMiddleName',
        patternOk: /^[a-zA-Zа-яА-Я]{3,}$/i,
        messageOk: 'Отчество введёно корректно',
        messageError: 'Отчество введёно неккоректно',
        messageDefault: 'Ваше отчество'
    },
    email: {
        id: 'userEmail',
        patternOk: /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,
        messageOk: 'Email введён корректно',
        messageError: 'Email введён неккоректно',
        messageDefault: 'Ваш Email'
    },
    password: {
        id: 'userPassword',
        type: 'password',
        icon: 'glyphicon-lock',
        patternOk: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        patternWarn: /^.{6,}$/,
        messageDefault: 'Введите пароль',
        messageOk: 'Сильный пароль',
        messageWarning: 'Слабый пароль',
        messageError: 'Пароль слишком короткий'
    },
    passwordAgain: {
        id: 'userPasswordAgain',
        type: 'password',
        icon: 'glyphicon-lock',
        messageDefault: 'Повторите пароль',
        messageOk: 'Пароли совпадают',
        messageError: 'Пароли не совпадают'
    },
    department: {
        id: 'department-select',
        placeholder: 'Выберите отдел'
    },
    position: {
        id: 'position-select',
        placeholder: 'Выберите должность'
    }
};
