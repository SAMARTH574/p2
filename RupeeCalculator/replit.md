# FinanceAI - Financial Planning Application

## Overview
FinanceAI is a comprehensive financial planning web application designed specifically for Indian users. It combines powerful financial calculators with AI-driven insights to help users make informed financial decisions. The application features compound interest, SIP, home loan, retirement, and goal planning calculators, all integrated with an AI assistant powered by OpenAI's GPT-4o model.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Custom component library built on top of Radix UI primitives
- **Styling**: Tailwind CSS with custom design system using CSS variables
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for RESTful API
- **Database ORM**: Drizzle ORM with PostgreSQL support
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: In-memory storage with plans for PostgreSQL sessions
- **AI Integration**: OpenAI GPT-4o for financial advisory services

### Database Schema
The application uses three main tables:
- **users**: User authentication and profile management
- **chat_sessions**: AI chat conversation history with JSON message storage
- **calculations**: Financial calculation results and inputs for reference

## Key Components

### Financial Calculators
- **Compound Interest Calculator**: Calculates investment growth with various compounding frequencies
- **Home Loan Calculator**: EMI calculations with amortization schedules
- **SIP Calculator**: Systematic Investment Plan projections for mutual funds
- **Retirement Planning Calculator**: Long-term retirement corpus planning
- **Goal Planning Calculator**: Target-based financial planning with inflation adjustments

### AI Chat Assistant
- **OpenAI Integration**: Uses GPT-4o model for financial advice
- **Indian Context**: Specialized for Indian financial instruments (PPF, ELSS, EPF, SIP)
- **Session Management**: Persistent chat sessions with conversation history
- **Contextual Advice**: AI responses consider calculator inputs and results

### UI Components
- **Design System**: Comprehensive component library with consistent styling
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Built on Radix UI primitives for WCAG compliance
- **Indian Localization**: Currency formatting in Indian Rupees with lakh/crore notation

## Data Flow

### Calculator Workflow
1. User inputs financial parameters in calculator forms
2. Real-time calculations performed client-side using financial formulas
3. Results displayed with detailed breakdowns and yearly projections
4. Optional AI consultation based on calculation results

### AI Chat Workflow
1. User submits financial question or calculation context
2. Request sent to Express.js API endpoint with session management
3. OpenAI API called with Indian financial context and user query
4. AI response parsed and stored in chat session
5. Structured advice returned with actionable recommendations

### Session Management
1. Chat sessions created with unique identifiers
2. In-memory storage for development (MemStorage class)
3. Database storage planned for production deployment
4. Session persistence across browser refreshes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client for Neon Database
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **openai**: Official OpenAI SDK for AI integration
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library

### UI Dependencies
- **@radix-ui/***: Primitive component library for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Icon library for consistent iconography

### Development Dependencies
- **vite**: Build tool with HMR and optimized bundling
- **typescript**: Type safety across frontend and backend
- **tsx**: TypeScript execution for server development

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for Replit development environment
- **Hot Module Replacement**: Vite dev server with Express.js middleware
- **Environment Variables**: DATABASE_URL and OPENAI_API_KEY configuration
- **Development Scripts**: `npm run dev` for full-stack development

### Production Build
- **Frontend Build**: Vite optimized build to `dist/public`
- **Backend Build**: ESBuild compilation of TypeScript server code
- **Static Asset Serving**: Express.js serves built frontend assets
- **Database Migrations**: Drizzle migrations for schema changes

### Database Configuration
- **Development**: In-memory storage for rapid prototyping
- **Production**: PostgreSQL with Drizzle ORM migrations
- **Connection Pooling**: Neon serverless database with automatic scaling
- **Schema Management**: Version-controlled migrations in `/migrations` directory

### Environment Configuration
- **Environment Detection**: NODE_ENV for development/production switching
- **Database URL**: Required environment variable for PostgreSQL connection
- **API Keys**: Secure OpenAI API key management
- **CORS Configuration**: Replit-specific headers and middleware

The application follows a modern full-stack architecture with emphasis on type safety, performance, and user experience tailored for the Indian financial market.