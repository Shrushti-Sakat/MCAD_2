import { AuthGuard } from "@/components/site/auth-guard";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
