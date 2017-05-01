import React from 'react';

class Input extends React.Component {

    render() {
        return (
            <div className={ 'input-animated__container' }>
                <input
                    className={ 'input-animated' }
                    type={ this.props.type || 'text' }
                    placeholder={ this.props.placeholder }
                />
                <div className="input-animated__placeholder">
                    { this.props.placeholder }
                </div>
                <div className="input-animated__underline"></div>
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
