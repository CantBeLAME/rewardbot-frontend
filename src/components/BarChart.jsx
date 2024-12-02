import '../style/BarChart.css';
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, value, label, title }) => {
    let myReference = React.createRef();
    let dataset = data;

    let settings = {
        viewBox: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        },
        title: {
            x: 0,
            y: 0,
            width: 100,
            height: 10,
            baseline: 5
        },
        labels: {
            x: 10,
            y: 90,
            width: 90,
            height: 5,
            baseline: 2
        },
        values: {
            x: 5,
            y: 10,
            width: 5,
            height: 85,
            baseline: 4.5
        },
        bars: {
            x: 10,
            y: 10,
            width: 90,
            height: 80,
            ratio: 0.7
        }
    };
    let svg = null;

    const init = () => {
        let container = d3.select(myReference.current);
        container.selectAll("*").remove();

        svg = container
            .append("svg")
            .attr("viewBox", `${settings.viewBox.x} ${settings.viewBox.y} ${settings.viewBox.width} ${settings.viewBox.height}`)
            .attr("preserveAspectRatio", "none");
    };

    const paint = () => {
        svg.selectAll("*").remove();

        // Title
        svg.append("g")
            .attr("id", "title")
            .append("text")
            .attr("x", (settings.title.x + settings.title.width) / 2)
            .attr("y", settings.title.y + settings.title.height - settings.title.baseline)
            .text(title);

        if (dataset.length > 0) paintData();
    };

    const paintData = () => {
        // Extract keys for stacking
        if (dataset.length === 0) return;
        
        const keys = Object.keys(dataset[0]);

        // Prepare stacked data
        const stack = d3.stack().keys(keys);
        const stackedData = stack(dataset.map(d => ({ ...d.value, label: d.label })));
        console.log("stacked",keys)

        // Scales
        const xScale = d3
            .scaleBand()
            .domain(dataset.map(d => d.label))
            .range([settings.bars.x, settings.bars.x + settings.bars.width])
            .padding(0.1);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])])
            .range([settings.bars.y + settings.bars.height, settings.bars.y]);

        const colorScale = d3
            .scaleOrdinal()
            .domain(keys)
            .range(d3.schemeCategory10);

            console.log(colorScale)

        // Draw bars
        const barGroups = svg
            .selectAll("g.bar-group")
            .data(stackedData)
            .enter()
            .append("g")
            .attr("class", "bar-group")
            .attr("fill", d => colorScale(d.key));

        barGroups
            .selectAll("rect")
            .data(d => d)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.data.label))
            .attr("y", d => yScale(d[1]))
            .attr("height", d => yScale(d[0]) - yScale(d[1]))
            .attr("width", xScale.bandwidth());

        // Add labels
        svg.append("g")
            .attr("id", "labels")
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("x", d => xScale(d.label) + xScale.bandwidth() / 2)
            .attr("y", settings.labels.y + settings.labels.height - settings.labels.baseline)
            .attr("text-anchor", "middle")
            .text(d => truncateText(d.label, 15));

        // Add y-axis values
        svg.append("g")
            .attr("id", "values")
            .selectAll("text")
            .data(yScale.ticks(5))
            .enter()
            .append("text")
            .attr("x", settings.values.x)
            .attr("y", d => yScale(d))
            .attr("text-anchor", "end")
            .text(d => d.toFixed(1));
    };

    useEffect(() => {
        init();
        paint();
    }, [data, title, label, value]);

    return <div className={"container"} ref={myReference}></div>;
};

export default BarChart;

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength - 3) + '...';
    }
    return text;
}
