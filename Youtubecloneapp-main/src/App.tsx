import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { VideoCard } from "./components/VideoCard";
import { VideoPlayer } from "./components/VideoPlayer";
import { Comments } from "./components/Comments";
import { AuthDialog } from "./components/AuthDialog";
import { UploadDialog } from "./components/UploadDialog";
import { Toaster, toast } from "sonner";

interface Video {
  id: number;
  title: string;
  channel: string;
  views: string;
  uploadDate: string;
  duration: string;
  likes: number;
  description: string;
  thumbnail: string;
  category: string;
  videoUrl?: string;
}

interface User {
  name: string;
  email: string;
  role: string;
}

// Mock users database
const mockUsers = [
  { email: "admin@glassy.tube", password: "admin123", name: "Admin User", role: "admin" },
  { email: "viewer@glassy.tube", password: "viewer123", name: "Viewer User", role: "user" },
];

// Mock videos data
const initialVideos: Video[] = [
  {
    id: 1,
    title: "Advanced Programming Techniques for Modern Development",
    channel: "Tech Academy",
    views: "1.2M views",
    uploadDate: "2 weeks ago",
    duration: "15:42",
    likes: 45000,
    description:
      "Learn advanced programming techniques that will take your development skills to the next level. We cover design patterns, optimization strategies, and best practices used by professional developers.\n\nTopics covered:\n- Design Patterns\n- Code Optimization\n- Testing Strategies\n- Performance Tuning\n\nPerfect for intermediate to advanced developers!",
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZ3JhbW1pbmd8ZW58MXx8fHwxNzYyNzg3NjkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "trending",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 2,
    title: "Ultimate Gaming Setup Tour 2024 - RGB Paradise",
    channel: "Gaming Hub",
    views: "856K views",
    uploadDate: "1 week ago",
    duration: "12:30",
    likes: 32000,
    description:
      "Check out my ultimate gaming setup for 2024! From the latest GPU to RGB lighting that will blow your mind. This is the dream setup every gamer wants.\n\nSetup includes:\n- RTX 4090 Graphics Card\n- 4K 144Hz Monitor\n- Custom Mechanical Keyboard\n- Professional Gaming Chair\n\nLink to all products in the description!",
    thumbnail:
      "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cHxlbnwxfHx8fDE3NjI3NjczNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "trending",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 3,
    title: "Music Production Masterclass - Creating Pro Beats",
    channel: "Studio Sessions",
    views: "524K views",
    uploadDate: "3 weeks ago",
    duration: "28:15",
    likes: 18500,
    description:
      "Learn how to produce professional-quality beats from scratch! This comprehensive masterclass covers everything from sound design to mixing and mastering.\n\nWhat you'll learn:\n- Sound Design Basics\n- Melody Creation\n- Drum Programming\n- Mixing Techniques\n- Mastering Fundamentals\n\nPerfect for beginners and intermediate producers!",
    thumbnail:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpb3xlbnwxfHx8fDE3NjI3MTkxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "home",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 4,
    title: "Breathtaking Nature Documentary - Hidden Landscapes",
    channel: "Nature Explorer",
    views: "2.1M views",
    uploadDate: "1 month ago",
    duration: "42:08",
    likes: 89000,
    description:
      "Journey through some of the world's most stunning and hidden landscapes. From majestic mountains to serene valleys, experience nature like never before.\n\nFeatured locations:\n- Norwegian Fjords\n- Iceland's Highlands\n- New Zealand's Alps\n- Canadian Rockies\n\nShot in stunning 4K quality!",
    thumbnail:
      "https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzYyNjY3ODczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "home",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 5,
    title: "Complete Fitness Workout Routine - Build Muscle Fast",
    channel: "Fitness Pro",
    views: "678K views",
    uploadDate: "2 weeks ago",
    duration: "18:45",
    likes: 28000,
    description:
      "Follow along with this complete workout routine designed to build muscle and increase strength. Perfect for all fitness levels with modifications included.\n\nWorkout includes:\n- Warm-up routine\n- Compound exercises\n- Isolation movements\n- Cool-down stretches\n\nRecommended: 3-4 times per week for best results!",
    thumbnail:
      "https://images.unsplash.com/photo-1522845015757-50bce044e5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dHxlbnwxfHx8fDE3NjI3ODA4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "home",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: 6,
    title: "Professional Cooking Tips - Restaurant Quality at Home",
    channel: "Chef's Kitchen",
    views: "934K views",
    uploadDate: "1 week ago",
    duration: "21:33",
    likes: 41000,
    description:
      "Learn the professional cooking techniques that chefs use in restaurants. Transform your home cooking with these essential tips and tricks!\n\nTechniques covered:\n- Knife skills\n- Proper seasoning\n- Temperature control\n- Plating techniques\n- Sauce making\n\nElevate your cooking game today!",
    thumbnail:
      "https://images.unsplash.com/photo-1514986888952-8cd320577b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwZm9vZHxlbnwxfHx8fDE3NjI3NTczNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "trending",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = (email: string, password: string) => {
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser({ name: user.name, email: user.email, role: user.role });
      setAuthDialogOpen(false);
      toast.success(`Welcome back, ${user.name}!`);
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // In production, this would create a new user in the database
    const newUser: User = { name, email, role: "user" };
    setCurrentUser(newUser);
    setAuthDialogOpen(false);
    toast.success(`Account created! Welcome, ${name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedVideo(null);
    toast.success("Logged out successfully");
  };

  const handleUpload = (videoData: {
    title: string;
    description: string;
    thumbnail: string;
  }) => {
    const newVideo: Video = {
      id: videos.length + 1,
      title: videoData.title,
      channel: currentUser?.name || "Unknown",
      views: "0 views",
      uploadDate: "Just now",
      duration: "00:00",
      likes: 0,
      description: videoData.description,
      thumbnail: videoData.thumbnail,
      category: "home",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    };
    setVideos([newVideo, ...videos]);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSelectedVideo(null);
    setSidebarOpen(false);
  };

  const getFilteredVideos = () => {
    let filtered = videos;

    // Filter by section
    if (activeSection === "trending") {
      filtered = filtered.filter((v) => v.category === "trending");
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (v) =>
          v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.channel.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredVideos = getFilteredVideos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Navbar */}
      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onUploadClick={() => setUploadDialogOpen(true)}
        onLoginClick={() => setAuthDialogOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        currentUser={currentUser}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="pt-20 lg:pl-64 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8">
          {selectedVideo ? (
            // Video Page
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <VideoPlayer
                    video={selectedVideo}
                    currentUser={currentUser}
                    onBack={() => setSelectedVideo(null)}
                  />
                  <Comments videoId={selectedVideo.id} currentUser={currentUser} />
                </div>
                
                {/* Related Videos */}
                <div className="space-y-4">
                  <h3 className="text-xl mb-4">Related Videos</h3>
                  <div className="space-y-3">
                    {videos
                      .filter((v) => v.id !== selectedVideo.id)
                      .slice(0, 5)
                      .map((video) => (
                        <div
                          key={video.id}
                          onClick={() => setSelectedVideo(video)}
                          className="flex gap-2 cursor-pointer group"
                        >
                          <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-xs">
                              {video.duration}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm line-clamp-2 mb-1 group-hover:text-red-400 transition-colors">
                              {video.title}
                            </h4>
                            <p className="text-xs text-gray-400">{video.channel}</p>
                            <p className="text-xs text-gray-500">{video.views}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Video Grid
            <div className="max-w-[1800px] mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl capitalize">{activeSection}</h2>
                {searchQuery && (
                  <p className="text-gray-400 mt-1">
                    {filteredVideos.length} results for "{searchQuery}"
                  </p>
                )}
              </div>
              
              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onClick={() => setSelectedVideo(video)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-400">No videos found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Dialogs */}
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <UploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUpload={handleUpload}
      />

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f5f5f5",
          },
        }}
      />
    </div>
  );
}
