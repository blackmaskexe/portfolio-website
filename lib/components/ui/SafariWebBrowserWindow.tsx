"use client";

import React, { useState } from "react";
import { FiRefreshCw, FiExternalLink } from "react-icons/fi";

interface SafariWebBrowserWindowProps {
  url: string;
  children: React.ReactNode;
}

export default function SafariWebBrowserWindow({
  url,
  children,
}: SafariWebBrowserWindowProps) {
  const [iframeKey, setIframeKey] = useState(0); // Track iframe key

  return (
    <div
      className="relative flex flex-col w-full h-full border rounded-lg shadow-lg bg-gray-900 overflow-hidden"
      style={{ borderColor: "#333" }}
    >
      {/* Safari Header */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b"
        style={{ borderColor: "#444" }}
      >
        <div className="flex-1 mx-4">
          <input
            type="text"
            value={url}
            readOnly
            className="w-full px-3 py-1 text-sm rounded bg-gray-700 text-gray-300 cursor-default "
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={() => setIframeKey((prevKey) => prevKey + 1)} // Reload iframe
          >
            <FiRefreshCw className="w-5 h-5" />
          </button>
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={() => window.open(url, "_blank")} // Open website in new tab
          >
            <FiExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto" key={iframeKey}>
        {children}
      </div>
    </div>
  );
}
