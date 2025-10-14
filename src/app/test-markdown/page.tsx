"use client";

import React, { useEffect, useState } from "react";
import { MarkdownRenderer } from "../../components/content/MarkdownRenderer";
import { MarkdownContent } from "../../lib/content/markdownLoader";

export default function TestMarkdownPage() {
  const [coreValues, setCoreValues] = useState<MarkdownContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Since we're on the client side, we'll use a fetch to an API route
        const response = await fetch("/api/content/core-values");
        if (!response.ok) {
          throw new Error("Failed to load content");
        }
        const data = await response.json();
        setCoreValues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg">Loading markdown content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p className="text-lg">Error loading content: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Markdown Content Test
        </h1>

        {coreValues && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Core Values from MD File:
            </h2>
            <MarkdownRenderer content={coreValues} />
          </div>
        )}
      </div>
    </div>
  );
}
