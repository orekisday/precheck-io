
import { useState } from "react";
import { UploadArea } from "@/components/UploadArea";
import { ResultsPanel } from "@/components/ResultsPanel";

const Upload = () => {
  const [showResults, setShowResults] = useState(false);
  const [isHealthy, setIsHealthy] = useState(false);
  const [analyzedFile, setAnalyzedFile] = useState<string | null>(null);

  const handleReset = () => {
    setShowResults(false);
    setAnalyzedFile(null);
  };

  const handleAnalysis = (fileName: string) => {
    // Simulate analysis result - randomly determine if healthy
    const result = Math.random() > 0.5;
    setIsHealthy(result);
    setAnalyzedFile(fileName);
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lung Scan Analysis</h1>
      <div className="max-w-2xl mx-auto">
        {showResults ? (
          <ResultsPanel isHealthy={isHealthy} onReset={handleReset} />
        ) : (
          <UploadArea onAnalyze={handleAnalysis} />
        )}
      </div>
    </div>
  );
};

export default Upload;
