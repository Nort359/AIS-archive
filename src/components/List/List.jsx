import React, { Component, PropTypes } from 'react';

import './List.scss';

class List extends Component {

    render() {
        return (
            <ul className={ ` list ${this.props.className}` }>
                { this.props.children }
            </ul>
        );
    }

}

List.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default List;
