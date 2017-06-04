/**
 * Created by Nort359@gmail.com on 04.06.2017.
 */
export const inputsData = {
    documentTitle: {
        id: 'documentTitle',
        icon: 'glyphicon-bookmark',
        patternOk: /^[a-zA-Zа-яА-Яёй ]{3,}$/i,
        messageDefault: 'Название документа',
        messageOk: 'Название введёно корректно',
        messageError: 'Название введёно неккоректно'
    },
    documentDescription: {
        id: 'documentDescription',
        placeholder: 'Введите описание документа(необязательно)'
    },
    documentFile: {
        id: 'documentFile',
        type: 'file',
        icon: 'glyphicon-file',
        messageDefault: 'Добавьте файл',
        messageOk: 'Файл может быть добавлен',
        messageError: 'Файл не может быть добавлен'
    },
    documentDateEnd: {
        id: 'documentDateEnd',
        type: 'date',
        icon: 'glyphicon-calendar',
    },
    documentDateSignature: {
        id: 'documentDateSignature',
        type: 'date',
        icon: 'glyphicon-calendar'
    },
    documentType: {
        id: 'documentType',
        placeholder: 'Выберите тип документа(необяз.)'
    }
};
