
  function TrimAuditRatio(auditRatio) {
    // Convert the audit ratio to a number and round it to two decimal places
    const roundedRatio = parseFloat(auditRatio).toFixed(2);
    return roundedRatio;
  }

export default TrimAuditRatio;