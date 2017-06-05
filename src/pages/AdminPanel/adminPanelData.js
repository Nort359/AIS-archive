/**
 * Created by Nort359@gmail.com on 22.05.2017.
 */

export const department = {
    pathServerAdd: '/api/admin/department/department-add.php',
    pathServerUpdate: '/api/admin/department/department-update.php',
    pathServerCheckExist: '/api/admin/department/department-check-exist.php',
    inputValid: {
        id: 'department-title',
        icon: 'glyphicon-asterisk',
        patternOk: /^[a-zA-Zа-яА-Я \-ёЁйЙ]{3,}$/i,
        messageDefault: 'Название отдела',
        messageExist: 'Такой отдел существует',
        messageOk: 'Корректно',
        messageError: 'Неккоректно'
    }
};

export const position = {
    pathServerAdd: '/api/admin/position/position-add.php',
    pathServerUpdate: '/api/admin/position/position-update.php',
    pathServerCheckExist: '/api/admin/position/position-check-exist.php',
    inputValid: {
        id: 'position-title',
        icon: 'glyphicon-asterisk',
        patternOk: /^[a-zA-Zа-яА-Я \-ёЁйЙ]{3,}$/i,
        messageDefault: 'Название должности',
        messageExist: 'Такая должность существует',
        messageOk: 'Корректно',
        messageError: 'Неккоректно'
    }
};

export const typeDocument = {
    pathServerAdd: '/api/admin/document-type/document-type-add.php',
    pathServerUpdate: '/api/admin/document-type/document-type-update.php',
    pathServerCheckExist: '/api/admin/document-type/document-type-check-exist.php',
    inputValid: {
        id: 'typeDocument-title',
        icon: 'glyphicon-asterisk',
        patternOk: /^[a-zA-Zа-яА-Я \-ёЁйЙ]{3,}$/i,
        messageDefault: 'Название типа документа',
        messageExist: 'Такой тип документа существует',
        messageOk: 'Корректно',
        messageError: 'Неккоректно'
    }
};
