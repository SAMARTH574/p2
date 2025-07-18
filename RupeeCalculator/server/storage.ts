import { users, chatSessions, calculations, type User, type InsertUser, type ChatSession, type InsertChatSession, type Calculation, type InsertCalculation } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getChatSession(sessionId: string): Promise<ChatSession | undefined>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  updateChatSession(sessionId: string, messages: any[]): Promise<ChatSession>;
  
  saveCalculation(calculation: InsertCalculation): Promise<Calculation>;
  getCalculationsBySession(sessionId: string): Promise<Calculation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatSessions: Map<string, ChatSession>;
  private calculations: Map<number, Calculation>;
  private currentUserId: number;
  private currentChatId: number;
  private currentCalculationId: number;

  constructor() {
    this.users = new Map();
    this.chatSessions = new Map();
    this.calculations = new Map();
    this.currentUserId = 1;
    this.currentChatId = 1;
    this.currentCalculationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    return this.chatSessions.get(sessionId);
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const id = this.currentChatId++;
    const now = new Date();
    const session: ChatSession = {
      id,
      ...insertSession,
      createdAt: now,
      updatedAt: now,
    };
    this.chatSessions.set(insertSession.sessionId, session);
    return session;
  }

  async updateChatSession(sessionId: string, messages: any[]): Promise<ChatSession> {
    const session = this.chatSessions.get(sessionId);
    if (!session) {
      throw new Error("Chat session not found");
    }
    
    const updatedSession: ChatSession = {
      ...session,
      messages,
      updatedAt: new Date(),
    };
    this.chatSessions.set(sessionId, updatedSession);
    return updatedSession;
  }

  async saveCalculation(insertCalculation: InsertCalculation): Promise<Calculation> {
    const id = this.currentCalculationId++;
    const calculation: Calculation = {
      id,
      ...insertCalculation,
      createdAt: new Date(),
    };
    this.calculations.set(id, calculation);
    return calculation;
  }

  async getCalculationsBySession(sessionId: string): Promise<Calculation[]> {
    return Array.from(this.calculations.values()).filter(
      (calc) => calc.sessionId === sessionId,
    );
  }
}

export const storage = new MemStorage();
