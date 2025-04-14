
import { useState } from "react";
import { UploadArea } from "@/components/UploadArea";
import { ResultsPanel } from "@/components/ResultsPanel";

interface FileResult {
  fileName: string;
  isHealthy: boolean;
}

const Upload = () => {
  const [showResults, setShowResults] = useState(false);
  const [isHealthy, setIsHealthy] = useState(false);
  const [analyzedFiles, setAnalyzedFiles] = useState<string[]>([]);

  const handleReset = () => {
    setShowResults(false);
    setAnalyzedFiles([]);
  };

  const handleAnalysis = (fileNames: string[], results: FileResult[]) => {
    // Determine overall result - if at least one file is unhealthy, the overall result is unhealthy
    const overallResult = !results.some(result => !result.isHealthy);
    setIsHealthy(overallResult);
    setAnalyzedFiles(fileNames);
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
