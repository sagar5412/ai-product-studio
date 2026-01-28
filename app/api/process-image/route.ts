import { NextRequest, NextResponse } from "next/server";
import { generateProductOnBackground } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, backgroundPrompt } = body;

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    if (!backgroundPrompt) {
      return NextResponse.json(
        { error: "Background prompt is required" },
        { status: 400 },
      );
    }

    // Call Gemini API to process the image
    const processedImageBase64 = await generateProductOnBackground(
      image,
      backgroundPrompt,
    );

    return NextResponse.json({ image: processedImageBase64 });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image. Please try again." },
      { status: 500 },
    );
  }
}
