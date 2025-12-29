import { ThumbsUp, ThumbsDown, Share2, ListPlus, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { cn } from "./ui/utils";

interface VideoPlayerProps {
  video: {
    id: number;
    title: string;
    channel: string;
    views: string;
    uploadDate: string;
    likes: number;
    description: string;
    thumbnail: string;
    videoUrl?: string;
  };
  currentUser: { name: string; email: string; role: string } | null;
  onBack: () => void;
}

export function VideoPlayer({ video, currentUser, onBack }: VideoPlayerProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    if (!currentUser) return;
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    if (!currentUser) return;
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleSave = () => {
    if (!currentUser) return;
    setSaved(!saved);
  };

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <div className="relative aspect-video rounded-xl overflow-hidden backdrop-blur-xl bg-black border border-red-500/20 shadow-2xl shadow-red-500/10">
        {video.videoUrl ? (
          <video
            controls
            autoPlay
            className="w-full h-full object-contain bg-black"
            poster={video.thumbnail}
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-red-600/20 border-4 border-red-600 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-red-600 border-b-[12px] border-b-transparent ml-1" />
              </div>
              <p className="text-gray-400">Video Player</p>
              <p className="text-sm text-gray-500">No video URL available</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="backdrop-blur-2xl bg-black/50 border border-red-500/30 rounded-xl p-6 shadow-2xl shadow-red-500/10">
        <h1 className="text-2xl mb-2 drop-shadow-lg">{video.title}</h1>
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 border-2 border-red-600 shadow-lg shadow-red-600/50">
              <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white">
                {video.channel.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p>{video.channel}</p>
              <p className="text-sm text-gray-400">{video.views} • {video.uploadDate}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <div className="flex items-center backdrop-blur-md bg-white/10 rounded-full overflow-hidden border border-red-500/30 shadow-lg shadow-red-500/20">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={!currentUser}
                className={cn(
                  "rounded-none rounded-l-full hover:bg-red-500/20",
                  liked && "text-red-500"
                )}
              >
                <ThumbsUp className={cn("h-5 w-5 mr-2", liked && "fill-current drop-shadow-[0_0_6px_rgba(220,38,38,0.6)]")} />
                {video.likes + (liked ? 1 : 0)}
              </Button>
              <Separator orientation="vertical" className="h-6 bg-red-500/30" />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDislike}
                disabled={!currentUser}
                className={cn(
                  "rounded-none rounded-r-full hover:bg-red-500/20",
                  disliked && "text-red-500"
                )}
              >
                <ThumbsDown className={cn("h-5 w-5", disliked && "fill-current drop-shadow-[0_0_6px_rgba(220,38,38,0.6)]")} />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              disabled={!currentUser}
              className={cn(
                "backdrop-blur-md bg-white/10 rounded-full hover:bg-red-500/20 border border-red-500/30 shadow-lg shadow-red-500/20",
                saved && "text-red-500"
              )}
            >
              {saved ? <Clock className="h-5 w-5 mr-2 fill-current drop-shadow-[0_0_6px_rgba(220,38,38,0.6)]" /> : <ListPlus className="h-5 w-5 mr-2" />}
              {saved ? "Saved" : "Save"}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="backdrop-blur-md bg-white/10 rounded-full hover:bg-red-500/20 border border-red-500/30 shadow-lg shadow-red-500/20"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-red-500/20 shadow-lg">
          <p className={cn(
            "text-sm text-gray-300 whitespace-pre-wrap",
            !showFullDescription && "line-clamp-3"
          )}>
            {video.description}
          </p>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-sm text-red-500 hover:text-red-400 mt-2 hover:drop-shadow-[0_0_6px_rgba(220,38,38,0.6)]"
          >
            {showFullDescription ? "Show less" : "Show more"}
          </button>
        </div>

        {!currentUser && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 backdrop-blur-md shadow-lg">
            <p className="text-sm text-gray-300">
              Sign in to like, save, and interact with this video.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
