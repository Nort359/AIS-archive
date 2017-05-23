import React, { Component, PropTypes } from 'react';

import './Document.scss';

class Document extends Component {

    render() {
        return (
            <div className='document__container'>
                <div className='document'>
                    <div className='document__caption'>
                        <i className='document__icon document__icon_arrow glyphicon glyphicon-menu-right'></i>
                        <i className='document__icon document__icon_list glyphicon glyphicon-list-alt'></i>
                        { this.props.caption }
                    </div>
                </div>
            </div>
        );
    }

}

Document.propTypes = {
    caption: PropTypes.string.isRequired
};

export default Document;
