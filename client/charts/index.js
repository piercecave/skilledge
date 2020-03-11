"use strict";

const GET_EVENTS_FOR_USER_URL = "https://api.skilledge.site/users/events";

/**
 *  Functions that will be called once the window is loaded
 */

let state = {
    currentDate: new Date()
}

window.addEventListener("load", () => {
    loadEvents();
});

const loadEvents = (currentDate) => {

    fetch(GET_EVENTS_FOR_USER_URL, {
        credentials: 'include'
    })
        .then(checkStatus)
        .then((response) => {
            return response.json();
        })
        .then(createCharts)
        .catch(displayError);
}

const createCharts = (responseJSON) => {

    console.log(responseJSON);

    // Filter out pending events
    var eventsData = responseJSON.filter(event => event.ResultName != "Pending");

    // Order by date
    eventsData.sort((a, b) => a.EventDate - b.EventDate);

    // For each event calculate rolling (total successes / total events)
    var totalSuccesses = 0, totalEvents = 0;
    var cumulativeEventsData = eventsData.map(event => {
        if (event.ResultName == "Success") {
            totalSuccesses++;
        }
        totalEvents++;
        event.SuccessRate = totalSuccesses / totalEvents * 100;
        event.EventDate = new Date(event.EventDate);
        return event;
    });

    // Order by date
    cumulativeEventsData.sort((a, b) => a.EventDate - b.EventDate);

    // Visualize using d3

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 90, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#successRateChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime()
        .domain(d3.extent(cumulativeEventsData, function (d) { return d.EventDate; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(cumulativeEventsData.length + 1))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // text label for the x axis
    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + margin.bottom - 24) + ")")
        .style("text-anchor", "middle")
        .text("Date");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(cumulativeEventsData, function (d) { return +d.SuccessRate; }) + 10])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Success Rate (%)");

    // Add the line
    svg.append("path")
        .datum(cumulativeEventsData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d.EventDate) })
            .y(function (d) { return y(d.SuccessRate) })
        )
}

/**
 * Function to handle the result of an unsuccessful fetch call
 * @param {Object} error - Error resulting from unsuccesful fetch call 
 */
const displayError = (error) => {
    console.log(error);
}

const formatDateForDB = (currentDate) => {
    var newYear = currentDate.getFullYear();
    var newMonth = currentDate.getMonth() + 1;
    var newDate = currentDate.getDate();
    if (newMonth < 10) newMonth = "0" + newMonth;
    if (newDate < 10) newDate = "0" + newDate;
    return newYear + "-" + newMonth + "-" + newDate;
}


/* ------------------------------ Helper Functions  ------------------------------ */

/**
 * Helper function to return the response's result text if successful, otherwise
 * returns the rejected Promise result with an error status and corresponding text
 * @param {Object} response Response to check for success/error
 * @returns {Object} Valid result text if response was successful, otherwise rejected
 *                   Promise result
 */
const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
}