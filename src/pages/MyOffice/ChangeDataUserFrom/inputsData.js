/**
 * Created by Nort359@gmail.com on 29.05.2017.
 */
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
    photo:{
        id: 'userPhoto',
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
