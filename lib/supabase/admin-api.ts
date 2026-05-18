import { createClient } from "@supabase/supabase-js";

type AdminContext = {
  supabase: any;
  userId: string;
};

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

function parseBearerToken(req: Request) {
  const header = req.headers.get("authorization") ?? req.headers.get("Authorization");
  if (!header || !header.toLowerCase().startsWith("bearer ")) {
    return null;
  }
  return header.slice(7).trim();
}

export async function requireAdminSupabaseClient(req: Request): Promise<AdminContext> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new AdminApiError("Supabase env vars missing", 500);
  }

  const accessToken = parseBearerToken(req);
  if (!accessToken) {
    throw new AdminApiError("Missing bearer token", 401);
  }

  const supabase = createClient(url, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new AdminApiError(userError?.message ?? "Invalid session", 401);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw new AdminApiError(profileError.message, 403);
  }
  if ((profile as any)?.role !== "admin") {
    throw new AdminApiError("Admin access required", 403);
  }

  return { supabase, userId: user.id };
}
