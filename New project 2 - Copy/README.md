# Ronald Store Sulit Saya

A Next.js website for a grocery loyalty and pointing system with:

- Username/password sign up and sign in
- First account becomes the admin automatically
- Admin analytics for today, week, month, and year
- Admin rewards control
- Admin customer management with dedicated `/admin/[username]` pages
- Customer dashboard for total spent and points
- Supabase database backend
- Vercel-ready deployment

## 1. Install dependencies

Use your preferred package manager:

```bash
npm install
```

## 2. Create environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SESSION_SECRET=
```

## 3. Create Supabase tables

In your Supabase SQL editor, run:

`supabase/schema.sql`

This creates:

- `users`
- `store_settings`
- `rewards`
- `purchase_logs`
- `apply_purchase(...)` RPC function

## 4. Run locally

```bash
npm run dev
```

## 5. How the system works

- The first registered account becomes the admin.
- Every next account becomes a customer.
- The admin can change the points rule from the admin dashboard.
- The admin opens `/admin/[username]` to add a purchase for a specific customer.
- When a purchase is saved, the system:
  - adds the amount to the customer's total spent
  - calculates the points using the active rule
  - saves a purchase log

## 6. Deploy

### GitHub

Push this project to your GitHub repository.

### Vercel

1. Import the GitHub repo into Vercel
2. Add the same environment variables from `.env.local`
3. Deploy

## Notes

- This project uses Supabase as the database, not Supabase Auth.
- Login is custom so you can use username + password without email.
