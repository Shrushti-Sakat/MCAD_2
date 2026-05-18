'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const client = getSupabaseBrowserClient();
        
        // Check for admin session in localStorage always
        const adminSession = localStorage.getItem('admin_session');
        if (adminSession) {
          const parsed = JSON.parse(adminSession);
          if (parsed?.isAdmin && parsed?.user?.role === 'admin') {
            if (isMounted) {
              setIsAuthenticated(true);
              setIsChecking(false);
            }
            return;
          }
        }

        const { data: { session } } = await client.auth.getSession();
        
        if (isMounted) {
          if (session) {
            // If admin is required but user is just a normal user
            if (requireAdmin) {
              router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
            } else {
              setIsAuthenticated(true);
            }
          } else {
            router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
          }
          setIsChecking(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (isMounted) {
          router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
          setIsChecking(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router, pathname, requireAdmin]);

  if (isChecking) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
