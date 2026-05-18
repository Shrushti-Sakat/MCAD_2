'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      // Allow access to reset-password and forgot-password pages without redirecting
      if (pathname?.includes('reset-password') || pathname?.includes('forgot-password')) {
        return;
      }

      const adminSession = localStorage.getItem('admin_session');
      if (adminSession) {
        if (isMounted) router.replace('/dashboard');
        return;
      }

      const client = getSupabaseBrowserClient();
      if (!client) return;
      const { data: { session } } = await client.auth.getSession();
      
      if (session && isMounted) {
        router.replace('/dashboard');
      }
    }

    checkAuth();
    return () => { isMounted = false; };
  }, [router, pathname]);

  return <>{children}</>;
}
