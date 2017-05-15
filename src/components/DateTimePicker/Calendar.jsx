import React, { Component, PropTypes } from 'react';
import { bindAll, range, chunk } from 'lodash';
import classnames from 'classnames';

import Day from './Day';

class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            m: this.props.moment
        };

        //bindAll(this, ['prevMonth', 'nextMonth', 'renderCells']);
        this.prevMonth = this.prevMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.renderCells = this.renderCells.bind(this);
    }

    prevMonth(event) {
        event.preventDefault();

        const { m } = this.state;
        m.subtract(1, 'month');
        this.setState({ m });
        this.props.onChange(m);
    }

    nextMonth(event) {
        event.preventDefault();

        const { m } = this.state;
        m.add(1, 'month');
        this.setState({ m });
        this.props.onChange(m);
    }

    renderCells(m) {
        const d = m.date();
        const d1 = m.clone().subtract(1, 'month').endOf('month').date();
        const d2 = m.clone().date(1).day();
        const d3 = m.clone().endOf('month').date();

        const days = [].concat(
            range(d1 - d2 + 1, d1 + 1),
            range(1, d3 + 1),
            range(1, 42 - d3 - d2 + 1)
        );

        return chunk(days, 7).map((row, w) => {
            return (
                <tr key={ w }>
                    { row.map((i) => {
                        return (
                            <Day key={ i } i={ i } d={ d } w={ w } onClick={ this.selectDate.bind(this, i, w) } />
                        );
                    }) }
                </tr>
            );
        });
    }

    selectDate(i ,w) {
        const prevMonth = (w === 0 && i > 7);
        const nextMonth = (w >= 4 && i > 10);

        const { m } = this.state;

        m.date(i);

        this.setState({ m });

        if (prevMonth) m.subtract(1, 'month');
        if (nextMonth) m.add(1, 'month');

        this.props.onChange(m);
    }

    render() {
        const m = this.state.m;
        const wrapperClasses = classnames(this.props.className, 'tab-calendar');
        const weeks = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

        return (
            <div className={ wrapperClasses }>
                <div className="toolbar">
                    <button className="prev-month" onClick={ this.prevMonth }> - </button>
                    <span className="current-date">{ m.format('MMMM YYYY') }</span>
                    <button className="next-month" onClick={ this.nextMonth }> - </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            { weeks.map((w, i) => <td key={ i }>{ w }</td>) }
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderCells(m) }
                    </tbody>
                </table>

            </div>
        );
    }

}

Calendar.propTypes = {
    moment: PropTypes.any.isRequired,
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Calendar;
