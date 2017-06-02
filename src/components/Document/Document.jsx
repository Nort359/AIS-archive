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
                <div className='document' id={ `document-${this.props.documentId}` }>
                    <div className='document__caption' onClick={ event => this.showMoreInformation(event, this.props.documentId) }>
                        <i className='document__icon document__icon_arrow glyphicon glyphicon-menu-right'></i>
                        <i className='document__icon document__icon_list glyphicon glyphicon-list-alt'></i>
                        { this.props.caption }
                    </div>
                    <div className='document__action'>
                        <Link to={ this.props.pathUpdate } ><i
                            className='document__icon document__icon_pencil glyphicon glyphicon-pencil'
                            data-document-id={ this.props.documentId }
                            onClick={ this.props.onUpdateClick }
                        ></i></Link>
                        <i
                            className='document__icon document__icon_garbage glyphicon glyphicon-trash'
                            data-document-id={ this.props.documentId }
                            onClick={ this.props.onDeleteClick }
                        ></i>
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
    caption: PropTypes.string.isRequired,
    documentId: PropTypes.string,
    onUpdateClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    pathUpdate: PropTypes.string,
    children: PropTypes.any
};

export default Document;
