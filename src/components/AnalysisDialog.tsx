
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Download } from "lucide-react";

interface FileResult {
  fileName: string;
  isHealthy: boolean;
}

interface AnalysisDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fileNames: string[];
  onConfirm: (results: FileResult[]) => void;
}

export const AnalysisDialog = ({
  isOpen,
  onClose,
  fileNames,
  onConfirm,
}: AnalysisDialogProps) => {
  // Generate random results for each file
  const fileResults: FileResult[] = fileNames.map(fileName => ({
    fileName,
    isHealthy: Math.random() > 0.5, // Random result
  }));

  const handleDownload = () => {
    // Create content for the text file
    const content = fileResults.map(result => 
      `${result.fileName}: ${result.isHealthy ? 'Healthy - No abnormalities detected' : 'Unhealthy - Abnormalities detected'}`
    ).join('\n');
    
    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analysis-results.txt';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Pass results to parent component
    onConfirm(fileResults);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Analysis Results</DialogTitle>
          <DialogDescription>
            Results of the automated lung scan analysis
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {fileResults.length > 0 ? (
            <div className="space-y-3">
              {fileResults.map((result, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0">
                    {result.isHealthy ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-500" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{result.fileName}</div>
                    <div className="text-sm text-muted-foreground">
                      {result.isHealthy ? "No abnormalities detected" : "Abnormalities detected"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No files to analyze
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download Results
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
