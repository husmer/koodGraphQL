import React from 'react';

const AuditRatioBar = ({ auditRatio }) => {
    // Calculate the width of the bar based on the audit ratio
    const barWidth = 250 * Math.min(auditRatio, 1.2) / 1.2;

    // Bar colours
    let barColor;
    if (auditRatio >= 0 && auditRatio <= 0.5) {
        barColor = 'red';
    } else if (auditRatio > 0.5 && auditRatio <= 0.8) {
        barColor = 'yellow';
    } else if (auditRatio > 0.8 && auditRatio <= 1.2) {
        barColor = 'green';
    } else {
        barColor = 'purple';
    }

    return (
        <div style={{ width: '250px', height: '20px', border: '1px solid black' }}>
            <div
                style={{
                    width: `${barWidth}px`, // Width based on the audit ratio
                    height: '100%',
                    backgroundColor: barColor
                }}
            ></div>
        </div>
    );
};

export default AuditRatioBar;
