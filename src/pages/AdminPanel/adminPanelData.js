/**
 * Created by Nort359@gmail.com on 22.05.2017.
 */

export const department = {
    pathServerAdd: 'http://ais-archive/api/admin/department/department-add.php',
    pathServerCheckExist: 'http://ais-archive/api/admin/department/department-check-exist.php',
    inputValid: {
        id: 'department-title',
        icon: 'glyphicon-asterisk',
        patternOk: /^[a-zA-Zа-яА-Я \-]{3,}$/i,
        messageDefault: 'Название отдела',
        messageExist: 'Такой отдел существует',
        messageOk: 'Корректно',
        messageError: 'Кеккоректно'
    }
};

export const position = {
    pathServerAdd: 'http://ais-archive/api/admin/position/position-add.php',
    pathServerUpdate: 'http://ais-archive/api/admin/position/position-update.php',
    pathServerCheckExist: 'http://ais-archive/api/admin/position/position-check-exist.php',
    inputValid: {
        id: 'position-title',
        icon: 'glyphicon-asterisk',
        patternOk: /^[a-zA-Zа-яА-Я \-]{3,}$/i,
        messageDefault: 'Название должности',
        messageExist: 'Такая должность существует',
        messageOk: 'Корректно',
        messageError: 'Кеккоректно'
    }
};

export const typeDocument = {
    pathServerAdd: 'http://ais-archive/api/admin/document-type/document-type-add.php',
    pathServerCheckExist: 'http://ais-archive/api/admin/document-type/document-type-check-exist.php',
    inputValid: {
        id: 'typeDocument-title',
        icon: 'glyphicon-asterisk',
        patternOk: /^[a-zA-Zа-яА-Я \-]{3,}$/i,
        messageDefault: 'Название типа документа',
        messageExist: 'Такой тип документа существует',
        messageOk: 'Корректно',
        messageError: 'Кеккоректно'
    }
};
