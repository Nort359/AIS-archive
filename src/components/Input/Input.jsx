import React from 'react';

import './Input.scss';

class Input extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: this.props.value !== '' ? this.props.value : ''
        };
    }

    render() {
        return (
            <div className={ 'input-animated__container' }>
                <input
                    className={ 'input-animated ' + this.props.inputClassName }

                    type={ this.props.type || 'text' }
                    placeholder={ this.props.placeholder }
                    value={  this.state.inputValue }
                    onChange={ event => {
                        this.setState({ inputValue: event.target.value });
                        if(this.props.onChange) {
                            this.props.onChange(event);
                        }

                    } }
                    onFocus={ this.props.onFocus }
                    onBlur={ this.props.onBlur }
                    onKeyPress={ this.props.onKeyPress }
                    id={ this.props.inputId }
                    name={ this.props.inputId }
                />
                <p className='input-animated__placeholder'>
                    { this.props.placeholder }
                </p>
                <div className='input-animated__underline'></div>

                <i
                    className={ `glyphicon ${this.props.icon} input-animated__icon` }
                    aria-hidden="true"
                    onClick={ this.props.onClickIcon }
                ></i>
                <i className='input-animated__icon-status glyphicon'></i>
            </div>
        );
    }

}

Input.propTypes = {
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    inputId: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    onClickIcon: React.PropTypes.func,
    inputClassName: React.PropTypes.string
};

Input.defaultProps = {
    value: ''
};

Input.defaultProps = {
    type: 'text'
};

export default Input;
