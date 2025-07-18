import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiggyBankIcon } from "lucide-react";
import { calculateRetirement, type RetirementInputs } from "@/lib/financial-calculations";
import { formatCurrency } from "@/lib/number-formatting";

export default function RetirementCalculator() {
  const [inputs, setInputs] = useState<RetirementInputs>({
    currentAge: 30,
    retirementAge: 60,
    monthlyExpenses: 50000,
    inflationRate: 6,
    expectedReturn: 12
  });
  
  const [results, setResults] = useState(calculateRetirement(inputs));

  const handleInputChange = (field: keyof RetirementInputs, value: number) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
    setResults(calculateRetirement(newInputs));
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mr-4">
            <PiggyBankIcon className="text-accent w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Retirement Planning Calculator</h3>
            <p className="text-gray-600">Plan for a comfortable retirement</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2">Current Age</Label>
                <Input
                  type="number"
                  placeholder="30"
                  value={inputs.currentAge}
                  onChange={(e) => handleInputChange('currentAge', parseFloat(e.target.value) || 0)}
                  className="number-input"
                />
              </div>
              
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2">Retirement Age</Label>
                <Input
                  type="number"
                  placeholder="60"
                  value={inputs.retirementAge}
                  onChange={(e) => handleInputChange('retirementAge', parseFloat(e.target.value) || 0)}
                  className="number-input"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Current Monthly Expenses</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <Input
                  type="number"
                  placeholder="50,000"
                  value={inputs.monthlyExpenses}
                  onChange={(e) => handleInputChange('monthlyExpenses', parseFloat(e.target.value) || 0)}
                  className="pl-8 number-input"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2">Inflation Rate (%)</Label>
                <Input
                  type="number"
                  placeholder="6"
                  step="0.1"
                  value={inputs.inflationRate}
                  onChange={(e) => handleInputChange('inflationRate', parseFloat(e.target.value) || 0)}
                  className="number-input"
                />
              </div>
              
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2">Expected Return (%)</Label>
                <Input
                  type="number"
                  placeholder="12"
                  step="0.1"
                  value={inputs.expectedReturn}
                  onChange={(e) => handleInputChange('expectedReturn', parseFloat(e.target.value) || 0)}
                  className="number-input"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Retirement Plan</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Years to Retirement</span>
                <span className="font-semibold text-gray-900">{results.yearsToRetirement} years</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Future Monthly Expenses</span>
                <span className="font-semibold text-orange-600">{formatCurrency(results.futureMonthlyExpenses)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Corpus Required</span>
                <span className="font-semibold text-red-600">{formatCurrency(results.corpusRequired)}</span>
              </div>
              <div className="flex justify-between items-center p-3 result-highlight rounded-lg">
                <span className="text-gray-800 font-medium">Monthly Investment</span>
                <span className="font-bold text-primary text-lg">{formatCurrency(results.monthlyInvestmentRequired)}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border-l-4 border-accent">
              <div className="text-sm">
                <p className="font-medium text-gray-800">Retirement Goal</p>
                <p className="text-gray-600 mt-1">
                  Start investing {formatCurrency(results.monthlyInvestmentRequired)} per month
                </p>
                <p className="text-gray-600">
                  to accumulate {formatCurrency(results.corpusRequired)} by retirement
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
