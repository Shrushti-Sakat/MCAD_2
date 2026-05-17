import { AuthGuard } from "@/components/site/auth-guard";
import { AdminLayout as AdminUI } from "@/components/admin/admin-layout";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireAdmin={true}>
      <AdminUI title="Admin Dashboard">{children}</AdminUI>
    </AuthGuard>
  );
}
