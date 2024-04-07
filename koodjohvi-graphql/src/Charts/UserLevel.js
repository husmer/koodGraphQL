const CircleWithLevel = ({ level }) => {
  const circleRadius = 80;
  const circleCenterX = 110;
  const circleCenterY = 110;
  const textStyle = { fontSize: 80, fill: 'rgba(6, 105, 255, 1)', textAnchor: 'middle', dominantBaseline: 'central', fontWeight: 'bold' };
  const outlineStyle = { ...textStyle, fill: 'black' }; // Style for the outline text

  return (
    <svg width={200} height={200}>
      <circle cx={circleCenterX} cy={circleCenterY} r={circleRadius} fill="#ff6600" />
      <text x={circleCenterX} y={circleCenterY} style={{ ...outlineStyle, transform: 'translate(1px, 1px)' }}>
        {level}
      </text>
      <text x={circleCenterX} y={circleCenterY} style={textStyle}>
        {level}
      </text>
    </svg>
  );
};

export default CircleWithLevel;
