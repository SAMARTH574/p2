export interface CompoundInterestInputs {
  principal: number;
  rate: number;
  years: number;
  frequency: 'yearly' | 'quarterly' | 'monthly' | 'daily';
}

export interface CompoundInterestResults {
  principal: number;
  interest: number;
  total: number;
  yearlyBreakdown: Array<{
    year: number;
    amount: number;
    interest: number;
  }>;
}

export interface HomeLoanInputs {
  amount: number;
  rate: number;
  tenure: number;
}

export interface HomeLoanResults {
  monthlyEMI: number;
  totalAmount: number;
  totalInterest: number;
  yearlyBreakdown: Array<{
    year: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export interface SIPInputs {
  monthlyAmount: number;
  rate: number;
  years: number;
}

export interface SIPResults {
  totalInvestment: number;
  futureValue: number;
  totalReturns: number;
  yearlyBreakdown: Array<{
    year: number;
    invested: number;
    value: number;
    returns: number;
  }>;
}

export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  monthlyExpenses: number;
  inflationRate: number;
  expectedReturn: number;
}

export interface RetirementResults {
  yearsToRetirement: number;
  futureMonthlyExpenses: number;
  corpusRequired: number;
  monthlyInvestmentRequired: number;
}

export interface GoalInputs {
  goalAmount: number;
  timeToGoal: number;
  expectedReturn: number;
  inflationRate: number;
}

export interface GoalResults {
  inflationAdjustedGoal: number;
  monthlyInvestmentRequired: number;
  totalInvestment: number;
  totalReturns: number;
}

export function calculateCompoundInterest(inputs: CompoundInterestInputs): CompoundInterestResults {
  const { principal, rate, years, frequency } = inputs;
  
  const frequencies = {
    yearly: 1,
    quarterly: 4,
    monthly: 12,
    daily: 365
  };
  
  const n = frequencies[frequency];
  const r = rate / 100;
  const t = years;
  
  const amount = principal * Math.pow(1 + r / n, n * t);
  const interest = amount - principal;
  
  const yearlyBreakdown = [];
  for (let year = 1; year <= years; year++) {
    const yearAmount = principal * Math.pow(1 + r / n, n * year);
    const yearInterest = yearAmount - principal;
    yearlyBreakdown.push({
      year,
      amount: yearAmount,
      interest: yearInterest
    });
  }
  
  return {
    principal,
    interest,
    total: amount,
    yearlyBreakdown
  };
}

export function calculateHomeLoan(inputs: HomeLoanInputs): HomeLoanResults {
  const { amount, rate, tenure } = inputs;
  
  const monthlyRate = rate / (12 * 100);
  const totalMonths = tenure * 12;
  
  const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const totalAmount = emi * totalMonths;
  const totalInterest = totalAmount - amount;
  
  const yearlyBreakdown = [];
  let balance = amount;
  
  for (let year = 1; year <= tenure; year++) {
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    
    for (let month = 1; month <= 12 && balance > 0; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      
      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;
      balance -= principalPayment;
    }
    
    yearlyBreakdown.push({
      year,
      emi: emi * 12,
      principal: yearlyPrincipal,
      interest: yearlyInterest,
      balance: Math.max(0, balance)
    });
  }
  
  return {
    monthlyEMI: emi,
    totalAmount,
    totalInterest,
    yearlyBreakdown
  };
}

export function calculateSIP(inputs: SIPInputs): SIPResults {
  const { monthlyAmount, rate, years } = inputs;
  
  const monthlyRate = rate / (12 * 100);
  const totalMonths = years * 12;
  
  const futureValue = monthlyAmount * 
    (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate * (1 + monthlyRate);
  
  const totalInvestment = monthlyAmount * totalMonths;
  const totalReturns = futureValue - totalInvestment;
  
  const yearlyBreakdown = [];
  let cumulativeInvestment = 0;
  let cumulativeValue = 0;
  
  for (let year = 1; year <= years; year++) {
    const monthsCompleted = year * 12;
    const yearInvestment = monthlyAmount * 12;
    cumulativeInvestment += yearInvestment;
    
    const yearValue = monthlyAmount * 
      (Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate * (1 + monthlyRate);
    
    yearlyBreakdown.push({
      year,
      invested: cumulativeInvestment,
      value: yearValue,
      returns: yearValue - cumulativeInvestment
    });
  }
  
  return {
    totalInvestment,
    futureValue,
    totalReturns,
    yearlyBreakdown
  };
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResults {
  const { currentAge, retirementAge, monthlyExpenses, inflationRate, expectedReturn } = inputs;
  
  const yearsToRetirement = retirementAge - currentAge;
  const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
  
  // Assuming 25 years post-retirement life
  const postRetirementYears = 25;
  const corpusRequired = futureMonthlyExpenses * 12 * postRetirementYears;
  
  const monthlyRate = expectedReturn / (12 * 100);
  const totalMonths = yearsToRetirement * 12;
  
  const monthlyInvestmentRequired = corpusRequired * monthlyRate / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  return {
    yearsToRetirement,
    futureMonthlyExpenses,
    corpusRequired,
    monthlyInvestmentRequired
  };
}

export function calculateGoal(inputs: GoalInputs): GoalResults {
  const { goalAmount, timeToGoal, expectedReturn, inflationRate } = inputs;
  
  const inflationAdjustedGoal = goalAmount * Math.pow(1 + inflationRate / 100, timeToGoal);
  
  const monthlyRate = expectedReturn / (12 * 100);
  const totalMonths = timeToGoal * 12;
  
  const monthlyInvestmentRequired = inflationAdjustedGoal * monthlyRate / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const totalInvestment = monthlyInvestmentRequired * totalMonths;
  const totalReturns = inflationAdjustedGoal - totalInvestment;
  
  return {
    inflationAdjustedGoal,
    monthlyInvestmentRequired,
    totalInvestment,
    totalReturns
  };
}
