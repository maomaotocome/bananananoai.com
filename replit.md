# Overview

Banana Nano Ai is a web application that provides AI-powered image editing capabilities using Google's Gemini 2.5 Flash Image model. The platform allows users to upload images and modify them using natural language prompts, offering features like virtual try-on, background changes, style transformations, and multi-image blending. The application is built as a full-stack solution with a React frontend and Express.js backend, designed to be user-friendly and accessible without requiring technical expertise.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and a banana-themed color scheme
- **State Management**: TanStack Query for server state management and React hooks for local state
- **Routing**: Wouter for client-side routing with multiple pages (Home, Examples, Tutorials, API docs)
- **File Handling**: React Dropzone for drag-and-drop image uploads with validation

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
- **Model**: Gemini 2.5 Flash Preview Image Generation for image editing and creation
- **Input Processing**: Supports multiple image formats (JPG, PNG, WebP) up to 10MB
- **Prompt Engineering**: Natural language processing for user prompts with built-in suggestions
- **Response Handling**: Base64 image data conversion and error handling for API responses

## External Dependencies

- **Google Gemini API**: Core AI image generation and editing capabilities requiring GEMINI_API_KEY
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **TanStack Query**: Server state synchronization and caching layer
- **React Dropzone**: File upload handling with drag-and-drop interface
- **Lucide Icons**: Consistent icon system throughout the application
- **Wouter**: Lightweight routing solution for single-page application navigation