/**
 * Created by Nort359@gmail.com on 29.05.2017.
 */
export const inputsData = {
    oldPassword: {
        id: 'oldUserPassword',
        type: 'password',
        icon: 'glyphicon-lock',
        patternOk: /^.{6,}$/,
        messageOk: 'Верно',
        messageError: 'Старый пароль неверен',
        messageDefault: 'Ваш старый пароль'
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
};
