import React from 'react';

import './Document.scss';

export default class Document extends React.Component {

    render() {
        return (
            <div className='document__container'>
                <div className='document'>
                    <div className='document__caption'>
                        <i className='document__icon document__icon_arrow glyphicon glyphicon-menu-right'></i>
                        <i className='document__icon document__icon_list glyphicon glyphicon-list-alt'></i>
                        Документ по технике безопасности
                    </div>
                </div>
            </div>
        );
    }

}
