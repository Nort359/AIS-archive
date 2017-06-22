import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import './Help.scss';
import ScreenWithDescription from './ScreenWithDescription';

class Help extends React.Component {

    constructor(props) {
        super(props);

        this.renderUser = this.renderUser.bind(this);
    }

    renderUser() {
        return (
            <div>
                <ScreenWithDescription
                    textAbove={ 'После запуска веб-приложения перед Вами откарывается форма входа в акканут - «Окно авторизации» (Рисунок 1).' }
                    imagePath={ 'img/help/1.jpg' }
                    textSignature={ 'Рисунок 1 - Окно авторизации' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Если у Вас еще нет аккаунта, зарегестрируйте его, кликнув по соответствующей строке снизу. После этого появится окно регистрации (Рисунок 2). Введите необходимые данные и нажмите «Зарегистрироваться».' }
                    imagePath={ 'img/help/2.jpg' }
                    textSignature={ 'Рисунок 2 - Окно регистрации' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Если Вы забыли пароль от аккаунта - воспользуйтесь формой восстановления пароля (Рисунок 3).' }
                    imagePath={ 'img/help/3.jpg' }
                    textSignature={ 'Рисунок 3 - Форма восстановления пароля' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'После в аккаунт Вам будет выведено сообщение об успешной авторизации, а затем откроется главная страница веб-приложения (Рисунок 4).' }
                    imagePath={ 'img/help/4.jpg' }
                    textSignature={ 'Рисунок 4 - Главная страница' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'По умолчанию Вы находитесь во вкладке «Документы» Здесь можно добавлять новые документы, работать с уже имеющимися, производите поиск и генерировать отчеты. Для того, чтобы добавить документ нажмите на кнопку с соответсвующим названием. Перед Вами откроется форма добавления документа (Рисунок 5). Заполните поля и нажмите «Добавить».' }
                    imagePath={ 'img/help/5.jpg' }
                    textSignature={ 'Рисунок 5 - Форма добавления доекумента' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Для вывода информации о документе, щелкните по нему. Здесь же будут показаны и прошлые версии данного документа. Справа от названия документа - иконки для выполнения действий с документом (редактирование, замена документа на новую версию, добавление ответственного лица к документу, скачивание документа, просмотр ответственных лиц за данный документ и удаление документа. (Рисунок 6).' }
                    imagePath={ 'img/help/6.jpg' }
                    textSignature={ 'Рисунок 6 - Информация о документе' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Кликнув по иконке с карандашом около названия документа, Вы перейдете на форму редактирования данных документа (Рисунок 7).' }
                    imagePath={ 'img/help/7.jpg' }
                    textSignature={ 'Рисунок 7 - Окно редактирования' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Кликнув по иконке замены документа Вы перейдете на форму замены документа на новую версию (Рисунок 8).' }
                    imagePath={ 'img/help/8.jpg' }
                    textSignature={ 'Рисунок 8 - Окно замены документа' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Кликнув по иконке добавления ответственного лица Вы увидете список зарегистрированных сотрудников по отделам. Выберите человека и нажмите на «+» (Рисунок 9).' }
                    imagePath={ 'img/help/9.jpg' }
                    textSignature={ 'Рисунок 9 - Окно добавления ответственного лица' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Кликнув по иконке скачивания документа, Вы сразу скачаете документ на Ваш компьютер. Нажмите на иконку показа ответственных лиц и Вам будет выведен список всех сотрудников, ответственных за данный документ (Рисунок 10).' }
                    imagePath={ 'img/help/10.jpg' }
                    textSignature={ 'Рисунок 10 - Список ответственных лиц к документу' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Нажмите на одну из кнопок меню слева страницы и перед Вами откроются возможности фильтрации документов, а также выбор отображения типов документов (Рисунок 11).' }
                    imagePath={ 'img/help/11.jpg' }
                    textSignature={ 'Рисунок 11 - Меню фильтрации' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Нажмите на вкладку с Вашим именем и отчеством справа сверху страницы и выберите «Личный кабинет». Вам откроется страница с данными Вашего аккаунта, здесь также можно изменить данные и пароль, а также просмотреть уведомления (Рисунок 12).' }
                    imagePath={ 'img/help/12.jpg' }
                    textSignature={ 'Рисунок 12 - Вкладка «Личный кабинет»' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Нажав на строку с уведомлениями, Вам будет выведен список Ваших уведомлений. Например, переименование Вашего отдела администратором или добавление Вас к списку ответственных за документ одним из пользователей (Рисунок 13).' }
                    imagePath={ 'img/help/13.jpg' }
                    textSignature={ 'Рисунок 13 - Уведомления' }
                    textUnder={ '' }
                />
            </div>
        );
    }

    renderAdmin() {
        return (
            <div>
                <ScreenWithDescription
                    textAbove={ 'Перейдите на вкладку «Панель администратора». Перед Вами будет выведен список таблиц базы данных. (Рисунок 1).' }
                    imagePath={ 'img/help/14.jpg' }
                    textSignature={ 'Рисунок 1 - Вкладка «Панель администратора»' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Для того, чтобы изменить данные в таблице нажмите на название таблицы, выберите данные и нажмите на иконку редактирования. Перед Вами появится форма редактирования данных (Рисунок 2).' }
                    imagePath={ 'img/help/15.jpg' }
                    textSignature={ 'Рисунок 2 - Редактирование данных таблицы' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Для добавления данных в таблицу нажмите на кнопку меню слева страницы, а затем выберите в какую таблицу нужно даобавить данные (Рисунок 3).' }
                    imagePath={ 'img/help/16.jpg' }
                    textSignature={ 'Рисунок 3 - Меню добавления данных' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Далее перед Вами отроется форма добавления данных в таблицу (Рисунок 4).' }
                    imagePath={ 'img/help/17.jpg' }
                    textSignature={ 'Рисунок 4 - Форма добавления данных' }
                    textUnder={ '' }
                />
                <ScreenWithDescription
                    textAbove={ 'Для создания резервной копии базы данных кликните по кнопке «Создать резервную копию базы данных»' }
                    imagePath={ '' }
                    textSignature={ '' }
                    textUnder={ '' }
                />
                </div>
        );
    }
    renderHead() {
        return (
            <div>
                <ScreenWithDescription
                    textAbove={ 'На Вашей вкладке «Документы» Вы можете работать со своими документами, а также просматривать и скачивать документы сотрудников Вашего отдела, а также смотреть список лиц, ответственных за эти документы (Рисунок 1).' }
                    imagePath={ 'img/help/18.jpg' }
                    textSignature={ 'Рисунок 1 - Список документов пользователей Вашего отдела»' }
                    textUnder={ '' }
                />
                 </div>
        );
    }

    renderErrors() {
        return (
            <div>
                <ScreenWithDescription
                    textAbove={ 'При поиске документов из аккаунта начальника отдела, есть вероятность неккоректного результата. Это связано с тем, что кроме самого начальника отдела, выводятся также его подчинённые и их документы, поэтому при поиске могут найтись также документы подчинённых.' }
                    imagePath={ 'img/help/19.png' }
                    textSignature={ 'Рисунок 1 - Возможная ошибка при поиске документа из аккаунта начальника' }
                    textUnder={ '' }
                />
            </div>
        );
    }

    render() {
        const tabsInstance = (
            <div className="help-center">
                <div className='tabs-center'>
                    <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Сотруднику">{ this.renderUser() }</Tab>
                        <Tab eventKey={2} title="Начальнику отдела">{ this.renderHead() }</Tab>
                        <Tab eventKey={3} title="Администратору">{ this.renderAdmin() }</Tab>
                        <Tab eventKey={4} title="Возможные ошибки">{ this.renderErrors() }</Tab>
                    </Tabs>
                </div>
            </div>

        );

        return tabsInstance;
    }

}

Help.path = '/help';

export default Help;
