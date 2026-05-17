'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const client = getSupabaseBrowserClient();
      
      // For admin login, check if email is admin
      if (isAdmin) {
        if (email !== 'admin@mcad.com' || password !== 'admin123') {
          setError('Invalid admin credentials');
          setIsLoading(false);
          return;
        }
        
        // Set admin session in localStorage for mock auth
        const adminSession = {
          user: {
            id: 'admin-user-id',
            email: 'admin@mcad.com',
            role: 'admin'
          },
          isAdmin: true
        };
        localStorage.setItem('admin_session', JSON.stringify(adminSession));
        setSuccess('Admin login successful! Redirecting...');
        
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get('redirect');
        
        setTimeout(() => {
          router.push(redirect || '/admin');
        }, 500);
        return;
      }
      
      // Regular user authentication
      const result = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || 'Invalid credentials');
        setIsLoading(false);
        return;
      }

      setSuccess('Login successful! Redirecting...');
      
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');
      
      setTimeout(() => {
        router.push(redirect || '/dashboard');
      }, 1000);
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-3 sm:px-4 py-6 sm:py-12">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-12 shadow-md sm:shadow-lg border border-gray-200">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-3">Sign In</h1>
            <p className="text-sm sm:text-lg text-muted font-medium">Welcome back to MCAD Solutions</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-800 text-xs sm:text-sm font-semibold">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border-2 border-green-200 rounded-lg text-green-800 text-xs sm:text-sm font-semibold">
              {success}
            </div>
          )}

          {/* Form Section */}
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-base font-bold text-foreground mb-1.5 sm:mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-brand focus:bg-white transition text-sm sm:text-base font-medium"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs sm:text-base font-bold text-foreground mb-1.5 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-brand focus:bg-white transition pr-12 sm:pr-14 text-sm sm:text-base font-medium"
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition z-10 pointer-events-auto min-h-[44px] min-w-[44px] flex items-center justify-center"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} className="sm:w-6 sm:h-6" /> : <Eye size={20} className="sm:w-6 sm:h-6" />}
                </button>
              </div>
            </div>

            {/* Admin Checkbox */}
            <div className="flex items-center justify-between pt-0.5 sm:pt-1">
              <div className="flex items-center">
                <input
                  id="admin"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 bg-white text-brand focus:ring-brand cursor-pointer"
                />
                <label htmlFor="admin" className="ml-2 sm:ml-3 text-xs sm:text-base font-semibold text-foreground cursor-pointer">
                  Admin Login
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-xs sm:text-sm text-brand hover:text-brand-dark font-semibold min-h-[44px] flex items-center">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-4 bg-brand hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg transition duration-200 mt-6 sm:mt-8 text-base sm:text-lg shadow-md hover:shadow-lg"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 sm:my-8 flex items-center gap-3 sm:gap-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-400 text-xs sm:text-sm font-medium">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-xs sm:text-base text-foreground font-medium">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-brand hover:text-brand-dark font-bold min-h-[44px] inline-flex items-center">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
