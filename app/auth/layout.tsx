'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
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
  }, [router]);

  return <>{children}</>;
}
