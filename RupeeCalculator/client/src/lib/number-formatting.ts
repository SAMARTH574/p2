export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatLargeNumber(num: number): string {
  if (num >= 10000000) { // 1 crore
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) { // 1 lakh
    return `₹${(num / 100000).toFixed(2)} L`;
  } else if (num >= 1000) { // 1 thousand
    return `₹${(num / 1000).toFixed(2)} K`;
  }
  return formatCurrency(num);
}

export function parseIndianNumber(value: string): number {
  // Remove currency symbols and spaces
  const cleaned = value.replace(/[₹,\s]/g, '');
  return parseFloat(cleaned) || 0;
}

export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}
