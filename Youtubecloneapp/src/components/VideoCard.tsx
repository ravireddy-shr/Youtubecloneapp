import { Eye, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    channel: string;
    views: string;
    uploadDate: string;
    duration: string;
    thumbnail: string;
  };
  onClick: () => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="relative overflow-hidden rounded-xl backdrop-blur-2xl bg-black/50 border border-red-500/30 shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-red-500/30 transition-all hover:border-red-500/50">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <ImageWithFallback
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/90 backdrop-blur-md text-xs flex items-center gap-1 border border-red-500/20 shadow-lg">
            <Clock className="h-3 w-3" />
            {video.duration}
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Info */}
        <div className="p-4 backdrop-blur-sm bg-gradient-to-b from-black/30 to-black/50">
          <div className="flex gap-3">
            <Avatar className="h-9 w-9 border-2 border-red-600/60 shadow-lg shadow-red-600/30">
              <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white text-xs">
                {video.channel.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm text-white line-clamp-2 mb-1 group-hover:text-red-400 transition-colors drop-shadow-md">
                {video.title}
              </h3>
              <p className="text-xs text-gray-400 mb-1">{video.channel}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {video.views}
                </div>
                <span>•</span>
                <span>{video.uploadDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
