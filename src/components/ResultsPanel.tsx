
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultsPanelProps {
  isHealthy: boolean;
  onReset: () => void;
}

export const ResultsPanel = ({ isHealthy, onReset }: ResultsPanelProps) => {
  return (
    <div className="text-center p-8 rounded-lg bg-white shadow-lg animate-fadeIn">
      {isHealthy ? (
        <div className="text-success">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Abnormalities Detected</h2>
          <p className="text-gray-600 mb-4">
            Our AI analysis indicates no significant abnormalities in the lung scan. As always, please consult with a healthcare professional for a complete diagnosis.
          </p>
        </div>
      ) : (
        <div className="text-destructive">
          <XCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Potential Abnormalities Detected</h2>
          <p className="text-gray-600 mb-4">
            Our AI analysis has detected potential abnormalities that require professional medical review. Please consult with a healthcare provider for proper evaluation and diagnosis.
          </p>
        </div>
      )}
      <Button onClick={onReset}>Analyze Another Scan</Button>
    </div>
  );
};
