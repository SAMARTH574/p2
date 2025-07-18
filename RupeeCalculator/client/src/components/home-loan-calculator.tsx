import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HomeIcon, TrendingUpIcon } from "lucide-react";
import { calculateHomeLoan, type HomeLoanInputs } from "@/lib/financial-calculations";
import { formatCurrency } from "@/lib/number-formatting";

export default function HomeLoanCalculator() {
  const [inputs, setInputs] = useState<HomeLoanInputs>({
    amount: 5000000,
    rate: 8.5,
    tenure: 20
  });
  
  const [results, setResults] = useState(calculateHomeLoan(inputs));

  const handleInputChange = (field: keyof HomeLoanInputs, value: number) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
    setResults(calculateHomeLoan(newInputs));
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
            <HomeIcon className="text-primary w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Home Loan Calculator</h3>
            <p className="text-gray-600">Calculate your monthly EMI and total interest</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Loan Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <Input
                  type="number"
                  placeholder="50,00,000"
                  value={inputs.amount}
                  onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                  className="pl-8 number-input"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Interest Rate (% per annum)</Label>
              <Input
                type="number"
                placeholder="8.5"
                step="0.1"
                value={inputs.rate}
                onChange={(e) => handleInputChange('rate', parseFloat(e.target.value) || 0)}
                className="number-input"
              />
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Loan Tenure (Years)</Label>
              <Input
                type="number"
                placeholder="20"
                value={inputs.tenure}
                onChange={(e) => handleInputChange('tenure', parseFloat(e.target.value) || 0)}
                className="number-input"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">EMI Breakdown</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 result-highlight rounded-lg">
                <span className="text-gray-800 font-medium">Monthly EMI</span>
                <span className="font-bold text-primary text-lg">{formatCurrency(results.monthlyEMI)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Principal Amount</span>
                <span className="font-semibold text-gray-900">{formatCurrency(inputs.amount)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Total Interest</span>
                <span className="font-semibold text-orange-600">{formatCurrency(results.totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border-2 border-gray-300">
                <span className="text-gray-800 font-medium">Total Amount</span>
                <span className="font-bold text-gray-900 text-xl">{formatCurrency(results.totalAmount)}</span>
              </div>
            </div>
            
            <div className="mt-6 h-32 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <TrendingUpIcon className="mx-auto text-gray-400 w-8 h-8 mb-2" />
                <p className="text-gray-600 text-sm">Payment Schedule</p>
                <p className="text-xs text-gray-500">Detailed breakdown coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
