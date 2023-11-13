import React, { Component } from 'react';
import moment from 'moment';


class Calendar extends Component {
    state = {
        dateObject: moment(),
    };

    render() {
        const weekdays = moment.weekdays();
        const weekdayShort = moment.weekdaysShort();
        const firstDayOfMonth = () => moment(this.state.dateObject).startOf('month').format('d');
        const daysInMonth = () => this.state.dateObject.daysInMonth();
        const currentDate = () => this.state.dateObject.format('D');
        const month = () => this.state.dateObject.format('MMMM');
        const year = () => this.state.dateObject.format('YYYY');

        const blanks = [];
        for (let i = 0; i < firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">{''}</td>);
        }

        const daysArr = [];
        for (let d = 1; d <= daysInMonth(); d++) {
            const currentDay = d === parseInt(currentDate()) ? 'current-day' : '';
            daysArr.push(
                <td key={d} className={`day ${currentDay}`}>
                    <span>{d}</span>
                </td>
            );
        }

        const totalSlots = [...blanks, ...daysArr];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
        });

        rows.push(cells);

        const daysInMonthRows = rows.map((d, i) => <tr key={i * 100}>{d}</tr>);

        const goToNextMonth = () => {
            this.setState({
                dateObject: this.state.dateObject.clone().add(1, 'month'),
            });
        };

        const goToPrevMonth = () => {
            this.setState({
                dateObject: this.state.dateObject.clone().subtract(1, 'month'),
            });
        };

        return (
            <div className="calendar-container" style={this.props.style}>
                <div>
                    <button onClick={goToPrevMonth}>Previous Month</button>
                    <span>{`${month()}, ${year()}`}</span>
                    <button onClick={goToNextMonth}>Next Month</button>
                </div>
                <table className="calendar" style={{ width: this.props.width }}>
                    <thead>
                    <tr>
                        {weekdayShort.map((day) => (
                            <td key={day} className="week-day">
                                {day}
                            </td>
                        ))}
                    </tr>
                    </thead>
                    <tbody>{daysInMonthRows}</tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;