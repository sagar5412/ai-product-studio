# AI Product Photo Studio

An AI-powered application that transforms standard product photos into professional e-commerce imagery using Google's Gemini 2.0 Flash model.

## 🚀 How it Works

1. **Upload**: Users upload a product image.
2. **Select Scene**: Choose from preset lifestyle environments (Kitchen, Garden, Studio) or describe a custom scene.
3. **AI Magic**: The app sends the image + prompt to Gemini, which identifies the product, removes the background, and generates a unified composite image with natural lighting and shadows.

## 🤖 AI Models Used

**Google Gemini 2.0 Flash (Experimental)**

- **Why**: Selected for its multimodal capabilities (vision + text-to-image) and low latency. It handles object understanding, background removal, and scene generation in a single pass, simplifying the architecture.

## 🛠️ Architecture

- **Frontend**: Next.js 14, React, Tailwind CSS (Minimal Design)
- **Backend**: Serverless API Routes (Next.js)
- **AI Integration**: `@google/genai` SDK
- **Deployment**: Vercel

## 📦 Run Locally

1. Clone the repo
2. Create `.env.local`: `GEMINI_API_KEY=your_key`
3. `npm install`
4. `npm run dev`
