import { AdminLayout as AdminUI } from "@/components/admin/admin-layout";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminUI title="Admin Dashboard">{children}</AdminUI>
  );
}
