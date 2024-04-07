import React from 'react';

const XPOverTimeChart = ({ xpData }) => {
    // Step 1: Parse the xpData array to extract createdAt dates and XP amounts
    const data = xpData.map(entry => ({
        date: new Date(entry.createdAt).toLocaleDateString(), // Format createdAt date
        xp: entry.amount
    }));

    // Calculate cumulative XP for each date
    let cumulativeXP = 0;
    const chartData = data.map((entry, index) => {
        cumulativeXP += entry.xp;
        return {
            date: entry.date,
            xp: cumulativeXP
        };
    });

    // Define SVG dimensions and padding
    const svgWidth = 800;
    const svgHeight = 400;
    const padding = { top: 20, right: 30, bottom: 80, left: 80 };

    // Calculate chart area dimensions
    const chartWidth = svgWidth - padding.left - padding.right;
    const chartHeight = svgHeight - padding.top - padding.bottom;

    // Find the maximum XP value for setting the Y-axis scale
    const maxY = Math.max(...chartData.map(entry => entry.xp));

    // Calculate Y-axis scale
    const yScale = maxY > 0 ? chartHeight / maxY : 1;

    // Calculate X-axis scale
    const xScale = chartWidth / (chartData.length - 1);

    // Create path for the line
    const linePath = `M${padding.left},${svgHeight - padding.bottom - chartData[0].xp * yScale} ` +
        chartData.map((entry, index) => `L${index * xScale + padding.left},${svgHeight - padding.bottom - entry.xp * yScale}`).join(' ');

    // Create X-axis ticks
    const xTicks = chartData.map((entry, index) => (
        <text key={index} x={index * xScale + padding.left} y={svgHeight - padding.bottom + 15} transform={`rotate(70, ${index * xScale + padding.left}, ${svgHeight - padding.bottom + 15})`} fill="black" fontSize="12" textAnchor="start">
            {entry.date}
        </text>
    ));

    // Create Y-axis ticks
    const yTicks = [0, maxY].map((value, index) => (
        <text key={index} x={padding.left - 10} y={svgHeight - padding.bottom - value * yScale + 5} textAnchor="end" >
            {value}
        </text>
    ));
    // Define X-axis line
    const xAxis = (
        <line
            x1={padding.left}
            y1={svgHeight - padding.bottom}
            x2={svgWidth - padding.right}
            y2={svgHeight - padding.bottom}
            stroke="black"
            strokeWidth="1"
        />
    );

    // Define Y-axis line
    const yAxis = (
        <line
            x1={padding.left}
            y1={svgHeight - padding.bottom}
            x2={padding.left}
            y2={padding.top}
            stroke="black"
            strokeWidth="1"
        />
    );

    return (
        <svg width={svgWidth} height={svgHeight}>
            {/* X-axis */}
            {xTicks}
            {xAxis}
            
            {/* Y-axis */}
            {yTicks}
            {yAxis}

            {/* Line */}
            <path d={linePath} fill="none" stroke="#ff6600" strokeWidth="3" />
        </svg>
    );
};

export default XPOverTimeChart;
