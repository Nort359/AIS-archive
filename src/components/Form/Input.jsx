import React from 'react';

class Input extends React.Component {

    render() {
        return (
            <div>
                <input
                    type={ this.props.type || 'text' }
                    placeholder={ this.props.placeholder }
                />
            </div>
        );
    }

}

Input.propTypes = {
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string
};

Input.defaultProps = {
    type: 'text'
};

export default Input;
