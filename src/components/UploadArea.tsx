
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnalysisDialog } from "./AnalysisDialog";

interface UploadAreaProps {
  onAnalyze: (fileName: string) => void;
}

export const UploadArea = ({ onAnalyze }: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
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
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      setFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files[0]) {
      setFile(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (file) {
      setShowDialog(true);
    }
  };

  const handleConfirmAnalysis = () => {
    setShowDialog(false);
    if (file) {
      onAnalyze(file.name);
    }
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
        <h3 className="text-lg font-medium mb-2">Upload Fluorography Image</h3>
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop your image here, or click to select
        </p>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
        />
        <Button asChild>
          <label htmlFor="file-upload" className="cursor-pointer">
            Select File
          </label>
        </Button>
        {file && (
          <p className="mt-4 text-sm text-primary">Selected: {file.name}</p>
        )}
      </div>

      {file && (
        <div className="flex justify-center">
          <Button 
            onClick={handleAnalyze} 
            className="mt-4 w-full md:w-auto"
            size="lg"
          >
            Analyze Image
          </Button>
        </div>
      )}

      <AnalysisDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        fileName={file?.name || null}
        onConfirm={handleConfirmAnalysis}
      />
    </div>
  );
};
