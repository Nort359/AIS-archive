import React from 'react';

import './Form.scss';

class Form extends React.Component {

    render() {
        return (
            <div className='form-section'>
                <h3>{ this.props.header }</h3>

                <form>
                    { this.props.children }
                </form>
            </div>
        );
    }

}

Form.propTypes = {
    header: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired
};

export default Form
