import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PercentIcon, TrendingUpIcon } from "lucide-react";
import { calculateCompoundInterest, type CompoundInterestInputs } from "@/lib/financial-calculations";
import { formatCurrency } from "@/lib/number-formatting";

export default function CompoundInterestCalculator() {
  const [inputs, setInputs] = useState<CompoundInterestInputs>({
    principal: 100000,
    rate: 12,
    years: 10,
    frequency: 'quarterly'
  });
  
  const [results, setResults] = useState(calculateCompoundInterest(inputs));

  const handleInputChange = (field: keyof CompoundInterestInputs, value: string | number) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
    setResults(calculateCompoundInterest(newInputs));
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
            <PercentIcon className="text-primary w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Compound Interest Calculator</h3>
            <p className="text-gray-600">Calculate the power of compounding over time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Principal Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <Input
                  type="number"
                  placeholder="1,00,000"
                  value={inputs.principal}
                  onChange={(e) => handleInputChange('principal', parseFloat(e.target.value) || 0)}
                  className="pl-8 number-input"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Annual Interest Rate (%)</Label>
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
              <Label className="text-sm font-semibold text-gray-700 mb-2">Time Period (Years)</Label>
              <Input
                type="number"
                placeholder="10"
                value={inputs.years}
                onChange={(e) => handleInputChange('years', parseFloat(e.target.value) || 0)}
                className="number-input"
              />
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Compounding Frequency</Label>
              <Select 
                value={inputs.frequency} 
                onValueChange={(value: any) => handleInputChange('frequency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Results</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Principal Amount</span>
                <span className="font-semibold text-gray-900">{formatCurrency(results.principal)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-600">Interest Earned</span>
                <span className="font-semibold text-secondary">{formatCurrency(results.interest)}</span>
              </div>
              <div className="flex justify-between items-center p-3 result-highlight rounded-lg">
                <span className="text-gray-800 font-medium">Total Amount</span>
                <span className="font-bold text-primary text-xl">{formatCurrency(results.total)}</span>
              </div>
            </div>
            
            <div className="mt-6 h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <TrendingUpIcon className="mx-auto text-gray-400 w-8 h-8 mb-2" />
                <p className="text-gray-600 text-sm">Growth Chart</p>
                <p className="text-xs text-gray-500">Visual representation coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
