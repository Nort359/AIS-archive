import React, { PropTypes } from 'react';

import './MessageBox.scss';

class MessageBox extends React.Component {

    render() {
        return (
            <div className='message-box is-active'>
                <div className='message-box__icon'>
                    <i className='glyphicon glyphicon-bell'></i>
                </div>
                <div className='message-box__text'><span>{ this.props.children }</span></div>
            </div>
        );
    }

}

MessageBox.propTypes = {
    children: PropTypes.string.isRequired
};

export default MessageBox;
