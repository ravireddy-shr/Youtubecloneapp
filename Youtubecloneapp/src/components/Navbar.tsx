import { Search, Menu, Upload, User, LogOut, PlaySquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface NavbarProps {
  onMenuClick: () => void;
  onUploadClick: () => void;
  onLoginClick: () => void;
  currentUser: { name: string; email: string; role: string } | null;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Navbar({
  onMenuClick,
  onUploadClick,
  currentUser,
  onLoginClick,
  onLogout,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/70 border-b border-red-500/30 shadow-2xl shadow-red-500/20">
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="hover:bg-red-500/20 backdrop-blur-sm bg-white/5 rounded-xl border border-red-500/20 shadow-lg shadow-red-500/10"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2 px-3 py-1.5 backdrop-blur-md bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-xl border border-red-500/30 shadow-lg shadow-red-500/20">
            <PlaySquare className="h-8 w-8 text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
            <span className="text-xl tracking-tight hidden sm:inline">
              <span className="text-white drop-shadow-lg">Ravi's</span>
              <span className="text-red-500 drop-shadow-[0_0_12px_rgba(220,38,38,0.8)]">Tube</span>
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-4 pr-12 py-2 bg-black/50 border-red-500/30 focus:border-red-500 rounded-full backdrop-blur-xl shadow-xl shadow-black/50"
            />
            <Button
              size="icon"
              className="absolute right-0 top-0 rounded-full bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/50"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <>
              {currentUser.role === "admin" && (
                <Button
                  onClick={onUploadClick}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 gap-2 shadow-lg shadow-red-600/50 border border-red-500/30 backdrop-blur-sm"
                >
                  <Upload className="h-5 w-5" />
                  <span className="hidden sm:inline">Upload</span>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full p-1 hover:bg-red-500/20 backdrop-blur-sm"
                  >
                    <Avatar className="h-8 w-8 border-2 border-red-600 shadow-lg shadow-red-600/50">
                      <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white">
                        {currentUser.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 backdrop-blur-2xl bg-black/90 border-red-500/40 shadow-2xl shadow-red-500/20"
                >
                  <div className="px-2 py-2 border-b border-red-500/20">
                    <p className="text-sm">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                    <p className="text-xs text-red-500 mt-1 capitalize">
                      {currentUser.role}
                    </p>
                  </div>
                  <DropdownMenuItem onClick={onLogout} className="text-red-500 hover:bg-red-500/20">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={onLoginClick}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 gap-2 shadow-lg shadow-red-600/50 border border-red-500/30"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
