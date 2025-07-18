import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUpIcon } from "lucide-react";
import { calculateSIP, type SIPInputs } from "@/lib/financial-calculations";
import { formatCurrency } from "@/lib/number-formatting";

export default function SipCalculator() {
  const [inputs, setInputs] = useState<SIPInputs>({
    monthlyAmount: 10000,
    rate: 12,
    years: 15
  });
  
  const [results, setResults] = useState(calculateSIP(inputs));

  const handleInputChange = (field: keyof SIPInputs, value: number) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
    setResults(calculateSIP(newInputs));
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mr-4">
            <TrendingUpIcon className="text-secondary w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">SIP Calculator</h3>
            <p className="text-gray-600">Systematic Investment Plan calculator for mutual funds</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Monthly Investment</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <Input
                  type="number"
                  placeholder="10,000"
                  value={inputs.monthlyAmount}
                  onChange={(e) => handleInputChange('monthlyAmount', parseFloat(e.target.value) || 0)}
                  className="pl-8 number-input"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Expected Annual Return (%)</Label>
              <Input
                type="number"
                placeholder="12"
                step="0.1"
                value={inputs.rate}
                onChange={(e) => handleInputChange('rate', parseFloat(e.target.value) || 0)}
                className="number-input"
              />
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Investment Period (Years)</Label>
              <Input
                type="number"
                placeholder="15"
                value={inputs.years}
                onChange={(e) => handleInputChange('years', parseFloat(e.target.value) || 0)}
                className="number-input"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">SIP Returns</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Total Investment</span>
                <span className="font-semibold text-gray-900">{formatCurrency(results.totalInvestment)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Total Returns</span>
                <span className="font-semibold text-secondary">{formatCurrency(results.totalReturns)}</span>
              </div>
              <div className="flex justify-between items-center p-3 result-highlight rounded-lg">
                <span className="text-gray-800 font-medium">Future Value</span>
                <span className="font-bold text-primary text-xl">{formatCurrency(results.futureValue)}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg border-l-4 border-secondary">
              <div className="text-sm">
                <p className="font-medium text-gray-800">Investment Summary</p>
                <p className="text-gray-600 mt-1">
                  Monthly SIP of {formatCurrency(inputs.monthlyAmount)} for {inputs.years} years
                </p>
                <p className="text-gray-600">
                  Expected return: {inputs.rate}% per annum
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
