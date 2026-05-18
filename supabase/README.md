# Supabase Setup For MCAD Solutions

## What this adds

- Email/password auth through Supabase Auth
- `profiles` table linked one-to-one with `auth.users`
- Row Level Security so signed-in users can access only their own records
- Future-ready `orders` and `enrollments` tables for purchase and learning flows

## How to apply

1. Open the Supabase dashboard for your project.
2. Go to `SQL Editor`.
3. Paste the contents of [`schema.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\schema.sql).
4. Run the script once.

## Auth configuration

In Supabase:

1. Go to `Authentication` -> `Providers`.
2. Enable `Email`.
3. Keep `Email + Password` enabled.
4. If you want instant signup during testing, disable email confirmation.
5. If you want production-style signup, keep email confirmation enabled.

## Purchase-only auth flow

- Browsing pages stays public because the app does not gate routes behind auth.
- A user clicks `Buy`.
- The frontend opens the auth modal.
- On signup, Supabase creates a row in `auth.users`.
- The `handle_new_user()` trigger automatically creates the matching `profiles` row.
- After login, the frontend can create an `orders` row for that user.
- When payment is confirmed later, the backend can create or activate an `enrollments` row.

## Table notes

### `profiles`

- `id`: same UUID as `auth.users.id`
- `name`: editable display name
- `role`: `student` by default, `admin` available for future admin tools

### `orders`

- Tracks purchase intent and payment lifecycle
- `item_type` can later store values like `course` or `product`
- `item_id` can later map to your own catalog records

### `enrollments`

- Connects a learner to a course
- Optional `order_id` supports enrollment after successful purchase

## RLS behavior

- Authenticated users can read only their own `profiles`, `orders`, and `enrollments`
- Authenticated users can insert only rows tied to their own user id
- Authenticated users can update only their own rows
- Profile role escalation is blocked in the profile update policy
