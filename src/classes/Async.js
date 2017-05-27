import axios from 'axios';
import querystring from 'querystring';

export default class Async {
    /**
     * Проверяет одно поле input на существование его значения в БД
     * @param idElement — ID input, значение которого нужно проверить
     * @param pathAPI — Путь к документу, который будет проверять
     * @returns {Promise.<T>} — Возвращает обещание с ответом от сервера
     */
    static checkInputValueOnExist(idElement, pathAPI) {
        const inputDepartment = document.querySelector(`#${idElement}`);

        const departmentData = {
            data: inputDepartment.value
        };

        return axios.post(pathAPI, querystring.stringify(departmentData))
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    /**
     * Добавляет одно поле input в БД
     * @param idElement — ID input, значение которого нужно добавить
     * @param pathAPI — Путь к документу, который будет добавлять
     * @returns {Promise.<T>} — Возвращает обещание с ответом от сервера
     */
    static addInputValueDB(idElement, pathAPI) {
        const inputDepartment = document.querySelector(`#${idElement}`);

        const departmentData = {
            data: inputDepartment.value
        };

        return axios.post(pathAPI, querystring.stringify(departmentData))
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    /**
     * Обновляет одно поле input в БД
     * @param idElement — ID input, значение которого нужно обновить
     * @param oldObject — Объект со старыми данными
     * @param pathAPI — Путь к документу, который будет обновлять
     * @returns {Promise.<T>} — Возвращает обещание с ответом от сервера
     */
    static updateInputValueDB(idElement, oldObject, pathAPI) {
        const inputDepartment = document.querySelector(`#${idElement}`);

        const departmentData = {
            id: oldObject.id,
            data: inputDepartment.value
        };

        return axios.post(pathAPI, querystring.stringify(departmentData))
            .then(response => response.data)
            .catch(error => console.error(error));
    }
}
