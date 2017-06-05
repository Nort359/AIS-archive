import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Animation from '../../classes/Animation';

import './Document.scss';

class Document extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowContent: false
        };

        this.showMoreInformation = this.showMoreInformation.bind(this);
    }

    showMoreInformation(event, id) {
        const contentStyle = document.querySelector(`#document-${id} .document__more`).style;
        const arrow = document.querySelector(`#document-${id} .document__icon_arrow`);
        const isShowContent = !this.state.isShowContent;
        const display = isShowContent ? 'block' : 'none';
        const arrowType = isShowContent ? 'glyphicon-menu-down' : 'glyphicon-menu-right';
        const color = isShowContent ? '#00b5ff' : '#2B2B2B';

        arrow.classList.remove('glyphicon-menu-right');
        arrow.classList.remove('glyphicon-menu-down');

        arrow.classList.add(arrowType);
        arrow.style.color = color;

        contentStyle.display = display;

        Animation.toggleAnimateElement(this.state.isShowContent, contentStyle, 'hideMoreInformation', 'showMoreInformation', '500ms');

        this.setState({ isShowContent });
    }

    render() {
        return (
            <div className='document__container'>
                <div className='document' data-old-docs-open={ this.props.oldDocsIsOpen } id={ `document-${this.props.documentId}` }>
                    <div className='document__caption' onClick={ event => {
                        this.showMoreInformation(event, this.props.documentId);
                        if ( typeof this.props.onClickDocument === 'function' ) {
                            this.props.onClickDocument(event);
                        }
                    } }>
                        <i className='document__icon document__icon_arrow glyphicon glyphicon-menu-right'></i>
                        {
                            this.props.isUserIcon ?
                                this.props.userIcon
                                :
                                <i className='document__icon document__icon_list glyphicon glyphicon-list-alt'></i>
                        }
                        { this.props.caption }
                    </div>
                    <div className='document__action'>
                        {
                            this.props.isUpdate ?
                                null
                                :
                                <span>
                                    {
                                        !this.props.linkForUpdate ?
                                            <Link to={ this.props.pathUpdate } >
                                                <i
                                                    className='document__icon document__icon_pencil glyphicon glyphicon-pencil'
                                                    data-document-id={ this.props.documentId }
                                                    onClick={ this.props.onUpdateClick }
                                                    title='Изменить'
                                                ></i>
                                            </Link>
                                            :
                                            <i
                                                className='document__icon document__icon_pencil glyphicon glyphicon-pencil'
                                                data-document-id={ this.props.documentId }
                                                onClick={ this.props.onUpdateClick }
                                                title='Изменить'
                                            ></i>
                                    }
                                </span>
                        }
                        {
                            this.props.isNotDelete ?
                                null
                                :
                                <i
                                    className='document__icon document__icon_garbage glyphicon glyphicon-trash'
                                    data-document-id={ this.props.documentId }
                                    onClick={ this.props.onDeleteClick }
                                    title='Удалить'
                                ></i>
                        }
                        {
                            this.props.isReplace ?
                                <i
                                    className='document__icon document__icon_replace glyphicon glyphicon-refresh'
                                    data-document-id={ this.props.documentId }
                                    onClick={ this.props.onReplace }
                                    title='Заменить'
                                ></i>
                                :
                                null
                        }
                        {
                            this.props.isAddUser ?
                                <i
                                    className='document__icon document__icon_add-user glyphicon glyphicon-plus'
                                    data-document-id={ this.props.documentId }
                                    onClick={ this.props.onAddUser }
                                    title='Добавить пользователя к документу'
                                ></i>
                                :
                                null
                        }
                    </div>
                    <div className='document__more'>
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }

}

Document.propTypes = {
    children:           PropTypes.any,
    caption:            PropTypes.string.isRequired,
    documentId:         PropTypes.string,
    onClickDocument:    PropTypes.func,
    onUpdateClick:      PropTypes.func,
    onDeleteClick:      PropTypes.func,
    onReplace:          PropTypes.func,
    onAddUser:          PropTypes.func,
    pathUpdate:         PropTypes.string,
    pathReplace:        PropTypes.string,
    isReplace:          PropTypes.bool,
    oldDocsIsOpen:      PropTypes.bool,
    linkForUpdate:      PropTypes.bool,
    isUpdate:           PropTypes.bool,
    isAddUser:          PropTypes.bool,
    isUserIcon:         PropTypes.bool,
    isNotDelete:        PropTypes.bool,
    userIcon:           PropTypes.any
};

export default Document;
