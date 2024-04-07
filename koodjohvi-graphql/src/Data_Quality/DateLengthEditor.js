
function TrimAccountCreated(accountCreated) {
    // Split the date and time using 'T' as a separator
    const parts = accountCreated.split('T');
    return parts[0];
  }

export default TrimAccountCreated;