import React from 'react';
import * as d3 from "d3";

export default class CommonReasonsForFailureChart extends React.Component {

    constructor(props) {
        super(props);

        this.GET_EVENTS_FOR_USER_URL = process.env.REACT_APP_BACKEND_URL + "/users/events";
        this.GET_REASONS_URL = process.env.REACT_APP_BACKEND_URL + "/events/:eventid/reasons";

        this.chartContainer = React.createRef();

        this.state = {
            reasonsData: [],
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
                this.getAllReasonsForAllEvents(responseJSON);
            })
            .catch(this.displayError);
    }

    async getAllReasonsForAllEvents(eventsData) {
        let reasonsArray = [];
        for (const event of eventsData) {
            event.Reasons = await this.fetchReasons(event.EventID);
            for (const reason of event.Reasons) {
                reasonsArray.push(reason);
            }
        }
        this.setState({
            reasonsData: reasonsArray
        });
    }

    async fetchReasons(eventid) {
        return await fetch(this.GET_REASONS_URL.replace(":eventid", eventid), {
            credentials: 'include',
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json()
            })
            .catch(this.displayError);
    }

    createChart() {
        let chartData = this.parseEventsData();
        let chartDimensions = this.calculateChartDimensions();
        let chart = this.createChartElement(chartDimensions);
        let scales = this.calculateScales(chartData, chartDimensions);

        this.createXAxis(chart, chartData, chartDimensions, scales.xScale);
        this.createYAxis(chart, chartData, chartDimensions, scales.yScale);
        this.createBars(chart, scales, chartData);
    }

    parseEventsData() {
        let reasonsData = this.state.reasonsData;

        reasonsData = reasonsData.reduce((acc, cum) => {
            if (acc[cum.ReasonName]) {
                acc[cum.ReasonName] += 1;
            } else {
                acc[cum.ReasonName] = 1;
            }
            return acc;
        }, {});

        return reasonsData;
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
        return { top: 10, right: 60, bottom: 120, left: 60 };
    }

    clearOldChart() {
        d3.select("#failureReasonsChart").html("");
    }

    createChartElement(chartDimensions) {
        return d3.select("#failureReasonsChart")
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
        let colorScale = this.createColorScale(chartData);

        return {
            xScale: xScale,
            yScale: yScale,
            colorScale: colorScale
        }
    }

    createXScale(data, chartDimensions) {
        return d3.scaleBand()
            .domain(d3.keys(data))
            .range([0, chartDimensions.width])
            .padding(0.1);
    }

    createYScale(data, chartDimensions) {
        return d3.scaleLinear()
            .domain([0, d3.max(d3.values(data)) + 1]).nice()
            .range([chartDimensions.height, 0]);
    }

    createColorScale(data) {
        return d3.scaleSequential()
                    .domain([0, d3.keys(data).length])
                    .interpolator(d3.interpolateViridis);
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
            .text("Reason")
            .attr("font-size", this.calcLabelFontSize());
    }

    createYAxis(chart, chartData, chartDimensions, yScale) {
        chart.append("g")
            .call(d3.axisLeft(yScale).ticks(d3.max(d3.values(chartData))+ 1))

        this.createYAxisLabel(chart, chartDimensions);
    }

    createYAxisLabel(chart, chartDimensions) {
        chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - chartDimensions.margin.left)
            .attr("x", 0 - (chartDimensions.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Occurences")
            .attr("font-size", this.calcLabelFontSize());
    }

    calcLabelFontSize() {
        if (this.state.chartWidth < 500) {
            return "10px";
        }
        return "14px";
    }

    createBars(chart, scales, data) {
        chart.append("g")
            .selectAll("rect")
            .data(d3.entries(data))
            .join("rect")
            .attr("x", (d, i) => scales.xScale(d.key))
            .attr("y", d => scales.yScale(d.value))
            .attr("height", d => scales.yScale(0) - scales.yScale(d.value))
            .attr("width", scales.xScale.bandwidth())
            .attr("fill", (d, i) => scales.colorScale(i));
    }

    render() {
        return (
            <div ref={this.chartContainer} className="card-body">
                <h5 className="card-title">Most Common Reasons for Failure</h5>
                <div className="d-flex justify-content-center" id="failureReasonsChart"></div>
            </div>
        );
    }
}