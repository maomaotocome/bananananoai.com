import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  className?: string;
}

export default function FileUpload({
  onFilesChange,
  maxFiles = 5,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif']
  },
  className
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
    setFiles(newFiles);
    onFilesChange(newFiles);
  }, [files, maxFiles, onFilesChange]);

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - files.length,
    disabled: files.length >= maxFiles
  });

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer transition-colors",
          isDragActive && "border-primary/50 bg-primary/5",
          files.length >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
        data-testid="file-upload-dropzone"
      >
        <input {...getInputProps()} data-testid="file-upload-input" />
        <div className="text-4xl mb-4">📸</div>
        {isDragActive ? (
          <p className="text-primary font-medium">Drop the files here...</p>
        ) : (
          <>
            <p className="text-muted-foreground mb-2">
              Drag & drop up to {maxFiles} images, or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports PNG, JPG, JPEG, WebP, GIF up to 10MB each
            </p>
          </>
        )}
      </Card>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative group"
              data-testid={`file-preview-${index}`}
            >
              <Card className="p-3">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={file.name}
                      className="w-full h-full object-cover rounded-lg"
                      onLoad={(e) => {
                        // Clean up object URL to prevent memory leaks
                        setTimeout(() => URL.revokeObjectURL((e.target as HTMLImageElement).src), 1000);
                      }}
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(1)}MB
                </p>
              </Card>
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
                data-testid={`remove-file-${index}`}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
