# Overview

**Nano Banana Pro Complete Toolkit** is a comprehensive web application targeting the "Nano Banana Pro" keyword (Google's Gemini 3 Pro Image model released Nov 2025) for Google search traffic. The platform offers a unique **complete pipeline**: AI image generation → 3D model conversion → printing quotes, differentiating from competitors who only offer tutorials or single features. Built as a full-stack solution with React frontend and Express.js backend, optimized for SEO to achieve Google top 5 rankings within 2-4 weeks.

**Last Major Update:** November 22, 2025 - Complete rebranding to "Nano Banana Pro" focus with interactive playground, 100+ prompt templates, and comparison tables.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and gradient themes
- **State Management**: TanStack Query for server state management and React hooks for local state
- **Routing**: Wouter with SEO-optimized routes (/nano-banana-pro as homepage)
- **File Handling**: React Dropzone for drag-and-drop image uploads with validation
- **Interactive Features**: 
  - Real-time playground with editable prompts
  - 100+ searchable and filterable prompt templates
  - Comparison tables (Nano Banana Pro vs competitors)
  - FAQ section with schema markup
  - Complete pipeline visualization

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Integration**: Google Generative AI SDK (@google/genai) for Gemini model access
- **File Processing**: Multer middleware for handling multipart form data and image uploads
- **Development Setup**: Vite integration for development mode with HMR support
- **Storage**: In-memory storage implementation with interface for potential database integration

## Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Basic user management schema with UUID primary keys
- **Migration**: Drizzle Kit for schema migrations
- **Connection**: Neon Database serverless connector for PostgreSQL

## AI Integration
- **Model**: Gemini 2.5 Flash Image (targeting Gemini 3 Pro Image/Nano Banana Pro for SEO)
- **API Management**: Direct GEMINI_API_KEY usage (secure secret) - awaiting Replit AI Integrations support for gemini-3-pro-image-preview
- **Input Processing**: Supports multiple image formats (JPG, PNG, WebP) up to 10MB
- **Prompt Engineering**: 100+ categorized prompt templates with search and filter functionality
- **Response Handling**: Base64 image data conversion and error handling for API responses
- **Security**: Server-side only API calls, no client exposure, encrypted secret storage

## SEO Optimization Strategy

**Target Keyword:** "Nano Banana Pro" (50K-100K monthly searches, released Nov 20-22, 2025)

**Key Optimizations:**
- **Title**: "Nano Banana Pro - Free AI Image Generator | 4K Text Rendering | Gemini 3 Pro"
- **Meta Description**: Optimized for CTR with clear value proposition
- **Schema Markup**: SoftwareApplication, FAQPage, HowTo schemas for rich snippets
- **Keyword Density**: Strategic placement of "Nano Banana Pro" throughout content
- **Internal Linking**: Cross-linked with 3D figurines pipeline page
- **Content Strategy**: 100+ prompt templates, comparison tables, comprehensive FAQ
- **Unique Value Prop**: Only platform with complete generation→3D→printing pipeline

**Competitive Advantages:**
1. Interactive playground (no signup required)
2. 100+ tested prompt templates
3. Complete pipeline to 3D printing
4. Comparison tables showing superiority
5. Educational content and tutorials
6. Fast page load (<2s target)

## External Dependencies

- **Google Gemini API**: Core AI image generation (GEMINI_API_KEY as encrypted secret)
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **TanStack Query**: Server state synchronization and caching layer
- **React Dropzone**: File upload handling with drag-and-drop interface
- **Lucide Icons**: Consistent icon system throughout the application
- **Wouter**: Lightweight routing solution for single-page application navigation