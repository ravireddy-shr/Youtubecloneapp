import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { cn } from "./ui/utils";

interface Comment {
  id: number;
  author: string;
  content: string;
  likes: number;
  timestamp: string;
}

interface CommentsProps {
  videoId: number;
  currentUser: { name: string; email: string; role: string } | null;
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: "Tech Enthusiast",
    content: "This is an amazing video! Really helpful content. Thanks for sharing!",
    likes: 42,
    timestamp: "2 days ago",
  },
  {
    id: 2,
    author: "Code Master",
    content: "Great tutorial! Could you make a follow-up video on advanced techniques?",
    likes: 28,
    timestamp: "1 week ago",
  },
  {
    id: 3,
    author: "Developer Pro",
    content: "Exactly what I was looking for. Keep up the great work! 🔥",
    likes: 15,
    timestamp: "3 weeks ago",
  },
];

export function Comments({ videoId, currentUser }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());

  const handleSubmitComment = () => {
    if (!currentUser || !newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: currentUser.name,
      content: newComment,
      likes: 0,
      timestamp: "Just now",
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleLikeComment = (commentId: number) => {
    if (!currentUser) return;

    const newLikedComments = new Set(likedComments);
    if (newLikedComments.has(commentId)) {
      newLikedComments.delete(commentId);
    } else {
      newLikedComments.add(commentId);
    }
    setLikedComments(newLikedComments);
  };

  return (
    <div className="backdrop-blur-2xl bg-black/50 border border-red-500/30 rounded-xl p-6 shadow-2xl shadow-red-500/10">
      <h2 className="text-xl mb-6 drop-shadow-lg">{comments.length} Comments</h2>

      {/* Add Comment */}
      {currentUser ? (
        <div className="mb-8 space-y-3">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 border-2 border-red-600 shadow-lg shadow-red-600/50">
              <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white">
                {currentUser.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] backdrop-blur-md bg-white/10 border-red-500/30 focus:border-red-500 resize-none shadow-inner"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNewComment("")}
                  className="hover:bg-red-500/20 backdrop-blur-sm"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/50 border border-red-500/30"
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 backdrop-blur-md shadow-lg">
          <p className="text-sm text-gray-300">
            Sign in to leave a comment on this video.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => {
          const isLiked = likedComments.has(comment.id);
          return (
            <div key={comment.id} className="flex gap-3 p-4 rounded-xl backdrop-blur-md bg-white/5 border border-red-500/20 hover:border-red-500/30 transition-all shadow-lg">
              <Avatar className="h-10 w-10 border-2 border-red-600/50 shadow-lg shadow-red-600/30">
                <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-900 text-white">
                  {comment.author.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{comment.author}</span>
                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-gray-300">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikeComment(comment.id)}
                    disabled={!currentUser}
                    className={cn(
                      "h-8 px-2 hover:bg-red-500/20 rounded-lg backdrop-blur-sm",
                      isLiked && "text-red-500"
                    )}
                  >
                    <ThumbsUp className={cn("h-4 w-4 mr-1", isLiked && "fill-current drop-shadow-[0_0_6px_rgba(220,38,38,0.6)]")} />
                    <span className="text-xs">
                      {comment.likes + (isLiked ? 1 : 0)}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={!currentUser}
                    className="h-8 px-2 hover:bg-red-500/20 rounded-lg backdrop-blur-sm"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
