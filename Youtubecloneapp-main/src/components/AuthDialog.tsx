import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
}

export function AuthDialog({ open, onOpenChange, onLogin, onRegister }: AuthDialogProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginEmail, loginPassword);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(registerName, registerEmail, registerPassword);
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="backdrop-blur-2xl bg-black/95 border-red-500/40 sm:max-w-md shadow-2xl shadow-red-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            <span className="text-white drop-shadow-lg">Ravi's</span>
            <span className="text-red-500 drop-shadow-[0_0_12px_rgba(220,38,38,0.8)]">Tube</span>
          </DialogTitle>
          <DialogDescription>
            Sign in to like videos, comment, and create playlists
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-md border border-red-500/20 shadow-lg">
            <TabsTrigger value="login" className="data-[state=active]:bg-red-600/30">Login</TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-red-600/30">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="bg-white/5 border-red-500/30 focus:border-red-500 backdrop-blur-sm shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="bg-white/5 border-red-500/30 focus:border-red-500 backdrop-blur-sm shadow-inner"
                />
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 backdrop-blur-md shadow-lg shadow-red-500/10">
                <p className="text-xs mb-2 text-red-400">🎭 Demo Credentials:</p>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-red-500/20">
                    <p className="text-xs text-red-300">Admin: admin@glassy.tube / admin123</p>
                    <p className="text-[10px] text-gray-400">Upload enabled at /#/admin</p>
                  </div>
                  <div className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-red-500/20">
                    <p className="text-xs text-red-300">Viewer: viewer@glassy.tube / viewer123</p>
                    <p className="text-[10px] text-gray-400">Can like, comment, playlist</p>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/50 border border-red-500/30">
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="John Doe"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                  className="bg-white/5 border-red-500/30 focus:border-red-500 backdrop-blur-sm shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  className="bg-white/5 border-red-500/30 focus:border-red-500 backdrop-blur-sm shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  className="bg-white/5 border-red-500/30 focus:border-red-500 backdrop-blur-sm shadow-inner"
                />
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 backdrop-blur-md shadow-lg">
                <p className="text-xs text-yellow-400">
                  ⚠️ Note: New accounts will have regular user permissions. Only admins can upload videos.
                </p>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/50 border border-red-500/30">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
