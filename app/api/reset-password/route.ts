import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, password, token } = await request.json();

    if (!email || !password || !token) {
      return Response.json(
        { error: 'Email, password, and token are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // First, find the user by email
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error fetching users:', listError);
      return Response.json(
        { error: 'Failed to reset password' },
        { status: 500 }
      );
    }

    // Find user with matching email
    const user = users?.find(u => u.email === email);
    
    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user password using Supabase Admin API
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: password }
    );

    if (error) {
      console.error('Password update error:', error);
      return Response.json(
        { error: 'Failed to reset password' },
        { status: 500 }
      );
    }

    return Response.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Reset password error:', error);
    return Response.json(
      { error: 'Failed to process password reset' },
      { status: 500 }
    );
  }
}
