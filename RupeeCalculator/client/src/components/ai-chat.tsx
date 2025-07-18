import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquareIcon, BotIcon, UserIcon, SendIcon, BookOpenIcon, HomeIcon, PiggyBankIcon, TrendingUpIcon } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  content: string;
  suggestions?: string[];
  actionItems?: string[];
  timestamp: string;
}

export default function AiChat() {
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI financial assistant. I can help you with investment planning, loan calculations, retirement planning, and general financial advice. What would you like to know?",
      timestamp: new Date().toISOString()
    }
  ]);

  const { toast } = useToast();

  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, sessionId }: { message: string; sessionId?: string }) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        sessionId,
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setSessionId(data.sessionId);
        
        // Add AI response to messages
        const aiMessage: ChatMessage = {
          id: Date.now(),
          type: 'ai',
          content: data.response.advice,
          suggestions: data.response.suggestions,
          actionItems: data.response.actionItems,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Send to API
    sendMessageMutation.mutate({ message, sessionId: sessionId || undefined });
    setMessage("");
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  const quickQuestions = [
    { text: "SIP Planning", icon: TrendingUpIcon },
    { text: "Home Loan Tips", icon: HomeIcon },
    { text: "Tax Saving", icon: BookOpenIcon },
    { text: "Emergency Fund", icon: PiggyBankIcon },
  ];

  return (
    <section id="ai-chat" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Financial Assistant</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized financial advice and insights powered by artificial intelligence. Ask questions about investments, loans, or financial planning.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-financial overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary to-blue-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <BotIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">FinanceAI Assistant</h3>
                  <p className="text-blue-100">Your personal financial advisor</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start space-x-3 chat-message ${
                  msg.type === 'user' ? 'justify-end' : ''
                }`}>
                  {msg.type === 'ai' && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <BotIcon className="text-white w-4 h-4" />
                    </div>
                  )}
                  
                  <div className={`rounded-lg p-4 max-w-xs lg:max-w-md ${
                    msg.type === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100'
                  }`}>
                    <p className={msg.type === 'user' ? 'text-white' : 'text-gray-800'}>
                      {msg.content}
                    </p>
                    
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-3">
                        <p className="text-gray-600 font-medium text-sm mb-2">Suggestions:</p>
                        <ul className="space-y-1 text-sm">
                          {msg.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-gray-600">• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {msg.actionItems && msg.actionItems.length > 0 && (
                      <div className="mt-3">
                        <p className="text-gray-600 font-medium text-sm mb-2">Action Items:</p>
                        <ul className="space-y-1 text-sm">
                          {msg.actionItems.map((item, index) => (
                            <li key={index} className="text-gray-600">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {msg.type === 'user' && (
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserIcon className="text-white w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
              
              {sendMessageMutation.isPending && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <BotIcon className="text-white w-4 h-4" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 max-w-xs lg:max-w-md">
                    <p className="text-gray-600">Thinking...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <CardContent className="p-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <Input
                  type="text"
                  placeholder="Ask about investments, loans, retirement planning..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim() || sendMessageMutation.isPending}
                  className="bg-primary hover:bg-blue-700"
                >
                  <SendIcon className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {quickQuestions.map((q, index) => {
                  const Icon = q.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(q.text)}
                      className="text-xs"
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {q.text}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
