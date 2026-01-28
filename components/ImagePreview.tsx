"use client";

interface ImagePreviewProps {
  originalImage: string | null;
  processedImage: string | null;
  isLoading: boolean;
  onDownload: () => void;
}

export default function ImagePreview({
  originalImage,
  processedImage,
  isLoading,
  onDownload,
}: ImagePreviewProps) {
  if (!originalImage && !processedImage && !isLoading) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-gray-300">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-900">No Image Generated Yet</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xs">
          Upload a product and select a scene to see the magic happen
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {originalImage && (
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 pl-1">
              Original
            </span>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={`data:image/jpeg;base64,${originalImage}`}
                alt="Original product"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {processedImage ? (
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-600 pl-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Generated result
            </span>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-lg ring-1 ring-black/5 group relative">
              <img
                src={`data:image/png;base64,${processedImage}`}
                alt="Processed product"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 pl-1">
              Result
            </span>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin mb-2"></div>
                  <span className="text-xs text-gray-500 font-medium">
                    Processing...
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-400">Waiting...</span>
              )}
            </div>
          </div>
        )}
      </div>

      {processedImage && (
        <button
          onClick={onDownload}
          className="w-full py-4 bg-black text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download High Quality
        </button>
      )}
    </div>
  );
}
