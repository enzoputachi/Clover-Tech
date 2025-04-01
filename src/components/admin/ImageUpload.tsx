import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadProps } from './types'


export const ImageUpload = ({ onImageSelected, currentImageUrl }: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl || "");
  const { toast } = useToast();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewUrl(imageUrl);
        onImageSelected(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="flex items-center gap-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
        >
          <Upload className="h-4 w-4" />
          Upload Image
        </label>
        {currentImageUrl && (
          <Input
            type="text"
            value={currentImageUrl}
            placeholder="Or enter image URL"
            onChange={(e) => onImageSelected(e.target.value)}
            className="flex-1"
          />
        )}
      </div>
      {previewUrl && (
        <div className="relative w-full h-48">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
};