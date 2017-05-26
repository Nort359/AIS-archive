import React, { Component, PropTypes } from 'react';

import './Document.scss';

class Document extends Component {

    render() {
        return (
            <div className='document__container'>
                <div className='document' id={ `document-${this.props.documentId}` }>
                    <div className='document__caption'>
                        <i className='document__icon document__icon_arrow glyphicon glyphicon-menu-right'></i>
                        <i className='document__icon document__icon_list glyphicon glyphicon-list-alt'></i>
                        { this.props.caption }
                    </div>
                    <div className='document__action'>
                        <i
                            className='document__icon document__icon_pencil glyphicon glyphicon-pencil'
                            data-document-id={ this.props.documentId }
                            onClick={ this.props.onUpdateClick }
                        ></i>
                        <i
                            className='document__icon document__icon_garbage glyphicon glyphicon-trash'
                            data-document-id={ this.props.documentId }
                            onClick={ this.props.onDeleteClick }
                        ></i>
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
    onDeleteClick: PropTypes.func
};

export default Document;
