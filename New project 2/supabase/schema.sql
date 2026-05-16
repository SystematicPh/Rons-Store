create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  full_name text not null,
  password_hash text not null,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  total_spent numeric(12,2) not null default 0,
  points numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.store_settings (
  id integer primary key,
  store_name text not null default 'Ronald Store Sulit Saya',
  peso_step numeric(12,2) not null default 100,
  point_value numeric(12,2) not null default 1,
  updated_at timestamptz not null default now()
);

insert into public.store_settings (id, store_name, peso_step, point_value)
values (1, 'Ronald Store Sulit Saya', 100, 1)
on conflict (id) do update
set store_name = excluded.store_name;

create table if not exists public.rewards (
  id uuid primary key default gen_random_uuid(),
  points_required numeric(12,2) not null,
  reward_text text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.purchase_logs (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.users(id) on delete cascade,
  admin_id uuid not null references public.users(id) on delete cascade,
  amount numeric(12,2) not null,
  points_earned numeric(12,2) not null,
  created_at timestamptz not null default now()
);

create or replace function public.apply_purchase(
  p_customer_username text,
  p_admin_username text,
  p_amount numeric
)
returns void
language plpgsql
security definer
as $$
declare
  v_customer public.users%rowtype;
  v_admin public.users%rowtype;
  v_settings public.store_settings%rowtype;
  v_points numeric(12,2);
begin
  if p_amount is null or p_amount <= 0 then
    raise exception 'Amount must be greater than 0';
  end if;

  select * into v_customer
  from public.users
  where username = lower(trim(p_customer_username))
    and role = 'customer';

  if not found then
    raise exception 'Customer not found';
  end if;

  select * into v_admin
  from public.users
  where username = lower(trim(p_admin_username))
    and role = 'admin';

  if not found then
    raise exception 'Admin not found';
  end if;

  select * into v_settings
  from public.store_settings
  where id = 1;

  v_points := round(((p_amount / v_settings.peso_step) * v_settings.point_value)::numeric, 2);

  update public.users
  set total_spent = total_spent + p_amount,
      points = points + v_points
  where id = v_customer.id;

  insert into public.purchase_logs (customer_id, admin_id, amount, points_earned)
  values (v_customer.id, v_admin.id, p_amount, v_points);

  update public.store_settings
  set updated_at = now()
  where id = 1;
end;
$$;
