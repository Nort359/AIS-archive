import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import InputSlider from 'react-input-slider';

class Time extends Component {

    constructor(props) {
        super(props);

        this.state = {
            m: this.props.moment
        };
    }

    changeHours(pos) {
        const m = this.props.moment;
        m.hours(parseInt(pos.x));
        this.setState({ m });
        this.props.onChange(m);
    }

    changeMinutes(pos) {
        const m = this.props.moment;
        m.minutes(parseInt(pos.x));
        this.setState({ m });
        this.props.onChange(m);
    }

    render() {
        const { m } = this.state;
        const wrapperClasses = classnames(this.props.classNames, 'tab-time');

        return (
            <div className={ wrapperClasses }>
                <div className="showTime">
                    <span className="time">{ m.format('HH') }</span>
                    <span className="separator"></span>
                    <span className="time">{ m.format('mm') }</span>
                </div>
                <div className="sliders">
                    <div className="time-text">Часы</div>
                    <InputSlider
                        className="u-slider-time"
                        xmin={0}
                        xmax={23}
                        x={ m.hour() }
                        onChange={ this.changeHours.bind(this) }
                    />
                    <div className="time-text">Минуты</div>
                    <InputSlider
                        className="u-slider-time"
                        xmin={0}
                        xmax={59}
                        x={ m.minutes() }
                        onChange={ this.changeMinutes.bind(this) }
                    />
                </div>
            </div>
        );
    }

}

Time.propTypes = {
    moment: PropTypes.any.isRequired,
    classNames: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Time;
