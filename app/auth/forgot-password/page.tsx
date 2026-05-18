'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!email) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/send-password-reset-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to send reset link');
        setIsLoading(false);
        return;
      }

      setSuccess(`Password reset link has been sent to ${email}. Please check your inbox.`);
      setEmail('');
      setIsLoading(false);
    } catch (err) {
      setError('An error occurred. Please try again.');
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
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-brand-soft rounded-full">
                <Mail className="text-brand sm:w-8 sm:h-8" size={24} />
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-3">Reset Password</h1>
            <p className="text-sm sm:text-lg text-muted font-medium">Enter your email address and we'll send you a link to reset your password</p>
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
          <form onSubmit={handleResetRequest} className="space-y-4 sm:space-y-6">
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-4 bg-brand hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg transition duration-200 mt-6 sm:mt-8 text-base sm:text-lg shadow-md hover:shadow-lg"
            >
              {isLoading ? 'Sending reset link...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 sm:mt-8 text-center flex justify-center">
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-xs sm:text-base text-brand hover:text-brand-dark font-semibold min-h-[44px]">
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
