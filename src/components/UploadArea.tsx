
import { useState } from "react";
import { Upload, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnalysisDialog } from "./AnalysisDialog";

interface FileResult {
  fileName: string;
  isHealthy: boolean;
}

interface UploadAreaProps {
  onAnalyze: (fileNames: string[], results: FileResult[]) => void;
}

export const UploadArea = ({ onAnalyze }: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleAnalyze = () => {
    if (files.length > 0) {
      setShowDialog(true);
    }
  };

  const handleConfirmAnalysis = (results: FileResult[]) => {
    setShowDialog(false);
    if (files.length > 0) {
      onAnalyze(files.map(file => file.name), results);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-200",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium mb-2">Upload Fluorography Images</h3>
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop your images here, or click to select
        </p>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
          multiple
        />
        <Button asChild>
          <label htmlFor="file-upload" className="cursor-pointer">
            Select Files
          </label>
        </Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Selected Files:</h4>
          <div className="max-h-60 overflow-y-auto space-y-2 border rounded-md p-3">
            {files.map((file, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 p-0"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={handleAnalyze} 
              className="mt-4 w-full md:w-auto"
              size="lg"
            >
              Analyze Images ({files.length})
            </Button>
          </div>
        </div>
      )}

      <AnalysisDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        fileNames={files.map(file => file.name)}
        onConfirm={handleConfirmAnalysis}
      />
    </div>
  );
};
