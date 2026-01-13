import { useState } from 'react';
// CHANGED: '../ui' instead of './ui'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// CHANGED: '../../App' instead of '../App' (Needs to go up 2 levels now)
import { UserRole } from '../../App';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Explicitly cast the default role to UserRole to satisfy TypeScript
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      // Mock login - in real app, this would validate credentials
      
        onLogin(selectedRole);
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100 flex items-center justify-center p-4">
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-red-600 mb-4 shadow-lg shadow-orange-500/30 transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl">🏗️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">CM Platform</h1>
          <p className="text-gray-600">Enterprise Construction Management</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl overflow-hidden">
          <CardHeader className="space-y-1 pb-6 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-center text-gray-800">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@cm.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Select Role</Label>
                <Select 
                    // Fix: Ensure the value matches the UserRole type
                    value={selectedRole || 'admin'} 
                    onValueChange={(value: string) => setSelectedRole(value as UserRole)}
                >
                  <SelectTrigger className="bg-white/50 border-gray-200">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin / Manager</SelectItem>
                    <SelectItem value="buyer">Buyer / Investor</SelectItem>
                    <SelectItem value="seller">Seller / Landlord</SelectItem>
                    <SelectItem value="legal">Legal Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/20 h-11 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
                </Button>
              </div>
            </form>

            <div className="text-center text-xs text-gray-500 mt-4">
              Protected by Enterprise Grade Security
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}