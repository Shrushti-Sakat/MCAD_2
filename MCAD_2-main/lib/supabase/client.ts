import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/* ---------- real Supabase client (when valid credentials exist) ---------- */

let browserClient: ReturnType<typeof createClient> | null = null;

function tryGetRealClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  // Accept both legacy JWT keys (eyJ) and new publishable keys (sb_publishable_)
  if (!supabaseAnonKey.startsWith("eyJ") && !supabaseAnonKey.startsWith("sb_publishable_")) return null;
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return browserClient;
}

/* ------------------------------------------------------------------ */
/*  Mock Auth — works entirely in localStorage / memory so that the   */
/*  full signup → login → logout flow works without a real backend.   */
/* ------------------------------------------------------------------ */

type MockUser = {
  id: string;
  email: string;
};

type MockSession = {
  user: MockUser;
  access_token: string;
};

type AuthChangeCallback = (
  event: string,
  session: MockSession | null,
) => void;

const STORAGE_USERS_KEY = "mcad_mock_users";
const STORAGE_SESSION_KEY = "mcad_mock_session";

const listeners: Set<AuthChangeCallback> = new Set();

function uid() {
  return "mock-" + Math.random().toString(36).slice(2, 10);
}

function loadUsers(): Record<string, { id: string; email: string; password: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, { id: string; email: string; password: string }>) {
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

function loadSession(): MockSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(session: MockSession | null) {
  if (session) {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  }
}

function notifyListeners(event: string, session: MockSession | null) {
  listeners.forEach((cb) => {
    try {
      cb(event, session);
    } catch { /* swallow */ }
  });
}

/**
 * A minimal mock that mirrors the subset of the Supabase client API
 * used by this project (auth + basic from/insert for orders).
 */
const ADMIN_EMAIL = "admin@mcad.com";
const ADMIN_PASSWORD = "admin123";
const ADMIN_ID = "mock-admin-00000001";

function ensureAdminSeeded() {
  if (typeof window === "undefined") return;
  const users = loadUsers();
  if (!users[ADMIN_EMAIL]) {
    users[ADMIN_EMAIL] = { id: ADMIN_ID, email: ADMIN_EMAIL, password: ADMIN_PASSWORD };
    saveUsers(users);
  }
}

function createMockClient() {
  ensureAdminSeeded();
  return {
    auth: {
      async signUp({ email, password }: { email: string; password: string }) {
        const users = loadUsers();
        if (users[email]) {
          return { data: { session: null, user: null }, error: { message: "User already registered" } };
        }
        const id = uid();
        users[email] = { id, email, password };
        saveUsers(users);
        const session: MockSession = { user: { id, email }, access_token: uid() };
        saveSession(session);
        notifyListeners("SIGNED_IN", session);
        return { data: { session, user: session.user }, error: null };
      },

      async signInWithPassword({ email, password }: { email: string; password: string }) {
        const users = loadUsers();
        const entry = users[email];
        if (!entry || entry.password !== password) {
          return { data: { session: null, user: null }, error: { message: "Invalid login credentials" } };
        }
        const session: MockSession = { user: { id: entry.id, email }, access_token: uid() };
        saveSession(session);
        notifyListeners("SIGNED_IN", session);
        return { data: { session, user: session.user }, error: null };
      },

      async signOut() {
        saveSession(null);
        notifyListeners("SIGNED_OUT", null);
        return { error: null };
      },

      async getSession() {
        const session = loadSession();
        return { data: { session }, error: null };
      },

      async getUser() {
        const session = loadSession();
        return { data: { user: session?.user ?? null }, error: null };
      },

      onAuthStateChange(callback: AuthChangeCallback) {
        listeners.add(callback);
        // Fire an initial event with the current session
        const session = loadSession();
        if (session) {
          setTimeout(() => callback("INITIAL_SESSION", session), 0);
        }
        return {
          data: {
            subscription: {
              unsubscribe() {
                listeners.delete(callback);
              },
            },
          },
        };
      },
    },

    // Mock "from" to support both insert and select queries
    from(table: string) {
      return {
        insert(rows: any[]) {
          return {
            select() {
              return {
                single() {
                  const fakeRow = { id: uid(), ...rows[0] };
                  return Promise.resolve({ data: fakeRow, error: null });
                },
              };
            },
          };
        },
        select(columns?: string, options?: any) {
          // Support for dashboard stats queries with count
          const isCountQuery = options?.count === "exact" && options?.head;
          
          const queryChain = {
            order: (column: string, opts?: any) => ({
              limit: (n: number) => {
                return isCountQuery 
                  ? Promise.resolve({ count: 0, error: null })
                  : Promise.resolve({ data: [], error: null });
              },
            }),
            limit: (n: number) => {
              return isCountQuery 
                ? Promise.resolve({ count: 0, error: null })
                : Promise.resolve({ data: [], error: null });
            },
          };

          // Return a thenable object that resolves to the right shape
          const result: any = isCountQuery 
            ? Promise.resolve({ count: 0, error: null })
            : Promise.resolve({ data: [], error: null });

          // Attach chain methods
          result.order = queryChain.order;
          result.limit = queryChain.limit;
          
          return result;
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Public API — returns real Supabase client when valid credentials   */
/*  exist, otherwise returns the mock client.                          */
/* ------------------------------------------------------------------ */

let mockClient: ReturnType<typeof createMockClient> | null = null;

export function getSupabaseBrowserClient() {
  const real = tryGetRealClient();
  if (real) return real;

  // Fallback to mock auth
  if (!mockClient) {
    mockClient = createMockClient();
  }
  return mockClient as any;
}
