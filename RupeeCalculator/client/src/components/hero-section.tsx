import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorIcon, MessageSquareIcon, TrendingUpIcon, PiggyBankIcon, CoinsIcon } from "lucide-react";
import { formatCurrency } from "@/lib/number-formatting";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-br py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Master Your <span className="text-primary">Financial Future</span> with AI
            </h2>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Comprehensive financial calculators powered by AI insights. Plan your investments, loans, and retirement with confidence in Indian Rupees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                size="lg"
                onClick={() => scrollToSection('calculators')}
                className="bg-primary text-white hover:bg-blue-700 flex items-center justify-center"
              >
                <CalculatorIcon className="mr-2 h-5 w-5" />
                Start Calculating
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('ai-chat')}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white flex items-center justify-center"
              >
                <MessageSquareIcon className="mr-2 h-5 w-5" />
                Chat with AI
              </Button>
            </div>
          </div>
          <div className="relative">
            <Card className="shadow-financial">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Portfolio Overview</h3>
                  <span className="text-secondary font-semibold">+12.4%</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                        <TrendingUpIcon className="text-secondary w-4 h-4" />
                      </div>
                      <span className="font-medium">Mutual Funds</span>
                    </div>
                    <span className="font-semibold text-gray-900">{formatCurrency(547000)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <PiggyBankIcon className="text-primary w-4 h-4" />
                      </div>
                      <span className="font-medium">Fixed Deposits</span>
                    </div>
                    <span className="font-semibold text-gray-900">{formatCurrency(215000)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <CoinsIcon className="text-accent w-4 h-4" />
                      </div>
                      <span className="font-medium">Gold</span>
                    </div>
                    <span className="font-semibold text-gray-900">{formatCurrency(123000)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
