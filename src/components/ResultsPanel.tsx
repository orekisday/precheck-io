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
          <h2 className="text-2xl font-bold mb-2">Healthy</h2>
          <p className="text-gray-600 mb-4">
            Your scan shows no signs of concern.
          </p>
        </div>
      ) : (
        <div className="text-destructive">
          <XCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Requires Attention</h2>
          <p className="text-gray-600 mb-4">
            Please consult with a healthcare professional.
          </p>
        </div>
      )}
      <Button onClick={onReset}>Upload Another Scan</Button>
    </div>
  );
};