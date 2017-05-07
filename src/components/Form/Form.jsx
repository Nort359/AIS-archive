import React from 'react';

import './Form.scss';

class Form extends React.Component {

    render() {
        return (
            <main>
                <div className='form-section__table'>
                    <div className='form-section__row'>
                        <div className='form-section__cell'>
                            <div className='form-section'>
                                <h3>{ this.props.header }</h3>

                                <form>
                                    { this.props.children }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

}

Form.propTypes = {
    header: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired
};

export default Form
