import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatMessageSchema } from "@shared/schema";
import { getFinancialAdvice } from "./services/openai";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId, context } = z.object({
        message: z.string().min(1),
        sessionId: z.string().optional(),
        context: z.any().optional(),
      }).parse(req.body);

      // Generate session ID if not provided
      const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Get or create chat session
      let session = await storage.getChatSession(currentSessionId);
      if (!session) {
        session = await storage.createChatSession({
          sessionId: currentSessionId,
          messages: [],
        });
      }

      // Get AI response
      const aiResponse = await getFinancialAdvice({
        question: message,
        context,
      });

      // Update session with new messages
      const updatedMessages = [
        ...(session.messages as any[]),
        {
          id: Date.now(),
          type: "user",
          content: message,
          timestamp: new Date().toISOString(),
        },
        {
          id: Date.now() + 1,
          type: "ai",
          content: aiResponse.advice,
          suggestions: aiResponse.suggestions,
          actionItems: aiResponse.actionItems,
          timestamp: new Date().toISOString(),
        },
      ];

      await storage.updateChatSession(currentSessionId, updatedMessages);

      res.json({
        sessionId: currentSessionId,
        response: aiResponse,
        success: true,
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to process chat message",
        success: false,
      });
    }
  });

  // Get chat history
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const session = await storage.getChatSession(req.params.sessionId);
      if (!session) {
        return res.status(404).json({ error: "Chat session not found" });
      }

      res.json({
        sessionId: session.sessionId,
        messages: session.messages,
        success: true,
      });
    } catch (error) {
      console.error("Get chat error:", error);
      res.status(500).json({
        error: "Failed to get chat history",
        success: false,
      });
    }
  });

  // Save calculation
  app.post("/api/calculations", async (req, res) => {
    try {
      const { sessionId, calculatorType, inputs, results } = z.object({
        sessionId: z.string(),
        calculatorType: z.string(),
        inputs: z.any(),
        results: z.any(),
      }).parse(req.body);

      const calculation = await storage.saveCalculation({
        sessionId,
        calculatorType,
        inputs,
        results,
      });

      res.json({
        calculation,
        success: true,
      });
    } catch (error) {
      console.error("Save calculation error:", error);
      res.status(500).json({
        error: "Failed to save calculation",
        success: false,
      });
    }
  });

  // Get calculations by session
  app.get("/api/calculations/:sessionId", async (req, res) => {
    try {
      const calculations = await storage.getCalculationsBySession(req.params.sessionId);
      res.json({
        calculations,
        success: true,
      });
    } catch (error) {
      console.error("Get calculations error:", error);
      res.status(500).json({
        error: "Failed to get calculations",
        success: false,
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
