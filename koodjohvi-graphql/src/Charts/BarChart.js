const BarChart = ({ data, labels, width, height, barColor }) => {
  const padding = { top: 20, right: 20, bottom: 165, left: 20 };
  const barPadding = 5; 
  const totalBarPadding = barPadding * (data.length - 1);
  const barWidth = (width - padding.left - padding.right - totalBarPadding) / data.length;
  const maxValue = Math.max(...data);
  const scaleFactor = (height - padding.top - padding.bottom) / maxValue;

  return (
    <svg width={width} height={height}>
      {/* Draw x-axis line */}
      <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="black" strokeWidth="1" />

      {/* Draw bars and labels */}
      {data.map((value, index) => (
        <g key={index}>
          {/* Draw bars */}
          <rect
            x={index * (barWidth + barPadding) + padding.left}
            y={height - padding.bottom - value * scaleFactor}
            width={barWidth}
            height={value * scaleFactor}
            fill={barColor}
          />

          {/* Draw x-axis labels */}
          <text
            fill="black"
            fontSize="12"
            transform={`translate(${index * (barWidth + barPadding) + padding.left + 25},${height - padding.bottom + 5}) rotate(70)`}
            textAnchor="start"
          >
            {labels && labels[index]}
          </text>

          {/* Draw y-axis labels on top of each bar */}
          <text
            x={index * (barWidth + barPadding) + barWidth / 2 + padding.left}
            y={height - padding.bottom - value * scaleFactor - 5}
            fill="black"
            fontSize="12"
            textAnchor="middle"
          >
            {value}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default BarChart;
