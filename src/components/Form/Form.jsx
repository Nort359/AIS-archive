import React from 'react';

import './Form.scss';

class Form extends React.Component {

    render() {
        return (
            <main className="form-container">
                <h1>{ this.props.header }</h1>

                <form>
                    { this.props.children }
                </form>

            </main>
        );
    }

}

Form.propTypes = {
    header: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired
};

export default Form
