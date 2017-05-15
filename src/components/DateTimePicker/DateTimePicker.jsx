import React, { PropTypes } from 'react';
import { bindAll } from 'lodash';
import classnames from 'classnames';
import moment from 'moment';

import Calendar from './Calendar';
import Time from './Time';
import Input from '../Input/Input';
import Button from '../Button/Button';

import './DateTimePicker.scss';

moment.locale('ru');

class DateTimePicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: this.props.isOpen,
            tab: 0,
            m: this.props.value
        };

        //bindAll(this, ['handleFocus', 'handleSave', 'handleChange']);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSave() {
        this.props.onSave(this.state.m.format(this.props.format));
        this.setState({isOpen: false});
    }

    handleFocus() {
        if (!this.state.isOpen) this.toggle();
    }

    toggle() {
        const isOpen = !this.state.isOpen;
        this.setState({ isOpen });
    }

    handleTabClick(tab) {
        this.setState({ tab });
    }

    handleChange(m) {
        this.setState({ m });
    }

    render() {
        const { tab, m, isOpen } = this.state;

        const btnDate = classnames('dt-btn', {'is-active': tab === 0});
        const btnTime = classnames('dt-btn', {'is-active': tab === 1});
        const calendarClasses = classnames('tab', {'is-active': tab === 0});
        const timeClasses = classnames('tab', {'is-active': tab === 1});
        const wrapperClasses = classnames('dt-popup', {'is-open': isOpen});

        return (
            <div className='b-datetime'>
                <div className="dt-input">
                    <Input
                        value={ m.format(this.props.format) }
                        onFocus={ this.handleFocus }
                        placeholder={ this.props.placeholder }
                        icon={ 'glyphicon glyphicon-calendar' }
                    />
                </div>
                <div className={ wrapperClasses }>
                    <div className="options">
                        <Button className={ btnDate } onClick={ this.handleTabClick.bind(this, 0) }>Дата</Button>
                        <Button className={ btnTime } onClick={ this.handleTabClick.bind(this, 1) }>Время</Button>
                    </div>
                    <div className="tabs">

                        <Calendar
                            className={ calendarClasses }
                            onChange={ this.handleChange }
                            moment={ m }
                        />

                        <Time
                            classNames={ timeClasses }
                            onChange={ this.handleChange }
                            moment={ m }
                        />

                    </div>
                    <Button className="dt-btn-save" onClick={ this.handleSave } >Сохранить</Button>
                </div>
            </div>
        );
    }

}

DateTimePicker.propTypes = {
    onSave: PropTypes.func.isRequired,
    value: PropTypes.any,
    format: PropTypes.string,
    placeholder: PropTypes.string
};

DateTimePicker.defaultProps = {
    value: moment(),
    format: 'DD.MM.YYYY HH:mm'
};

export default DateTimePicker;
