import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PercentIcon, HomeIcon, TrendingUpIcon, PiggyBankIcon, TargetIcon } from "lucide-react";
import type { CalculatorType } from "./financial-calculator";

interface CalculatorNavProps {
  activeCalculator: CalculatorType;
  onCalculatorChange: (calculator: CalculatorType) => void;
}

export default function CalculatorNav({ activeCalculator, onCalculatorChange }: CalculatorNavProps) {
  const calculators = [
    {
      id: 'compound' as CalculatorType,
      name: 'Compound Interest',
      icon: PercentIcon,
    },
    {
      id: 'home-loan' as CalculatorType,
      name: 'Home Loan',
      icon: HomeIcon,
    },
    {
      id: 'sip' as CalculatorType,
      name: 'SIP Calculator',
      icon: TrendingUpIcon,
    },
    {
      id: 'retirement' as CalculatorType,
      name: 'Retirement Planning',
      icon: PiggyBankIcon,
    },
    {
      id: 'goal' as CalculatorType,
      name: 'Goal Planning',
      icon: TargetIcon,
    },
  ];

  return (
    <Card className="bg-gray-50 sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Calculator</h3>
        <nav className="space-y-2">
          {calculators.map((calculator) => {
            const Icon = calculator.icon;
            const isActive = activeCalculator === calculator.id;
            
            return (
              <Button
                key={calculator.id}
                onClick={() => onCalculatorChange(calculator.id)}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary text-white hover:bg-blue-700' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {calculator.name}
              </Button>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}
