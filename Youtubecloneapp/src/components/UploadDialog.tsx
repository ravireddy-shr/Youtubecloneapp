import {
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (video: {
    title: string;
    description: string;
    thumbnail: string;
  }) => void;
}

export function UploadDialog({
  open,
  onOpenChange,
  onUpload,
}: UploadDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  /* ---------------- handlers ---------------- */

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    onUpload({
      title,
      description,
      thumbnail:
        thumbnailUrl ||
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    });

    setTitle("");
    setDescription("");
    setVideoFile(null);
    setThumbnailUrl("");

    toast.success("Video uploaded successfully!");
    onOpenChange(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoFile(e.target.files?.[0] || null);
  };

  const handleTextInputChange =
    (setter: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  const handleTextareaChange =
    (setter: (value: string) => void) =>
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      setter(e.target.value);

  /* ---------------- UI ---------------- */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="backdrop-blur-2xl bg-black/95 border-red-500/40 sm:max-w-2xl shadow-2xl shadow-red-500/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-red-600" />
            Upload Video
          </DialogTitle>
          <DialogDescription>
            Upload a new video to your channel (Admin Only)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-file">Video File *</Label>
            <Input
              id="video-file"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video-title">Title *</Label>
            <Input
              id="video-title"
              type="text"
              value={title}
              onChange={handleTextInputChange(setTitle)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video-description">Description *</Label>
            <Textarea
              id="video-description"
              value={description}
              onChange={handleTextareaChange(setDescription)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail-url">
              Custom Thumbnail URL (Optional)
            </Label>
            <Input
              id="thumbnail-url"
              type="url"
              value={thumbnailUrl}
              onChange={handleTextInputChange(setThumbnailUrl)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}