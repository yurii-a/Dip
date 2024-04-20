const formatCurrency = (
  amount: number,
  showDecimals: boolean = false,
): string => {
  // Check if amount is not a number
  if (isNaN(amount)) {
    return 'Invalid number';
  }

  // Format the number using toLocaleString with currency option
  const formattedAmount = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    useGrouping: true, // This enables thousands grouping
    minimumFractionDigits: 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  return formattedAmount;
};

export default formatCurrency;
