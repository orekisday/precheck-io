
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface AnalysisDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string | null;
  onConfirm: () => void;
}

export const AnalysisDialog = ({
  isOpen,
  onClose,
  fileName,
  onConfirm,
}: AnalysisDialogProps) => {
  // Generate random result for the demo
  const isHealthy = Math.random() > 0.5;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Analysis Results</DialogTitle>
          <DialogDescription>
            Results of the automated lung scan analysis
          </DialogDescription>
        </DialogHeader>

        <div className="p-4">
          <div className="flex items-center gap-4 p-3 rounded-lg border mb-3">
            <div className="flex-shrink-0">
              {isHealthy ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <XCircle className="h-8 w-8 text-red-500" />
              )}
            </div>
            <div>
              <div className="text-sm font-medium">{fileName}</div>
              <div className="text-sm text-muted-foreground">
                {isHealthy ? "No abnormalities detected" : "Abnormalities detected"}
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {isHealthy 
              ? "The analysis indicates a healthy lung scan with no concerning patterns."
              : "The analysis has identified patterns that may require medical attention."
            }
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onConfirm}>
            Save Results
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
