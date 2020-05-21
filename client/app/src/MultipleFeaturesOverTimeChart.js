import React from 'react';
import * as d3 from "d3";

export default class MultipleFeaturesOverTimeChart extends React.Component {

    constructor(props) {
        super(props);

        this.GET_EVENTS_FOR_USER_URL = process.env.REACT_APP_BACKEND_URL + "/users/events";
        this.GET_MOOD_REPORTS_URL = process.env.REACT_APP_BACKEND_URL + "/users/mood-reports/";

        this.chartContainer = React.createRef();

        this.state = {
            eventsData: [],
            moodReports: [],
            chartWidth: 400
        }
    }

    componentDidMount() {
        this.loadMoodReports();
        this.loadEvents();

        window.addEventListener("resize", this.updateDimensions.bind(this));

        this.setState({
            chartWidth: this.chartContainer.current.offsetWidth
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    componentDidUpdate() {
        this.clearOldChart();
        this.createChart();
    }

    updateDimensions() {
        this.setState({
            chartWidth: this.chartContainer.current.offsetWidth
        });
    }

    loadEvents() {
        fetch(this.GET_EVENTS_FOR_USER_URL, {
            credentials: 'include'
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                this.setState({
                    eventsData: responseJSON
                });
            })
            .catch(this.displayError);
    }

    loadMoodReports() {
        fetch(this.GET_MOOD_REPORTS_URL, {
            credentials: 'include'
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                this.setState({
                    moodReports: responseJSON
                })
            })
            .catch(this.displayError);
    }



    createChart() {
        // let eventsData = this.parseEventsData();
        let moodData = this.parseMoodReports();
        // let chartData = this.parseChartData(eventsData, moodData);
        let chartDimensions = this.calculateChartDimensions();
        let chart = this.createChartElement(chartDimensions);
        let scales = this.calculateScales(moodData, chartDimensions);

        this.createXAxis(chart, moodData, chartDimensions, scales.xScale);
        this.createYAxis(chart, moodData, chartDimensions, scales.yScale);
        this.createTrendLine(chart, scales, moodData);
    }

    parseChartData(eventsData, moodData) {
        console.log(eventsData)
        console.log(moodData)

        let dataByDate = [];

        for (const event of eventsData) {
            for (const moodReport of moodData) {
                if (event.EventDate.toLocaleString() === moodReport.MoodReportDate.toLocaleString()) {
                    console.log(event.EventDate.toISOString())
                    console.log("true")
                    let newDatePoint = {
                        PointDate: event.EventDate.toISOString(),
                        SuccessRate: event.SuccessRate,
                        MoodValue: moodReport.MoodReportValue
                    };
                    dataByDate.push(newDatePoint);
                }
            }
        }

        console.log(dataByDate)
        return dataByDate;
    }

    parseEventsData() {
        let eventsData = this.getEventsWithResults();
        eventsData = this.orderEventsByDate(eventsData);
        eventsData = this.calculateRollingTotalSuccessRate(eventsData);

        return eventsData;
    }

    getEventsWithResults() {
        return this.state.eventsData.filter(event => event.ResultName !== "Pending");
    }

    orderEventsByDate(eventsData) {
        eventsData = eventsData.map(event => {
            event.EventDate = new Date(event.EventDate);
            return event;
        });

        eventsData.sort((a, b) => a.EventDate - b.EventDate);

        return eventsData;
    }

    calculateRollingTotalSuccessRate(eventsData) {
        var totalSuccesses = 0, totalEvents = 0;

        var cumulativeEventsData = eventsData.map(event => {
            if (event.ResultName === "Success") {
                totalSuccesses++;
            }
            totalEvents++;
            event.SuccessRate = totalSuccesses / totalEvents * 100;
            return event;
        });

        return cumulativeEventsData;
    }

    parseMoodReports() {
        let moodReports = this.state.moodReports;
        moodReports = this.orderReportsByDate(moodReports);

        moodReports = moodReports.map(report => {
            let newReport = {
                MoodReportDate: report.MoodReportDate,
                MoodReportValue: report.MoodValueName
            };
            report = newReport;
            return report;
        });

        return moodReports;
    }

    orderReportsByDate(moodReports) {
        moodReports = moodReports.map(report => {
            report.MoodReportDate = new Date(report.MoodReportDate);
            return report;
        });

        moodReports.sort((a, b) => a.MoodReportDate - b.MoodReportDate);

        return moodReports;
    }

    calculateChartDimensions() {
        let margin = this.calcMargins();
        let width = this.state.chartWidth - margin.left - margin.right

        let height = width * .75 - margin.top - margin.bottom;
        if (this.state.chartWidth < 500) {
            height = width * 1.2 - margin.top - margin.bottom;
        }

        return {
            width: width,
            height: height,
            margin: margin
        }
    }

    calcMargins() {
        if (this.state.chartWidth < 500) {
            return { top: 10, right: 60, bottom: 90, left: 95 };
        }
        return { top: 10, right: 60, bottom: 120, left: 110 };
    }

    clearOldChart() {
        d3.select("#featuresChart").html("");
    }

    createChartElement(chartDimensions) {
        return d3.select("#featuresChart")
            .append("svg")
            .attr("width", chartDimensions.width + chartDimensions.margin.left + chartDimensions.margin.right)
            .attr("height", chartDimensions.height + chartDimensions.margin.top + chartDimensions.margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + chartDimensions.margin.left + "," + chartDimensions.margin.top + ")");
    }

    calculateScales(moodData, chartDimensions) {
        let xScale = this.createXScale(moodData, chartDimensions);
        let yScale = this.createYScale(moodData, chartDimensions);
        let colorScale = this.createColorScale(moodData);

        return {
            xScale: xScale,
            yScale: yScale,
            colorScale: colorScale
        }
    }

    createXScale(data, chartDimensions) {
        return d3.scaleTime()
            .domain(d3.extent(data, function (d) { return d.MoodReportDate; }))
            .range([0, chartDimensions.width]);
    }

    createYScale(data, chartDimensions) {
        return d3.scaleBand()
            .domain(["Below Average", "Average", "Above Average"])
            .range([chartDimensions.height, 0]);
    }

    createColorScale(data) {
        return;
    }

    createXAxis(chart, cumulativeEventsData, chartDimensions, xScale) {
        chart.append("g")
            .attr("transform", "translate(0," + chartDimensions.height + ")")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("font-size", this.calcXLabelFontSize())
            .attr("transform", "rotate(-65)");

        this.createXAxisLabel(chart, chartDimensions);
    }

    calcXLabelFontSize() {
        if (this.state.chartWidth < 500) {
            return "10px";
        }
        return "14px";
    }

    createXAxisLabel(chart, chartDimensions) {
        chart.append("text")
            .attr("transform",
                "translate(" + (chartDimensions.width / 2) + " ," +
                (chartDimensions.height + chartDimensions.margin.top + chartDimensions.margin.bottom - 24) + ")")
            .style("text-anchor", "middle")
            .text("Date")
            .attr("font-size", this.calcLabelFontSize());
    }

    createYAxis(chart, moodData, chartDimensions, yScale) {
        chart.append("g")
            .call(d3.axisLeft(yScale).ticks(d3.max(d3.values(moodData)) + 1))

        this.createYAxisLabel(chart, chartDimensions);
    }

    createYAxisLabel(chart, chartDimensions) {
        chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - chartDimensions.margin.left)
            .attr("x", 0 - (chartDimensions.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Mood Quality")
            .attr("font-size", this.calcLabelFontSize());
    }

    calcLabelFontSize() {
        if (this.state.chartWidth < 500) {
            return "10px";
        }
        return "14px";
    }

    createTrendLine(chart, scales, cumulativeEventsData) {
        chart.append("path")
            .datum(cumulativeEventsData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 4)
            .attr("d", d3.line()
                .x(function (d) { return scales.xScale(d.MoodReportDate) })
                .y(function (d) { return scales.yScale(d.MoodReportValue) + scales.yScale.bandwidth() / 2 })
                // .curve(d3.curveCardinal)
            );
    }

    render() {
        return (
            <div ref={this.chartContainer} className="card-body">
                <h5 className="card-title">Success, Mood, and Sleep Over Time</h5>
                <div className="d-flex justify-content-center" id="featuresChart"></div>
            </div>
        );
    }
}