import React from 'react';

import './SelectInput.scss';

class SelectInput extends React.Component {

    render() {
        return (
            <div className={ 'input-animated__container' }>
                <select
                    name={ this.props.selectId }
                    id={ this.props.selectId }
                    className='input-animated'
                    placeholder={ this.props.placeholder }
                >
                    <option
                        selected={ 'selected' }
                        disabled={ 'disabled' }
                        value={ 0 }
                    >
                        { this.props.placeholder }
                    </option>
                    { this.props.children }
                </select>

                <p className='input-animated__placeholder'>
                    { this.props.placeholder }
                </p>

                <div className='input-animated__underline'></div>
            </div>
        );
    }

}

SelectInput.propTypes = {
    selectId: React.PropTypes.string.isRequired,
    children: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string
};

export default SelectInput;
