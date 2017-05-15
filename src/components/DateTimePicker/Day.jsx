import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

class Day extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        //const i = this.props.i;
        //const d = this.props.d;
        //const w = this.props.w;
        const { i, d, w } = this.props;
        const prevMonth = (w === 0 && i > 7);
        const nextMonth = (w >= 4 && i > 10);

        const wrapperClasses = classnames({
            'prev-month': prevMonth,
            'next-month': nextMonth,
            'current-day': (!prevMonth && !nextMonth && i === d),
            'disabled': (prevMonth || nextMonth)
        });

        return (
            <td className={ wrapperClasses } {...this.props} >
                { i }
            </td>
        );
    }

}

Day.propTypes = {
    i: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    d: PropTypes.number.isRequired
};

export default Day;
