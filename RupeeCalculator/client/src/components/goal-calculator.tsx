import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TargetIcon } from "lucide-react";
import { calculateGoal, type GoalInputs } from "@/lib/financial-calculations";
import { formatCurrency } from "@/lib/number-formatting";

export default function GoalCalculator() {
  const [inputs, setInputs] = useState<GoalInputs>({
    goalAmount: 2500000,
    timeToGoal: 18,
    expectedReturn: 12,
    inflationRate: 6
  });
  
  const [results, setResults] = useState(calculateGoal(inputs));

  const handleInputChange = (field: keyof GoalInputs, value: number) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
    setResults(calculateGoal(newInputs));
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
            <TargetIcon className="text-purple-600 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Goal Planning Calculator</h3>
            <p className="text-gray-600">Plan for specific financial goals like education, marriage, etc.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Goal Amount (Today's Value)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <Input
                  type="number"
                  placeholder="25,00,000"
                  value={inputs.goalAmount}
                  onChange={(e) => handleInputChange('goalAmount', parseFloat(e.target.value) || 0)}
                  className="pl-8 number-input"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Time to Goal (Years)</Label>
              <Input
                type="number"
                placeholder="18"
                value={inputs.timeToGoal}
                onChange={(e) => handleInputChange('timeToGoal', parseFloat(e.target.value) || 0)}
                className="number-input"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Goal Planning</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Today's Goal Value</span>
                <span className="font-semibold text-gray-900">{formatCurrency(inputs.goalAmount)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Future Goal Value</span>
                <span className="font-semibold text-orange-600">{formatCurrency(results.inflationAdjustedGoal)}</span>
              </div>
              <div className="flex justify-between items-center p-3 result-highlight rounded-lg">
                <span className="text-gray-800 font-medium">Monthly Investment</span>
                <span className="font-bold text-primary text-lg">{formatCurrency(results.monthlyInvestmentRequired)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Total Investment</span>
                <span className="font-semibold text-gray-900">{formatCurrency(results.totalInvestment)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Total Returns</span>
                <span className="font-semibold text-secondary">{formatCurrency(results.totalReturns)}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-l-4 border-purple-500">
              <div className="text-sm">
                <p className="font-medium text-gray-800">Goal Summary</p>
                <p className="text-gray-600 mt-1">
                  Invest {formatCurrency(results.monthlyInvestmentRequired)} monthly for {inputs.timeToGoal} years
                </p>
                <p className="text-gray-600">
                  to reach your goal of {formatCurrency(results.inflationAdjustedGoal)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
