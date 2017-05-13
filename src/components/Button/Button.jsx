import React from 'react';

import './Button.scss';

class Button extends React.Component {

    render() {
        return (
            <button
                type={ this.props.type }
                className={ 'btn-main ' + this.props.className }
                onClick={ this.props.onClick }
            >
                { this.props.children }
            </button>
        );
    }

}

Button.propTypes = {
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    onClick: React.PropTypes.func,
    children: React.PropTypes.string.isRequired
};

export default Button;
