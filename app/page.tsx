"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import BackgroundSelector from "@/components/BackgroundSelector";
import ImagePreview from "@/components/ImagePreview";

// Background ID to prompt mapping
const BACKGROUND_PROMPTS: Record<string, string> = {
  "white-studio":
    "a clean white studio background with soft professional lighting and subtle shadows, minimalist product photography",
  "kitchen-counter":
    "a modern marble kitchen counter with warm ambient lighting, blurred kitchen background",
  "living-room":
    "a stylish bright living room setting with natural daylight, cozy and inviting scandinavian style",
  "outdoor-garden":
    "a lush green garden background with soft natural sunlight filtering through leaves, shallow depth of field",
  "office-desk":
    "a professional minimal office desk setup with modern decor, workspace photography",
  "marble-surface":
    "an elegant white carrara marble surface with luxury reflections and bright lighting",
  "beach-sunset":
    "a golden hour beach setting with warm sunlight and soft sand, lifestyle photography",
  "modern-minimal":
    "a modern minimalist abstract geometric background with soft pastel colors",
};

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] =
    useState<string>("white-studio");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (_file: File, base64: string) => {
    setOriginalImage(base64);
    setProcessedImage(null);
    setError(null);
  };

  const handleBackgroundSelect = (background: string) => {
    setSelectedBackground(background);
  };

  const handleProcess = async () => {
    if (!originalImage) {
      setError("Please upload an image first");
      return;
    }

    setIsLoading(true);
    setError(null);
    setProcessedImage(null);

    try {
      // Determine the background prompt
      let backgroundPrompt: string;
      if (selectedBackground.startsWith("custom:")) {
        backgroundPrompt = selectedBackground.replace("custom:", "");
      } else {
        backgroundPrompt =
          BACKGROUND_PROMPTS[selectedBackground] ||
          BACKGROUND_PROMPTS["white-studio"];
      }

      const response = await fetch("/api/process-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: originalImage,
          backgroundPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process image");
      }

      setProcessedImage(data.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;

    const link = document.createElement("a");
    link.href = `data:image/png;base64,${processedImage}`;
    link.download = `nexerahive-studio-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Professional Product Photos <br />
            <span className="text-gray-400">Powered by AI</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Upload your product image and let our AI place it in stunning
            lifestyle scenes instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Controls */}
          <div className="lg:col-span-5 space-y-8">
            {/* Step 1: Upload */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">
                  1
                </span>
                <h2 className="font-semibold text-gray-900">Upload Product</h2>
              </div>
              <ImageUploader
                onImageSelect={handleImageSelect}
                currentImage={originalImage}
              />
            </div>

            {/* Step 2: Select Background */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">
                  2
                </span>
                <h2 className="font-semibold text-gray-900">Select Scene</h2>
              </div>
              <BackgroundSelector
                onSelect={handleBackgroundSelect}
                selectedBackground={selectedBackground}
              />
            </div>

            {/* Step 3: Process Button */}
            <button
              onClick={handleProcess}
              disabled={!originalImage || isLoading}
              className={`
                w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
                ${
                  !originalImage || isLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                }
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Generate Photo"
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center gap-2">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}
          </div>

          {/* Right Column - Result */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">
                    3
                  </span>
                  <h2 className="font-semibold text-gray-900">Studio Result</h2>
                </div>
                {processedImage && (
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Ready
                  </span>
                )}
              </div>

              <ImagePreview
                originalImage={originalImage}
                processedImage={processedImage}
                isLoading={isLoading}
                onDownload={handleDownload}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} NexeraHive Assignment • Built with
            Next.js & Gemini
          </p>
        </footer>
      </main>
    </div>
  );
}
