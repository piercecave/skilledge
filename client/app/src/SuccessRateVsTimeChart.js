import React from 'react';
import * as d3 from "d3";

export class SuccessRateVsTimeChart extends React.Component {

    constructor(props) {
        super(props);

        this.GET_EVENTS_FOR_USER_URL = process.env.REACT_APP_BACKEND_URL + "/users/events";

        this.chartContainer = React.createRef();

        this.state = {
            eventsData: [],
            chartWidth: 400
        }
    }

    componentDidMount() {
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

    createChart() {
        let chartData = this.parseEventsData();
        let chartDimensions = this.calculateChartDimensions();
        let chart = this.createChartElement(chartDimensions);
        let scales = this.calculateScales(chartData, chartDimensions);

        this.createXAxis(chart, chartData, chartDimensions, scales.xScale);
        this.createYAxis(chart, chartDimensions, scales.yScale);
        this.createTrendLine(chart, scales, chartData);
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
            return { top: 10, right: 60, bottom: 90, left: 45 };
        }
        return { top: 10, right: 60, bottom: 90, left: 60 };
    }

    clearOldChart() {
        d3.select("#successRateChart").html("");
    }

    createChartElement(chartDimensions) {
        return d3.select("#successRateChart")
            .append("svg")
            .attr("width", chartDimensions.width + chartDimensions.margin.left + chartDimensions.margin.right)
            .attr("height", chartDimensions.height + chartDimensions.margin.top + chartDimensions.margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + chartDimensions.margin.left + "," + chartDimensions.margin.top + ")");
    }

    calculateScales(chartData, chartDimensions) {
        let xScale = this.createXScale(chartData, chartDimensions);
        let yScale = this.createYScale(chartData, chartDimensions);

        return {
            xScale: xScale,
            yScale: yScale
        }
    }

    createXScale(cumulativeEventsData, chartDimensions) {
        return d3.scaleTime()
            .domain(d3.extent(cumulativeEventsData, function (d) { return d.EventDate; }))
            .range([0, chartDimensions.width]);
    }

    createYScale(cumulativeEventsData, chartDimensions) {
        return d3.scaleLinear()
            .domain([0, d3.max(cumulativeEventsData, function (d) { return +d.SuccessRate; }) + 10])
            .range([chartDimensions.height, 0]);
    }

    createXAxis(chart, cumulativeEventsData, chartDimensions, xScale) {
        chart.append("g")
            .attr("transform", "translate(0," + chartDimensions.height + ")")
            .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(cumulativeEventsData.length + 1))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
            
        this.createXAxisLabel(chart, chartDimensions);
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

    createYAxis(chart, chartDimensions, yScale) {
        chart.append("g")
            .call(d3.axisLeft(yScale))

        this.createYAxisLabel(chart, chartDimensions);
    }

    createYAxisLabel(chart, chartDimensions) {
        chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - chartDimensions.margin.left)
            .attr("x", 0 - (chartDimensions.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Success Rate (%)")
            .attr("font-size", this.calcLabelFontSize());
    }

    calcLabelFontSize() {
        if (this.state.chartWidth < 500) {
            return "10px";
        }
        return "16px";
    }

    createTrendLine(chart, scales, cumulativeEventsData) {
        chart.append("path")
            .datum(cumulativeEventsData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 4)
            .attr("d", d3.line()
                .x(function (d) { return scales.xScale(d.EventDate) })
                .y(function (d) { return scales.yScale(d.SuccessRate) })
                .curve(d3.curveCardinal)
            );
    }

    render() {
        return (
            <div ref={this.chartContainer} className="card-body">
                <h5 className="card-title">Success Rate / Time</h5>
                <div className="d-flex justify-content-center" id="successRateChart"></div>
            </div>
        );
    }
}

export default SuccessRateVsTimeChart;