import { Card, CardContent } from "@/components/ui/card";
import { IndianRupeeIcon, BrainIcon, TrendingUpIcon, ShieldIcon, SmartphoneIcon, ShareIcon } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: IndianRupeeIcon,
      title: "Indian Rupee Calculations",
      description: "All calculations in ₹ with proper Indian number formatting (lakhs/crores)",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: BrainIcon,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations based on your financial goals and situation",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary"
    },
    {
      icon: TrendingUpIcon,
      title: "Real-time Calculations",
      description: "Instant results with visual charts and detailed breakdowns",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    },
    {
      icon: ShieldIcon,
      title: "Secure & Private",
      description: "Your financial data is processed securely and never stored",
      bgColor: "bg-blue-100",
      iconColor: "text-primary"
    },
    {
      icon: SmartphoneIcon,
      title: "Mobile Optimized",
      description: "Perfect experience across all devices - desktop, tablet, and mobile",
      bgColor: "bg-green-100",
      iconColor: "text-secondary"
    },
    {
      icon: ShareIcon,
      title: "Save & Share",
      description: "Save your calculations and share results with family or financial advisors",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose FinanceAI?</h2>
          <p className="text-xl text-gray-600">Powerful features designed for Indian financial planning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`${feature.iconColor} w-8 h-8`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
