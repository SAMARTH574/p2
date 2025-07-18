import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export interface FinancialAdviceRequest {
  question: string;
  context?: {
    calculatorType?: string;
    inputs?: any;
    results?: any;
  };
}

export interface FinancialAdviceResponse {
  advice: string;
  suggestions: string[];
  actionItems: string[];
}

export async function getFinancialAdvice(request: FinancialAdviceRequest): Promise<FinancialAdviceResponse> {
  try {
    const systemPrompt = `You are an expert financial advisor specializing in Indian financial planning. You provide personalized advice on investments, loans, retirement planning, and financial goals. Always:

1. Use Indian Rupees (₹) in your responses
2. Consider Indian financial instruments (SIP, PPF, ELSS, EPF, etc.)
3. Reference Indian tax laws and financial regulations
4. Provide practical, actionable advice
5. Consider inflation rates typical in India (6-8%)
6. Suggest diversified portfolios suitable for Indian investors

Respond with JSON in this exact format:
{
  "advice": "detailed financial advice string",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "actionItems": ["action 1", "action 2", "action 3"]
}`;

    let userPrompt = request.question;
    
    if (request.context) {
      userPrompt += `\n\nContext: I'm using a ${request.context.calculatorType} calculator with these inputs: ${JSON.stringify(request.context.inputs)} and got these results: ${JSON.stringify(request.context.results)}`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      advice: result.advice || "I'd be happy to help with your financial planning question.",
      suggestions: result.suggestions || [],
      actionItems: result.actionItems || [],
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to get financial advice. Please try again.");
  }
}
