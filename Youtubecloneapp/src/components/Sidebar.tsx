import { Home, TrendingUp, Clock, ThumbsUp, ListVideo, PlaySquare } from "lucide-react";
import { cn } from "./ui/utils";

interface SidebarProps {
  isOpen: boolean;
  currentUser: { name: string; email: string; role: string } | null;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ isOpen, currentUser, activeSection, onSectionChange }: SidebarProps) {
  const mainMenuItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: TrendingUp, label: "Trending", id: "trending" },
  ];

  const userMenuItems = currentUser
    ? [
        { icon: Clock, label: "Watch Later", id: "watch-later" },
        { icon: ThumbsUp, label: "Liked Videos", id: "liked" },
        { icon: ListVideo, label: "Playlists", id: "playlists" },
      ]
    : [];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => onSectionChange(activeSection)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 z-40 w-64 transition-transform duration-300 ease-in-out",
          "backdrop-blur-2xl bg-black/70 border-r border-red-500/30 shadow-2xl shadow-red-500/10",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 space-y-6">
          {/* Main Menu */}
          <div className="space-y-1">
            {mainMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all backdrop-blur-sm",
                  "hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/20 group border border-transparent",
                  activeSection === item.id && "bg-gradient-to-r from-red-600/30 to-red-700/20 text-red-500 border-red-500/30 shadow-lg shadow-red-500/20"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    activeSection === item.id ? "text-red-500 drop-shadow-[0_0_6px_rgba(220,38,38,0.6)]" : "text-gray-400 group-hover:text-red-400"
                  )}
                />
                <span className={cn(
                  activeSection === item.id ? "text-red-500" : "text-gray-300"
                )}>{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Menu */}
          {currentUser && userMenuItems.length > 0 && (
            <>
              <div className="border-t border-red-500/30" />
              <div className="space-y-1">
                <h3 className="px-4 py-2 text-sm text-gray-400">Library</h3>
                {userMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all backdrop-blur-sm",
                      "hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/20 group border border-transparent",
                      activeSection === item.id && "bg-gradient-to-r from-red-600/30 to-red-700/20 text-red-500 border-red-500/30 shadow-lg shadow-red-500/20"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        activeSection === item.id ? "text-red-500 drop-shadow-[0_0_6px_rgba(220,38,38,0.6)]" : "text-gray-400 group-hover:text-red-400"
                      )}
                    />
                    <span className={cn(
                      activeSection === item.id ? "text-red-500" : "text-gray-300"
                    )}>{item.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Subscription Notice */}
          {!currentUser && (
            <>
              <div className="border-t border-red-500/30" />
              <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 backdrop-blur-md shadow-lg">
                <p className="text-sm text-gray-300 mb-2">
                  Sign in to like videos, comment, and subscribe.
                </p>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
