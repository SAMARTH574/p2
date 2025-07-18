import { useState } from "react";
import CalculatorNav from "./calculator-nav";
import CompoundInterestCalculator from "./compound-interest-calculator";
import HomeLoanCalculator from "./home-loan-calculator";
import SipCalculator from "./sip-calculator";
import RetirementCalculator from "./retirement-calculator";
import GoalCalculator from "./goal-calculator";

export type CalculatorType = 'compound' | 'home-loan' | 'sip' | 'retirement' | 'goal';

export default function FinancialCalculator() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('compound');

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'compound':
        return <CompoundInterestCalculator />;
      case 'home-loan':
        return <HomeLoanCalculator />;
      case 'sip':
        return <SipCalculator />;
      case 'retirement':
        return <RetirementCalculator />;
      case 'goal':
        return <GoalCalculator />;
      default:
        return <CompoundInterestCalculator />;
    }
  };

  return (
    <section id="calculators" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Financial Calculators</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive suite of calculators to plan your financial journey. All calculations in Indian Rupees with AI-powered insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CalculatorNav 
              activeCalculator={activeCalculator}
              onCalculatorChange={setActiveCalculator}
            />
          </div>
          
          <div className="lg:col-span-2">
            {renderCalculator()}
          </div>
        </div>
      </div>
    </section>
  );
}
