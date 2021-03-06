import React from 'react';
import './Calendar.css';
import CalendarLegend from './CalendarLegend';

export class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.jump = this.jump.bind(this);

        const initialDate = new Date();
        this.state = {
            today: initialDate,
            currentMonth: initialDate.getMonth(),
            currentYear: initialDate.getFullYear()
        }
    }

    componentDidMount() {
        this.showCalendar();
    }

    componentDidUpdate() {
        this.showCalendar();
    }

    next() {
        this.setState((prevState) => {
            return {
                currentYear: (prevState.currentMonth === 11) ? prevState.currentYear + 1 : prevState.currentYear,
                currentMonth: (prevState.currentMonth + 1) % 12,
            }
        }, this.showCalendar);
    }

    previous() {
        this.setState((prevState) => {
            return {
                currentYear: (prevState.currentMonth === 0) ? prevState.currentYear - 1 : prevState.currentYear,
                currentMonth: (prevState.currentMonth === 0) ? 11 : prevState.currentMonth - 1
            }
        }, this.showCalendar);
    }

    jump() {
        var selectYear = document.getElementById("year");
        var selectMonth = document.getElementById("month");
        this.setState((prevState) => {
            return {
                currentYear: parseInt(selectYear.value),
                currentMonth: parseInt(selectMonth.value)
            }
        }, this.showCalendar);
    }

    showCalendar() {
        const month = this.state.currentMonth;
        const year = this.state.currentYear;

        let firstDay = (new Date(year, month)).getDay();

        var tbl = document.getElementById("calendar-body"); // body of the calendar
        var selectYear = document.getElementById("year");
        var selectMonth = document.getElementById("month");
        var monthAndYear = document.getElementById("monthAndYear");

        // clearing all previous cells
        tbl.innerHTML = "";

        // filing data about month and in the page via DOM.
        monthAndYear.innerHTML = this.MONTHS[month] + " " + year;
        selectYear.value = year;
        selectMonth.value = month;

        // creating all cells
        let date = 1;
        for (let i = 0; i < 6; i++) {
            // creates a table row
            let row = document.createElement("tr");

            //creating individual cells, filing them up with data.
            for (let j = 0; j < 7; j++) {
                var cell = document.createElement("td");
                var cellText;
                if (i === 0 && j < firstDay) {
                    cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                else if (date > this.daysInMonth(month, year)) {
                    break;
                }
                else {
                    cell.classList.add("day_cell");
                    cellText = document.createElement("p");
                    cellText.innerText = date;
                    cellText.classList.add("day_text");

                    if (date === this.state.today.getDate() && year === this.state.today.getFullYear() && month === this.state.today.getMonth()) {
                        cell.classList.add("bg-info");
                    } 
                    
                    let currentDateString = this.getComparableDate(year, month, date);
                    if (this.formatDateForDB(this.props.currentDate).localeCompare(currentDateString) === 0) {
                        cell.classList.remove("bg-info");
                        cell.classList.add("bg-primary");
                    }
                    
                    if (this.props.eventDates.includes(currentDateString)) {
                        var cellMarker = document.createElement("div");
                        cellMarker.classList.add("event_marker");

                        var eventsForDate = this.props.eventsData.filter((event) => {
                            return currentDateString.localeCompare(event.FormattedEventDate) === 0;
                        });

                        if (eventsForDate) {
                            if (eventsForDate[0].ResultName.localeCompare("Success") === 0) {
                                cellMarker.classList.add("success_day");
                            } else if (eventsForDate[0].ResultName.localeCompare("Failure") === 0) {
                                cellMarker.classList.add("failure_day");
                            }
                        }
                        cell.appendChild(cellMarker);
                        cell.onclick = ((currentDateString) => {
                            return () => {
                                var newCurrentDate = new Date(currentDateString);
                                newCurrentDate.setTime(newCurrentDate.getTime() + newCurrentDate.getTimezoneOffset() * 60 * 1000);
                                this.props.changeDate(newCurrentDate);
                            };
                        })(currentDateString);
                    }
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    date++;
                }


            }

            tbl.appendChild(row); // appending each row into calendar body.
        }

    }

    sendToRecord(currentDateString) {
        // window.location.href = "./../record/?date=" + currentDateString;
    }

    // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
    daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    formatDateForDB = (currentDate) => {
        var newYear = currentDate.getFullYear();
        var newMonth = currentDate.getMonth() + 1;
        var newDate = currentDate.getDate();
        if (newMonth < 10) newMonth = "0" + newMonth;
        if (newDate < 10) newDate = "0" + newDate;
        return newYear + "-" + newMonth + "-" + newDate;
    }

    getComparableDate = (year, month, date) => {
        var newYear = year;
        var newMonth = month + 1;
        var newDate = date;
        if (newMonth < 10) newMonth = "0" + newMonth;
        if (newDate < 10) newDate = "0" + newDate;
        return newYear + "-" + newMonth + "-" + newDate;
    }

    checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }

    displayError = (error) => {
        console.log(error);
    }

    render() {
        return (
            <div>
                <h3 className="card-header" id="monthAndYear">YYYY-MM-DD</h3>
                <table className="table table-bordered" id="calendar">
                    <thead>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>

                    <tbody id="calendar-body">
                        
                    </tbody>
                </table>

                <CalendarLegend />

                <div className="form-inline">

                    <button className="btn btn-outline-primary col-sm-6 mt-2" id="previous" onClick={this.previous}>Previous</button>

                    <button className="btn btn-outline-primary col-sm-6 mt-2" id="next" onClick={this.next}>Next</button>
                </div>
                <br />
                <form className="form-inline">
                    <label className="lead mr-2 ml-2" htmlFor="month">Jump To: </label>
                    <select className="form-control col-sm-4" name="month" id="month" onChange={this.jump}>
                        <option value={0}>Jan</option>
                        <option value={1}>Feb</option>
                        <option value={2}>Mar</option>
                        <option value={3}>Apr</option>
                        <option value={4}>May</option>
                        <option value={5}>Jun</option>
                        <option value={6}>Jul</option>
                        <option value={7}>Aug</option>
                        <option value={8}>Sep</option>
                        <option value={9}>Oct</option>
                        <option value={10}>Nov</option>
                        <option value={11}>Dec</option>
                    </select>


                    <label htmlFor="year"></label><select className="form-control col-sm-4" name="year" id="year" onChange={this.jump}>
                        <option value={1990}>{1990}</option>
                        <option value={1991}>{1991}</option>
                        <option value={1992}>{1992}</option>
                        <option value={1993}>{1993}</option>
                        <option value={1994}>{1994}</option>
                        <option value={1995}>{1995}</option>
                        <option value={1996}>{1996}</option>
                        <option value={1997}>{1997}</option>
                        <option value={1998}>{1998}</option>
                        <option value={1999}>{1999}</option>
                        <option value={2000}>{2000}</option>
                        <option value={2001}>{2001}</option>
                        <option value={2002}>{2002}</option>
                        <option value={2003}>{2003}</option>
                        <option value={2004}>{2004}</option>
                        <option value={2005}>{2005}</option>
                        <option value={2006}>{2006}</option>
                        <option value={2007}>{2007}</option>
                        <option value={2008}>{2008}</option>
                        <option value={2009}>{2009}</option>
                        <option value={2010}>{2010}</option>
                        <option value={2011}>{2011}</option>
                        <option value={2012}>{2012}</option>
                        <option value={2013}>{2013}</option>
                        <option value={2014}>{2014}</option>
                        <option value={2015}>{2015}</option>
                        <option value={2016}>{2016}</option>
                        <option value={2017}>{2017}</option>
                        <option value={2018}>{2018}</option>
                        <option value={2019}>{2019}</option>
                        <option value={2020}>{2020}</option>
                        <option value={2021}>{2021}</option>
                        <option value={2022}>{2022}</option>
                        <option value={2023}>{2023}</option>
                        <option value={2024}>{2024}</option>
                        <option value={2025}>{2025}</option>
                        <option value={2026}>{2026}</option>
                        <option value={2027}>{2027}</option>
                        <option value={2028}>{2028}</option>
                        <option value={2029}>{2029}</option>
                        <option value={2030}>{2030}</option>
                    </select></form>
            </div>
        );
    }
}

export default Calendar;

