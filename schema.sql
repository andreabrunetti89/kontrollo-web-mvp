-- KONTROLLO schema (Postgres / Supabase)

create extension if not exists pgcrypto;

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  timezone text default 'Europe/Rome',
  logo_url text,
  created_at timestamptz default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete cascade,
  email text not null unique,
  role text check (role in ('owner','manager','staff')) default 'owner',
  created_at timestamptz default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete cascade,
  date date not null,
  type text check (type in ('revenue','cogs','opex')) not null,
  amount numeric not null,
  source text,
  note text,
  tags text[],
  created_at timestamptz default now()
);

create table if not exists monthly_costs (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete cascade,
  month_key text not null, -- YYYY-MM
  staff_cost numeric default 0,
  utilities numeric default 0,
  rent numeric default 0,
  other numeric default 0,
  created_at timestamptz default now()
);

create table if not exists parameters (
  account_id uuid primary key references accounts(id) on delete cascade,
  breakeven_daily numeric default 290
);

-- Simple daily summary (without monthly allocations for brevity)
create or replace view daily_summary as
select
  t.account_id,
  t.date,
  sum(case when t.type='revenue' then t.amount else 0 end) as revenue,
  sum(case when t.type='cogs' then t.amount else 0 end) as cogs,
  sum(case when t.type='opex' then t.amount else 0 end) as opex,
  coalesce(sum(case when t.type='revenue' then t.amount else 0 end),0)
    - coalesce(sum(case when t.type='cogs' then t.amount else 0 end),0)
    - coalesce(sum(case when t.type='opex' then t.amount else 0 end),0) as net_profit
from transactions t
group by t.account_id, t.date
order by t.date;

-- RLS (enable when auth wired)
-- alter table transactions enable row level security;
-- create policy tenant_iso on transactions for all
-- using (auth.uid() in (select id from users where users.account_id = transactions.account_id));
